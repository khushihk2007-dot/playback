import { r as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-BzXj58nY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var supabase = createClient("https://yxgifvjjsjvmhldatfkz.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4Z2lmdmpqc2p2bWhsZGF0Zmt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ0NTg3MzIsImV4cCI6MjEwMDAzNDczMn0.x1KXMlLjEk4eAkeZy2vm9RH5lUNJiwEBhXmTUrJijSA", { auth: {
	persistSession: true,
	autoRefreshToken: true,
	detectSessionInUrl: true
} });
function dbToMovie(row) {
	return {
		id: row.id,
		title: row.title,
		posterUrl: row.poster_url || "",
		genres: row.genres || [],
		summary: row.summary || "",
		myRating: Number(row.my_rating) || 0,
		watchDate: row.watch_date || "",
		watchTime: row.watch_time || "",
		rewatchCount: Number(row.rewatch_count) || 0,
		tmdbId: row.tmdb_id || null,
		runtime: Number(row.runtime) || 0,
		watchLocation: row.watch_location || "",
		notes: row.notes || "",
		serial: row.serial || "",
		createdAt: row.created_at || ""
	};
}
function movieToDb(movie, userId) {
	return {
		user_id: userId,
		title: movie.title,
		poster_url: movie.posterUrl || "",
		genres: movie.genres || [],
		summary: movie.summary || "",
		my_rating: Number(movie.myRating) || 0,
		watch_date: movie.watchDate || null,
		watch_time: movie.watchTime || "",
		rewatch_count: Number(movie.rewatchCount) || 0,
		tmdb_id: movie.tmdbId || null,
		runtime: Number(movie.runtime) || 0,
		watch_location: movie.watchLocation || "",
		notes: movie.notes || "",
		serial: movie.serial || String(Math.floor(Math.random() * 9e5) + 1e5)
	};
}
function dbToWatchlistItem(row) {
	return {
		id: row.id,
		tmdbId: row.tmdb_id || null,
		title: row.title,
		posterUrl: row.poster_url || "",
		backdropUrl: row.backdrop_url || "",
		summary: row.summary || "",
		genres: row.genres || [],
		runtime: Number(row.runtime) || 0,
		releaseDate: row.release_date || "",
		year: row.year || "",
		director: row.director || "",
		cast: row.cast || [],
		voteAverage: Number(row.vote_average) || 0,
		dateAdded: row.date_added || "",
		notes: row.notes || "",
		whyWatch: row.why_watch || "",
		expectedRating: Number(row.expected_rating) || 0,
		status: row.status || "WantToWatch",
		createdAt: row.created_at || ""
	};
}
function watchlistToDb(item, userId) {
	return {
		user_id: userId,
		tmdb_id: item.tmdbId || null,
		title: item.title,
		poster_url: item.posterUrl || "",
		backdrop_url: item.backdropUrl || "",
		summary: item.summary || "",
		genres: item.genres || [],
		runtime: Number(item.runtime) || 0,
		release_date: item.releaseDate || "",
		year: item.year || "",
		director: item.director || "",
		cast: item.cast || [],
		vote_average: Number(item.voteAverage) || 0,
		date_added: item.dateAdded || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		notes: item.notes || "",
		why_watch: item.whyWatch || "",
		expected_rating: Number(item.expectedRating) || 0,
		status: item.status || "WantToWatch"
	};
}
async function getCurrentUserId() {
	const { data: { user } } = await supabase.auth.getUser();
	return user?.id || null;
}
var moviesCache = null;
var moviesCacheUid = null;
var moviesListeners = /* @__PURE__ */ new Set();
function emitMovies() {
	moviesListeners.forEach((l) => l());
}
async function loadMovies(userId) {
	const uid = userId ?? await getCurrentUserId();
	if (!uid) {
		moviesCache = [];
		moviesCacheUid = null;
		emitMovies();
		return;
	}
	const { data } = await supabase.from("movies").select("*").eq("user_id", uid).order("created_at", { ascending: false });
	moviesCache = (data || []).map(dbToMovie);
	moviesCacheUid = uid;
	emitMovies();
}
function useMovies() {
	const movies = (0, import_react.useSyncExternalStore)((l) => {
		moviesListeners.add(l);
		return () => moviesListeners.delete(l);
	}, () => moviesCache ?? [], () => []);
	(0, import_react.useEffect)(() => {
		if (moviesCache === null) loadMovies();
	}, []);
	return movies;
}
function useMovieActions() {
	return {
		add: (0, import_react.useCallback)(async (movie) => {
			const userId = await getCurrentUserId();
			if (!userId) throw new Error("Not authenticated");
			const entry = movieToDb(movie, userId);
			const { data, error } = await supabase.from("movies").insert(entry).select().single();
			if (error) throw error;
			moviesCache = [dbToMovie(data), ...moviesCache || []];
			emitMovies();
			return data.id;
		}, []),
		update: (0, import_react.useCallback)(async (id, patch) => {
			const dbPatch = {};
			const fieldMap = {
				title: "title",
				posterUrl: "poster_url",
				genres: "genres",
				summary: "summary",
				myRating: "my_rating",
				watchDate: "watch_date",
				watchTime: "watch_time",
				rewatchCount: "rewatch_count",
				tmdbId: "tmdb_id",
				runtime: "runtime",
				watchLocation: "watch_location",
				notes: "notes",
				serial: "serial"
			};
			Object.entries(patch).forEach(([k, v]) => {
				if (fieldMap[k]) dbPatch[fieldMap[k]] = v;
			});
			const { error } = await supabase.from("movies").update(dbPatch).eq("id", id);
			if (error) throw error;
			moviesCache = (moviesCache || []).map((m) => m.id === id ? {
				...m,
				...patch
			} : m);
			emitMovies();
		}, []),
		remove: (0, import_react.useCallback)(async (id) => {
			const { error } = await supabase.from("movies").delete().eq("id", id);
			if (error) throw error;
			moviesCache = (moviesCache || []).filter((m) => m.id !== id);
			emitMovies();
		}, []),
		logRewatch: (0, import_react.useCallback)(async (id, patch = {}) => {
			const movie = (moviesCache || []).find((m) => m.id === id);
			if (!movie) return;
			const newCount = (movie.rewatchCount || 0) + 1;
			const dbPatch = {
				rewatch_count: newCount,
				watch_date: patch.watchDate || movie.watchDate,
				my_rating: patch.myRating ?? movie.myRating
			};
			const { error } = await supabase.from("movies").update(dbPatch).eq("id", id);
			if (error) throw error;
			moviesCache = (moviesCache || []).map((m) => m.id === id ? {
				...m,
				rewatchCount: newCount,
				watchDate: patch.watchDate || m.watchDate,
				myRating: patch.myRating ?? m.myRating
			} : m);
			emitMovies();
		}, [])
	};
}
var watchlistCache = null;
var watchlistListeners = /* @__PURE__ */ new Set();
function emitWatchlist() {
	watchlistListeners.forEach((l) => l());
}
async function loadWatchlist(userId) {
	const uid = userId ?? await getCurrentUserId();
	if (!uid) {
		watchlistCache = [];
		emitWatchlist();
		return;
	}
	const { data } = await supabase.from("watchlist").select("*").eq("user_id", uid).order("created_at", { ascending: false });
	watchlistCache = (data || []).map(dbToWatchlistItem);
	emitWatchlist();
}
function useWatchlist() {
	const watchlist = (0, import_react.useSyncExternalStore)((l) => {
		watchlistListeners.add(l);
		return () => watchlistListeners.delete(l);
	}, () => watchlistCache ?? [], () => []);
	(0, import_react.useEffect)(() => {
		if (watchlistCache === null) loadWatchlist();
	}, []);
	return watchlist;
}
function useWatchlistActions() {
	return {
		add: (0, import_react.useCallback)(async (item) => {
			const userId = await getCurrentUserId();
			if (!userId) throw new Error("Not authenticated");
			const entry = watchlistToDb(item, userId);
			const { data, error } = await supabase.from("watchlist").insert(entry).select().single();
			if (error) throw error;
			watchlistCache = [dbToWatchlistItem(data), ...watchlistCache || []];
			emitWatchlist();
			return data.id;
		}, []),
		update: (0, import_react.useCallback)(async (id, patch) => {
			const dbPatch = {};
			const fieldMap = {
				tmdbId: "tmdb_id",
				title: "title",
				posterUrl: "poster_url",
				backdropUrl: "backdrop_url",
				summary: "summary",
				genres: "genres",
				runtime: "runtime",
				releaseDate: "release_date",
				year: "year",
				director: "director",
				cast: "cast",
				voteAverage: "vote_average",
				dateAdded: "date_added",
				notes: "notes",
				whyWatch: "why_watch",
				expectedRating: "expected_rating",
				status: "status"
			};
			Object.entries(patch).forEach(([k, v]) => {
				if (fieldMap[k]) dbPatch[fieldMap[k]] = v;
			});
			const { error } = await supabase.from("watchlist").update(dbPatch).eq("id", id);
			if (error) throw error;
			watchlistCache = (watchlistCache || []).map((m) => m.id === id ? {
				...m,
				...patch
			} : m);
			emitWatchlist();
		}, []),
		remove: (0, import_react.useCallback)(async (id) => {
			const { error } = await supabase.from("watchlist").delete().eq("id", id);
			if (error) throw error;
			watchlistCache = (watchlistCache || []).filter((m) => m.id !== id);
			emitWatchlist();
		}, [])
	};
}
if (typeof window !== "undefined") supabase.auth.onAuthStateChange((event, session) => {
	const newUid = session?.user?.id ?? null;
	if (event === "SIGNED_OUT" || !newUid) {
		moviesCache = [];
		moviesCacheUid = null;
		watchlistCache = [];
		emitMovies();
		emitWatchlist();
		return;
	}
	if (newUid !== moviesCacheUid) {
		moviesCache = null;
		moviesCacheUid = null;
		watchlistCache = null;
		emitMovies();
		emitWatchlist();
		loadMovies(newUid);
		loadWatchlist(newUid);
	}
});
function useDocTitle(suffix) {
	(0, import_react.useEffect)(() => {
		const full = suffix ? `${suffix} • Playback` : "Playback";
		if (typeof document !== "undefined") document.title = full;
	}, [suffix]);
}
//#endregion
export { useWatchlist as a, useMovies as i, useDocTitle as n, useWatchlistActions as o, useMovieActions as r, supabase as t };
