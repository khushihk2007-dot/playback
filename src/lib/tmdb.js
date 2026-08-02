import { getTmdbKey } from "./store";

const BASE = "https://api.tmdb.org/3";
export const POSTER = (p, size = "w500") => (p ? `https://image.tmdb.org/t/p/${size}${p}` : "");

let genreCache = null;
export async function getGenreMap() {
  if (genreCache) return genreCache;
  const res = await fetch(`${BASE}/genre/movie/list?api_key=${getTmdbKey()}`);
  if (!res.ok) throw new Error("Failed to load genres");
  const data = await res.json();
  genreCache = Object.fromEntries((data.genres || []).map((g) => [g.id, g.name]));
  return genreCache;
}

export async function searchMovies(query) {
  if (!query.trim()) return [];
  const res = await fetch(`${BASE}/search/movie?api_key=${getTmdbKey()}&query=${encodeURIComponent(query)}&include_adult=false`);
  if (!res.ok) throw new Error("TMDB search failed");
  const data = await res.json();
  const map = await getGenreMap();
  return (data.results || []).slice(0, 8).map((r) => ({
    tmdbId: r.id,
    title: r.title,
    year: r.release_date ? r.release_date.slice(0, 4) : "",
    posterUrl: POSTER(r.poster_path, "w342"),
    posterPath: r.poster_path,
    summary: r.overview || "",
    genres: (r.genre_ids || []).map((id) => map[id]).filter(Boolean),
  }));
}

export async function getMovieDetails(id) {
  const res = await fetch(`${BASE}/movie/${id}?api_key=${getTmdbKey()}&append_to_response=credits`);
  if (!res.ok) throw new Error("TMDB details failed");
  const d = await res.json();
  const director = (d.credits?.crew || []).find((c) => c.job === "Director")?.name || "";
  const cast = (d.credits?.cast || []).slice(0, 5).map((c) => c.name);
  return {
    tmdbId: d.id,
    title: d.title,
    posterUrl: d.poster_path ? POSTER(d.poster_path, "w500") : "",
    backdropUrl: d.backdrop_path ? POSTER(d.backdrop_path, "w1280") : "",
    summary: d.overview || "",
    genres: (d.genres || []).map((g) => g.name),
    runtime: d.runtime || 0,
    director,
    year: d.release_date ? d.release_date.slice(0, 4) : "",
    releaseDate: d.release_date || "",
    voteAverage: d.vote_average || 0,
    cast,
  };
}
