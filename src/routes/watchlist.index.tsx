// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Check, AlertCircle } from "lucide-react";
import { useWatchlist, useWatchlistActions, useDocTitle } from "../lib/store";
import { AddMovieDialog } from "../components/AddMovieDialog";
import { toast } from "sonner";

export const Route = createFileRoute("/watchlist/")({
  head: () => ({
    meta: [
      { title: "Want to Watch — Playback" },
      { name: "description", content: "Movies waiting for their premiere in your life." },
    ],
  }),
  component: Watchlist,
});

function Watchlist() {
  const watchlist = useWatchlist();
  const { remove } = useWatchlistActions();
  useDocTitle("Want to Watch");

  const [addOpen, setAddOpen] = useState(false);
  const [q, setQ] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedRuntime, setSelectedRuntime] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [sort, setSort] = useState("added_desc");

  // Archive dialog flow state
  const [archiveTarget, setArchiveTarget] = useState(null);
  const [archiveConfirmOpen, setArchiveConfirmOpen] = useState(false);
  const [loggingTarget, setLoggingTarget] = useState(null);
  const [logDialogOpen, setLogDialogOpen] = useState(false);

  // Animation states
  const [animatingId, setAnimatingId] = useState(null);

  // Genres, Years, Runtimes options for filters
  const genres = useMemo(() => {
    const s = new Set();
    watchlist.forEach((m) => (m.genres || []).forEach((g) => s.add(g)));
    return ["All", ...Array.from(s).sort()];
  }, [watchlist]);

  const years = useMemo(() => {
    const s = new Set();
    watchlist.forEach((m) => {
      if (m.year) s.add(m.year);
    });
    return ["All", ...Array.from(s).sort((a, b) => b.localeCompare(a))];
  }, [watchlist]);

  // Filtering & Sorting
  const filtered = useMemo(() => {
    let list = watchlist.filter((m) => m.title.toLowerCase().includes(q.toLowerCase()));
    
    if (selectedGenre !== "All") {
      list = list.filter((m) => (m.genres || []).includes(selectedGenre));
    }
    if (selectedYear !== "All") {
      list = list.filter((m) => m.year === selectedYear);
    }
    if (selectedRating !== "All") {
      const minRating = Number(selectedRating);
      list = list.filter((m) => m.voteAverage >= minRating);
    }
    if (selectedRuntime !== "All") {
      if (selectedRuntime === "short") {
        list = list.filter((m) => m.runtime > 0 && m.runtime < 90);
      } else if (selectedRuntime === "medium") {
        list = list.filter((m) => m.runtime >= 90 && m.runtime <= 130);
      } else if (selectedRuntime === "long") {
        list = list.filter((m) => m.runtime > 130);
      }
    }

    const arr = [...list];
    switch (sort) {
      case "added_asc":
        arr.reverse(); // default is descending
        break;
      case "alphabetical":
        arr.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "release_desc":
        arr.sort((a, b) => (b.releaseDate || "").localeCompare(a.releaseDate || ""));
        break;
      case "release_asc":
        arr.sort((a, b) => (a.releaseDate || "").localeCompare(b.releaseDate || ""));
        break;
      case "rating_desc":
        arr.sort((a, b) => b.voteAverage - a.voteAverage);
        break;
      case "runtime_desc":
        arr.sort((a, b) => b.runtime - a.runtime);
        break;
      case "runtime_asc":
        arr.sort((a, b) => a.runtime - b.runtime);
        break;
      default: // added_desc
        // keep reverse chronological
        break;
    }
    return arr;
  }, [watchlist, q, selectedGenre, selectedYear, selectedRuntime, selectedRating, sort]);

  const handleWatchedClick = (movie) => {
    setArchiveTarget(movie);
    setArchiveConfirmOpen(true);
  };

  const handleArchiveConfirm = () => {
    if (!archiveTarget) return;
    setArchiveConfirmOpen(false);
    
    // Start stamp and fly animation
    setAnimatingId(archiveTarget.id);
    
    setTimeout(() => {
      // Open the logging screen with prefilled target
      setLoggingTarget(archiveTarget);
      setLogDialogOpen(true);
      setAnimatingId(null);
      setArchiveTarget(null);
    }, 1200);
  };

  const handleLogSuccess = (movieData) => {
    // Once saved in archive, remove from watchlist
    if (loggingTarget) {
      remove(loggingTarget.id);
      setLoggingTarget(null);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-8">
      {/* Header */}
      <div className="paper-texture relative rounded-sm border border-[color:var(--color-faded)]/40 p-6 md:p-8 mb-8 shadow-sm">
        <span className="tape hidden sm:block" style={{ top: -10, right: 30, width: 80, height: 22, transform: "rotate(4deg)" }} />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="font-type text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-faded)] mb-1">Coming Soon</div>
            <h1 className="font-display text-3xl md:text-5xl text-[color:var(--color-cinema)] leading-tight">
              Want to Watch
            </h1>
            <p className="font-serif text-lg text-[color:var(--color-faded)] mt-1">
              Movies waiting for their premiere in your life.
            </p>
          </div>
          <button
            onClick={() => setAddOpen(true)}
            className="ticket-edge bg-[color:var(--color-cinema)] hover:bg-[color:var(--color-cinema-dark)] transition-colors px-6 py-3 font-movie text-base tracking-widest text-[color:var(--color-parchment)] shadow-md"
          >
            + ADD MOVIE
          </button>
        </div>

        {/* Search */}
        <div className="mt-6 relative">
          <div className="wood-texture rounded-full p-1 border-2 border-black/40">
            <div className="flex items-center gap-3 bg-[color:var(--color-parchment)] rounded-full px-5 py-3">
              <Search className="h-5 w-5 text-[color:var(--color-faded)] shrink-0" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search future screenings..."
                className="w-full bg-transparent font-serif text-lg outline-none placeholder:text-[color:var(--color-faded)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Sorting Panel */}
      <div className="paper-texture rounded-sm border border-[color:var(--color-faded)]/30 p-4 mb-6 text-[11px] font-type uppercase tracking-wider text-[color:var(--color-faded)] space-y-3">
        <div className="flex flex-wrap items-center gap-6">
          {/* Genre Filter */}
          <label className="flex items-center gap-2 cursor-pointer">
            Genre:
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-[color:var(--color-parchment)] border border-[color:var(--color-faded)]/40 rounded-sm px-2 py-1 outline-none font-type text-[11px]"
            >
              <option value="All">All Genres</option>
              {genres.filter(g => g !== "All").map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </label>

          {/* Release Year Filter */}
          <label className="flex items-center gap-2 cursor-pointer">
            Year:
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-[color:var(--color-parchment)] border border-[color:var(--color-faded)]/40 rounded-sm px-2 py-1 outline-none font-type text-[11px]"
            >
              <option value="All">All Years</option>
              {years.filter(y => y !== "All").map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </label>

          {/* Runtime Filter */}
          <label className="flex items-center gap-2 cursor-pointer">
            Length:
            <select
              value={selectedRuntime}
              onChange={(e) => setSelectedRuntime(e.target.value)}
              className="bg-[color:var(--color-parchment)] border border-[color:var(--color-faded)]/40 rounded-sm px-2 py-1 outline-none font-type text-[11px]"
            >
              <option value="All">Any Duration</option>
              <option value="short">Short (&lt; 90m)</option>
              <option value="medium">Standard (90m - 130m)</option>
              <option value="long">Epic (&gt; 130m)</option>
            </select>
          </label>

          {/* TMDB Rating Filter */}
          <label className="flex items-center gap-2 cursor-pointer">
            Min Rating:
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="bg-[color:var(--color-parchment)] border border-[color:var(--color-faded)]/40 rounded-sm px-2 py-1 outline-none font-type text-[11px]"
            >
              <option value="All">Any Rating</option>
              <option value="8">8.0+ Masterpieces</option>
              <option value="7">7.0+ Recommended</option>
              <option value="6">6.0+ Decent</option>
            </select>
          </label>

          {/* Sorting */}
          <div className="ml-auto flex items-center gap-2 cursor-pointer">
            Sort by:
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-[color:var(--color-parchment)] border border-[color:var(--color-faded)]/40 rounded-sm px-2 py-1 outline-none font-type text-[11px]"
            >
              <option value="added_desc">Recently Added</option>
              <option value="added_asc">Oldest Added</option>
              <option value="alphabetical">Alphabetical (A–Z)</option>
              <option value="release_desc">Release Date (Newest)</option>
              <option value="release_asc">Release Date (Oldest)</option>
              <option value="rating_desc">Highest TMDB Rating</option>
              <option value="runtime_desc">Runtime (Longest)</option>
              <option value="runtime_asc">Runtime (Shortest)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid List */}
      {filtered.length === 0 ? (
        <EmptyWatchlist onAdd={() => setAddOpen(true)} isFiltered={watchlist.length > 0} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filtered.map((movie) => {
            const isAnimating = animatingId === movie.id;
            return (
              <div
                key={movie.id}
                className={`relative group transition-all duration-1000 ${
                  isAnimating
                    ? "stamp-archived pointer-events-none scale-0 -translate-y-96 -translate-x-96 rotate-[-12deg] opacity-0"
                    : "hover:-translate-y-1 hover:rotate-[0.5deg]"
                }`}
                style={{
                  transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)"
                }}
              >
                <div className="paper-texture relative rounded-sm border border-[color:var(--color-faded)]/40 shadow-md p-4 flex flex-col h-full bg-[color:var(--color-parchment)]">
                  {/* Ribbon */}
                  <span className="absolute top-2 right-2 font-type text-[8px] uppercase tracking-wider bg-[color:var(--color-brass)]/20 text-[color:var(--color-brass-dark)] border border-[color:var(--color-brass)]/50 px-2 py-0.5 rounded-[2px]">
                    COMING SOON
                  </span>

                  {/* Masking tape top */}
                  <span className="tape opacity-60" style={{ top: -8, left: "50%", transform: "translateX(-50%) rotate(2deg)", width: 50, height: 15 }} />

                  {/* Poster Link */}
                  <Link
                    to="/watchlist/$id"
                    params={{ id: movie.id }}
                    className="block aspect-[2/3] w-full overflow-hidden bg-[color:var(--color-walnut)] rounded-[2px] border border-black/30 shadow-inner relative"
                  >
                    {movie.posterUrl ? (
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        loading="lazy"
                        className="h-full w-full object-cover"
                        style={{ filter: "sepia(0.12) contrast(1.02)" }}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center font-movie text-2xl text-[color:var(--color-brass)]/50">
                        NO REEL
                      </div>
                    )}
                  </Link>

                  {/* Body details */}
                  <div className="mt-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-movie text-lg tracking-wide text-[color:var(--color-ink)] leading-tight uppercase line-clamp-2">
                        {movie.title}
                      </h3>
                      <p className="font-type text-[9px] uppercase tracking-[0.15em] text-[color:var(--color-faded)] mt-1 truncate">
                        {(movie.genres || []).slice(0, 2).join(" · ")}
                      </p>
                      <div className="flex justify-between items-center mt-2 font-type text-[9px] text-[color:var(--color-faded)] uppercase tracking-wider">
                        <span>{movie.year || "—"}</span>
                        <span>{movie.runtime ? `${movie.runtime}m` : "—"}</span>
                        <span className="flex items-center gap-0.5 text-[color:var(--color-brass-dark)] font-semibold">
                          ★ {movie.voteAverage ? movie.voteAverage.toFixed(1) : "—"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-dotted border-[color:var(--color-faded)]/30 flex gap-2">
                      <Link
                        to="/watchlist/$id"
                        params={{ id: movie.id }}
                        className="flex-1 text-center font-type text-[9px] uppercase tracking-widest py-2 border border-[color:var(--color-faded)]/40 hover:bg-[color:var(--color-parchment-2)] transition-colors rounded-[2px]"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => handleWatchedClick(movie)}
                        className="flex-1 bg-[color:var(--color-cinema)] hover:bg-[color:var(--color-cinema-dark)] transition-colors text-[color:var(--color-parchment)] font-type text-[9px] uppercase tracking-widest py-2 rounded-[2px] flex items-center justify-center gap-1"
                      >
                        <Check className="h-3 w-3" /> Watched
                      </button>
                    </div>
                  </div>
                </div>

                {/* ARCHIVED Stamp overlay */}
                {isAnimating && (
                  <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
                    <div className="ink-stamp border-4 border-dashed border-red-700 text-red-700 font-display text-4xl px-4 py-2 rotate-[-18deg] bg-[color:var(--color-parchment)]/90 shadow-2xl animate-ping duration-1000">
                      ARCHIVED
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Confirmation Dialog */}
      {archiveConfirmOpen && archiveTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="paper-texture relative w-full max-w-md rounded-sm border-2 border-[color:var(--color-walnut)]/30 shadow-2xl overflow-hidden">
            <div className="wood-texture px-5 py-3 text-[color:var(--color-parchment)] flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-[color:var(--color-brass)]" />
              <div className="font-display text-lg text-[color:var(--color-brass)]">Archive this movie?</div>
            </div>
            <div className="p-6">
              <p className="font-serif text-lg leading-relaxed text-[color:var(--color-ink)]">
                Move <strong className="font-semibold">{archiveTarget.title}</strong> from your watchlist into your Playback Archive?
              </p>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setArchiveConfirmOpen(false)}
                  className="flex-1 font-type text-xs uppercase tracking-widest py-3 border border-[color:var(--color-faded)]/50 hover:bg-[color:var(--color-parchment-2)] rounded-[2px]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleArchiveConfirm}
                  className="flex-1 bg-[color:var(--color-cinema)] hover:bg-[color:var(--color-cinema-dark)] text-[color:var(--color-parchment)] py-3 font-movie text-base tracking-widest rounded-[2px]"
                >
                  Archive Movie
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reused Add Movie Dialog */}
      <AddMovieDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        mode="watchlist"
      />

      {/* Reused logging dialog for watchlist-to-archive transition */}
      <AddMovieDialog
        open={logDialogOpen}
        onOpenChange={setLogDialogOpen}
        initial={loggingTarget}
        onSuccess={handleLogSuccess}
      />
    </div>
  );
}

function EmptyWatchlist({ onAdd, isFiltered }) {
  return (
    <div className="paper-texture relative rounded-sm border-2 border-dashed border-[color:var(--color-faded)]/50 p-12 md:p-20 text-center bg-[color:var(--color-parchment)]/30">
      {/* Decorative vintage projector design */}
      <svg className="mx-auto h-20 w-20 text-[color:var(--color-brass)]/70 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2v20M2 12h20M12 12l5 5M12 12l-5 5M12 12l5-5M12 12l-5-5" />
      </svg>
      <h3 className="font-display text-2xl mt-4 text-[color:var(--color-ink)]">
        {isFiltered ? "No films match your filter criteria" : "No future screenings planned."}
      </h3>
      <p className="font-serif text-lg text-[color:var(--color-faded)] mt-2 max-w-md mx-auto">
        {isFiltered
          ? "Try adjusting your genres, years, duration, or search query."
          : "Add your first movie to begin your watchlist."}
      </p>
      {!isFiltered && (
        <button
          onClick={onAdd}
          className="ticket-edge mt-6 inline-block bg-[color:var(--color-cinema)] px-8 py-3 font-movie text-lg tracking-widest text-[color:var(--color-parchment)] shadow-md"
        >
          + ADD YOUR FIRST MOVIE
        </button>
      )}
    </div>
  );
}
