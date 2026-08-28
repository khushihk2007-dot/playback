// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Ticket } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useMovies, useDocTitle } from "../lib/store";
import { useAuth } from "../contexts/AuthContext";

import { TicketCard } from "../components/TicketCard";
import { AddMovieDialog } from "../components/AddMovieDialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Playback — Home Archive" },
      { name: "description", content: "Your personal cinema archive of logged films." },
    ],
  }),
  component: Home,
});

function greeting(name: string) {
  if (!name) return { line1: "Welcome to your archive", line2: "Ready for another screening?" };
  const h = new Date().getHours();
  const part = h < 5 ? "Late show" : h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : h < 21 ? "Good evening" : "Good night";
  return { line1: `${part}, ${name}.`, line2: "Your archive awaits." };
}

const SORTS = [
  { id: "newest", label: "Newest Watched" },
  { id: "oldest", label: "Oldest Watched" },
  { id: "rating_desc", label: "Rating: High → Low" },
  { id: "rating_asc", label: "Rating: Low → High" },
  { id: "title", label: "Title (A–Z)" },
  { id: "added", label: "Recently Added" },
];

function Home() {
  const movies = useMovies();
  const { displayName } = useAuth();
  const archiveTitle = "Playback";
  useDocTitle();
  const g = greeting(displayName || "");
  const [q, setQ] = useState("");
  const [genre, setGenre] = useState("All");
  const [sort, setSort] = useState("newest");
  const [addOpen, setAddOpen] = useState(false);

  const genres = useMemo(() => {
    const s = new Set();
    movies.forEach((m) => (m.genres || []).forEach((g) => s.add(g)));
    return ["All", ...Array.from(s)];
  }, [movies]);

  const filtered = useMemo(() => {
    let list = movies.filter((m) => m.title.toLowerCase().includes(q.toLowerCase()));
    if (genre !== "All") list = list.filter((m) => (m.genres || []).includes(genre));
    const arr = [...list];
    switch (sort) {
      case "oldest": arr.sort((a, b) => a.watchDate.localeCompare(b.watchDate)); break;
      case "rating_desc": arr.sort((a, b) => b.myRating - a.myRating); break;
      case "rating_asc": arr.sort((a, b) => a.myRating - b.myRating); break;
      case "title": arr.sort((a, b) => a.title.localeCompare(b.title)); break;
      case "added": arr.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || "")); break;
      default: arr.sort((a, b) => b.watchDate.localeCompare(a.watchDate));
    }
    return arr;
  }, [movies, q, genre, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-8">
      {/* Header */}
      <div className="paper-texture relative rounded-sm border border-[color:var(--color-faded)]/40 p-6 md:p-8 mb-8 shadow-sm">
        <span className="tape hidden sm:block" style={{ top: -10, right: 30, width: 80, height: 22, transform: "rotate(6deg)" }} />
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 md:flex md:justify-between">
          <div className="min-w-0">
            <div className="font-type text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-faded)] mb-1">{g.line1}</div>
            <h1 className="font-display text-3xl md:text-5xl text-[color:var(--color-cinema)] leading-tight">
              {archiveTitle}
            </h1>
            <p className="font-serif text-lg text-[color:var(--color-faded)] mt-1">{g.line2}</p>
          </div>
          <div className="shrink-0">
            <button
              onClick={() => setAddOpen(true)}
              className="ticket-edge bg-[color:var(--color-cinema)] hover:bg-[color:var(--color-cinema-dark)] transition-colors px-6 py-3 font-movie text-base tracking-widest text-[color:var(--color-parchment)] shadow-md cursor-pointer"
            >
              + LOG MOVIE
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="mt-6 relative">
          <div className="wood-texture rounded-full p-1 border-2 border-black/40">
            <div className="flex items-center gap-3 bg-[color:var(--color-parchment)] rounded-full px-5 py-3">
              <Search className="h-5 w-5 text-[color:var(--color-faded)] shrink-0" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search your archive..."
                className="w-full bg-transparent font-serif text-lg outline-none placeholder:text-[color:var(--color-faded)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters + sort */}
      <div className="flex items-center gap-3 mb-4 overflow-x-auto pb-2 -mx-1 px-1">
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => setGenre(g)}
            className={`shrink-0 rounded-full px-4 py-1.5 font-type text-[11px] uppercase tracking-[0.15em] border-2 transition-all ${
              genre === g
                ? "bg-[color:var(--color-cinema)] text-[color:var(--color-parchment)] border-[color:var(--color-cinema)] shadow-[0_2px_0_rgba(0,0,0,0.15)]"
                : "border-[color:var(--color-faded)]/50 text-[color:var(--color-faded)] hover:border-[color:var(--color-cinema)]/60"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl text-[color:var(--color-ink)]">The Archive</h2>
        <label className="flex items-center gap-2 font-type text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-faded)]">
          Sort by
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-[color:var(--color-parchment)] border border-[color:var(--color-faded)]/40 rounded-sm px-2 py-1 font-type text-[11px]">
            {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <EmptyState onAdd={() => setAddOpen(true)} hasMovies={movies.length > 0} name={name} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {filtered.map((m) => <TicketCard key={m.id} movie={m} />)}
        </div>
      )}

      <AddMovieDialog open={addOpen} onOpenChange={setAddOpen} />
    </div>
  );
}

function EmptyState({ onAdd, hasMovies, name }) {
  const who = name || "You";
  return (
    <div className="paper-texture relative rounded-sm border-2 border-dashed border-[color:var(--color-faded)]/50 p-10 md:p-16 text-center">
      <Ticket className="mx-auto h-12 w-12 text-[color:var(--color-brass)]" />
      <h3 className="font-display text-2xl mt-3">
        {hasMovies ? "No films match that search" : `${who} hasn't archived any films yet`}
      </h3>
      <p className="font-serif text-lg text-[color:var(--color-faded)] mt-2 max-w-md mx-auto">
        {hasMovies ? "Try a different title or genre." : "Log your first movie to begin your cinematic journey."}
      </p>
      {!hasMovies && (
        <button onClick={onAdd} className="ticket-edge mt-6 inline-block bg-[color:var(--color-cinema)] px-8 py-3 font-movie text-lg tracking-widest text-[color:var(--color-parchment)]">
          + LOG YOUR FIRST MOVIE
        </button>
      )}
    </div>
  );
}
