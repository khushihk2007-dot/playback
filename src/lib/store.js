import { useSyncExternalStore, useCallback, useEffect } from "react";
import { supabase } from "./supabase";

// ─────────────────────────────────────────────────────────────────────────────
// TMDB API KEY  (stored in localStorage — not sensitive)
// ─────────────────────────────────────────────────────────────────────────────
const DEFAULT_TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY || "";
const TMDB_KEY_LS = "khu_playback_tmdb_key";

export function getTmdbKey() {
  if (typeof window === "undefined") return DEFAULT_TMDB_KEY;
  return window.localStorage.getItem(TMDB_KEY_LS) || DEFAULT_TMDB_KEY;
}
export function setTmdbKey(k) {
  if (typeof window !== "undefined") window.localStorage.setItem(TMDB_KEY_LS, k);
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS: convert DB row ↔ JS object
// ─────────────────────────────────────────────────────────────────────────────
function dbToMovie(row) {
  return {
    id:            row.id,
    title:         row.title,
    posterUrl:     row.poster_url    || "",
    genres:        row.genres        || [],
    summary:       row.summary       || "",
    myRating:      Number(row.my_rating)     || 0,
    watchDate:     row.watch_date    || "",
    watchTime:     row.watch_time    || "",
    rewatchCount:  Number(row.rewatch_count) || 0,
    tmdbId:        row.tmdb_id       || null,
    director:      row.director      || "",
    runtime:       Number(row.runtime)       || 0,
    watchLocation: row.watch_location || "",
    favoriteScene: row.favorite_scene || "",
    notes:         row.notes         || "",
    seat:          row.seat          || "",
    serial:        row.serial        || "",
    createdAt:     row.created_at    || "",
  };
}

function movieToDb(movie, userId) {
  return {
    user_id:        userId,
    title:          movie.title,
    poster_url:     movie.posterUrl      || "",
    genres:         movie.genres         || [],
    summary:        movie.summary        || "",
    my_rating:      Number(movie.myRating)      || 0,
    watch_date:     movie.watchDate      || null,
    watch_time:     movie.watchTime      || "",
    rewatch_count:  Number(movie.rewatchCount)  || 0,
    tmdb_id:        movie.tmdbId         || null,
    director:       movie.director       || "",
    runtime:        Number(movie.runtime)        || 0,
    watch_location: movie.watchLocation  || "",
    favorite_scene: movie.favoriteScene  || "",
    notes:          movie.notes          || "",
    seat:   movie.seat   || `${String.fromCharCode(65 + Math.floor(Math.random() * 20))}${Math.floor(Math.random() * 40) + 1}`,
    serial: movie.serial || String(Math.floor(Math.random() * 900000) + 100000),
  };
}

function dbToWatchlistItem(row) {
  return {
    id:             row.id,
    tmdbId:         row.tmdb_id       || null,
    title:          row.title,
    posterUrl:      row.poster_url    || "",
    backdropUrl:    row.backdrop_url  || "",
    summary:        row.summary       || "",
    genres:         row.genres        || [],
    runtime:        Number(row.runtime)       || 0,
    releaseDate:    row.release_date  || "",
    year:           row.year          || "",
    director:       row.director      || "",
    cast:           row.cast          || [],
    voteAverage:    Number(row.vote_average)   || 0,
    dateAdded:      row.date_added    || "",
    notes:          row.notes         || "",
    whyWatch:       row.why_watch     || "",
    expectedRating: Number(row.expected_rating) || 0,
    status:         row.status        || "WantToWatch",
    createdAt:      row.created_at    || "",
  };
}

function watchlistToDb(item, userId) {
  return {
    user_id:         userId,
    tmdb_id:         item.tmdbId         || null,
    title:           item.title,
    poster_url:      item.posterUrl      || "",
    backdrop_url:    item.backdropUrl    || "",
    summary:         item.summary        || "",
    genres:          item.genres         || [],
    runtime:         Number(item.runtime)        || 0,
    release_date:    item.releaseDate    || "",
    year:            item.year           || "",
    director:        item.director       || "",
    cast:            item.cast           || [],
    vote_average:    Number(item.voteAverage)    || 0,
    date_added:      item.dateAdded      || new Date().toISOString().slice(0, 10),
    notes:           item.notes          || "",
    why_watch:       item.whyWatch       || "",
    expected_rating: Number(item.expectedRating) || 0,
    status:          item.status         || "WantToWatch",
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Auth helper — get the current authenticated user's ID
// ─────────────────────────────────────────────────────────────────────────────
async function getCurrentUserId() {
  const { data: { user } } = await supabase.auth.getUser();
  return user?.id || null;
}

// ─────────────────────────────────────────────────────────────────────────────
// MOVIES STORE
// ─────────────────────────────────────────────────────────────────────────────
let moviesCache = null; // null = not yet loaded
const moviesListeners = new Set();
function emitMovies() { moviesListeners.forEach((l) => l()); }

async function loadMovies() {
  const userId = await getCurrentUserId();
  if (!userId) { moviesCache = []; emitMovies(); return; }
  const { data } = await supabase
    .from("movies")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  moviesCache = (data || []).map(dbToMovie);
  emitMovies();
}

export function useMovies() {
  const movies = useSyncExternalStore(
    (l) => { moviesListeners.add(l); return () => moviesListeners.delete(l); },
    () => moviesCache ?? [],
    () => [] // server snapshot
  );
  useEffect(() => { if (moviesCache === null) loadMovies(); }, []);
  return movies;
}

export function useMovieActions() {
  // Add a movie to the current user's archive
  const add = useCallback(async (movie) => {
    const userId = await getCurrentUserId();
    if (!userId) throw new Error("Not authenticated");
    const entry = movieToDb(movie, userId);
    const { data, error } = await supabase.from("movies").insert(entry).select().single();
    if (error) throw error;
    const newMovie = dbToMovie(data);
    moviesCache = [newMovie, ...(moviesCache || [])];
    emitMovies();
    return data.id;
  }, []);

  // Update specific fields on a movie
  const update = useCallback(async (id, patch) => {
    const dbPatch = {};
    const fieldMap = {
      title: "title", posterUrl: "poster_url", genres: "genres", summary: "summary",
      myRating: "my_rating", watchDate: "watch_date", watchTime: "watch_time",
      rewatchCount: "rewatch_count", tmdbId: "tmdb_id", director: "director",
      runtime: "runtime", watchLocation: "watch_location", favoriteScene: "favorite_scene",
      notes: "notes", seat: "seat", serial: "serial",
    };
    Object.entries(patch).forEach(([k, v]) => { if (fieldMap[k]) dbPatch[fieldMap[k]] = v; });
    const { error } = await supabase.from("movies").update(dbPatch).eq("id", id);
    if (error) throw error;
    moviesCache = (moviesCache || []).map((m) => (m.id === id ? { ...m, ...patch } : m));
    emitMovies();
  }, []);

  // Delete a movie
  const remove = useCallback(async (id) => {
    const { error } = await supabase.from("movies").delete().eq("id", id);
    if (error) throw error;
    moviesCache = (moviesCache || []).filter((m) => m.id !== id);
    emitMovies();
  }, []);

  // Increment rewatch count, optionally update date and rating
  const logRewatch = useCallback(async (id, patch = {}) => {
    const movie = (moviesCache || []).find((m) => m.id === id);
    if (!movie) return;
    const newCount = (movie.rewatchCount || 0) + 1;
    const dbPatch = {
      rewatch_count: newCount,
      watch_date:    patch.watchDate || movie.watchDate,
      my_rating:     patch.myRating  ?? movie.myRating,
    };
    const { error } = await supabase.from("movies").update(dbPatch).eq("id", id);
    if (error) throw error;
    moviesCache = (moviesCache || []).map((m) =>
      m.id === id
        ? { ...m, rewatchCount: newCount, watchDate: patch.watchDate || m.watchDate, myRating: patch.myRating ?? m.myRating }
        : m
    );
    emitMovies();
  }, []);

  return { add, update, remove, logRewatch };
}

// ─────────────────────────────────────────────────────────────────────────────
// WATCHLIST STORE
// ─────────────────────────────────────────────────────────────────────────────
let watchlistCache = null;
const watchlistListeners = new Set();
function emitWatchlist() { watchlistListeners.forEach((l) => l()); }

async function loadWatchlist() {
  const userId = await getCurrentUserId();
  if (!userId) { watchlistCache = []; emitWatchlist(); return; }
  const { data } = await supabase
    .from("watchlist")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  watchlistCache = (data || []).map(dbToWatchlistItem);
  emitWatchlist();
}

export function useWatchlist() {
  const watchlist = useSyncExternalStore(
    (l) => { watchlistListeners.add(l); return () => watchlistListeners.delete(l); },
    () => watchlistCache ?? [],
    () => [] // server snapshot
  );
  useEffect(() => { if (watchlistCache === null) loadWatchlist(); }, []);
  return watchlist;
}

export function useWatchlistActions() {
  // Add an item to the current user's watchlist
  const add = useCallback(async (item) => {
    const userId = await getCurrentUserId();
    if (!userId) throw new Error("Not authenticated");
    const entry = watchlistToDb(item, userId);
    const { data, error } = await supabase.from("watchlist").insert(entry).select().single();
    if (error) throw error;
    const newItem = dbToWatchlistItem(data);
    watchlistCache = [newItem, ...(watchlistCache || [])];
    emitWatchlist();
    return data.id;
  }, []);

  // Update specific fields on a watchlist item
  const update = useCallback(async (id, patch) => {
    const dbPatch = {};
    const fieldMap = {
      tmdbId: "tmdb_id", title: "title", posterUrl: "poster_url", backdropUrl: "backdrop_url",
      summary: "summary", genres: "genres", runtime: "runtime", releaseDate: "release_date",
      year: "year", director: "director", cast: "cast", voteAverage: "vote_average",
      dateAdded: "date_added", notes: "notes", whyWatch: "why_watch",
      expectedRating: "expected_rating", status: "status",
    };
    Object.entries(patch).forEach(([k, v]) => { if (fieldMap[k]) dbPatch[fieldMap[k]] = v; });
    const { error } = await supabase.from("watchlist").update(dbPatch).eq("id", id);
    if (error) throw error;
    watchlistCache = (watchlistCache || []).map((m) => (m.id === id ? { ...m, ...patch } : m));
    emitWatchlist();
  }, []);

  // Remove from watchlist
  const remove = useCallback(async (id) => {
    const { error } = await supabase.from("watchlist").delete().eq("id", id);
    if (error) throw error;
    watchlistCache = (watchlistCache || []).filter((m) => m.id !== id);
    emitWatchlist();
  }, []);

  return { add, update, remove };
}

// ─────────────────────────────────────────────────────────────────────────────
// Auth state listener — clear caches when user signs in or out
// (Only registered in the browser, not during SSR)
// ─────────────────────────────────────────────────────────────────────────────
if (typeof window !== "undefined") {
  supabase.auth.onAuthStateChange((event) => {
    if (event === "SIGNED_IN" || event === "INITIAL_SESSION" || event === "TOKEN_REFRESHED") {
      moviesCache   = null;
      watchlistCache = null;
      loadMovies();
      loadWatchlist();
    } else if (event === "SIGNED_OUT") {
      moviesCache    = [];
      watchlistCache = [];
      emitMovies();
      emitWatchlist();
    }
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Document title helpers
// ─────────────────────────────────────────────────────────────────────────────
export function useArchiveTitle() { return "Playback"; }

export function useDocTitle(suffix) {
  useEffect(() => {
    const full = suffix ? `${suffix} • Playback` : "Playback";
    if (typeof document !== "undefined") document.title = full;
  }, [suffix]);
}

// Legacy stubs — kept so remaining imports don't break
export function useProfile() { return { email: "", displayName: "" }; }
export function setProfile() {}
export function useDisplayName() { return ""; }
