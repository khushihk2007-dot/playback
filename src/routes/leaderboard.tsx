// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Trophy, Search } from "lucide-react";
import { useMovies, useDocTitle } from "../lib/store";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Leaderboard — Playback" },
      { name: "description", content: "Your ranked list of films, from masterpiece to flop." },
    ],
  }),
  component: Leaderboard,
});

function tier(r) {
  if (r >= 9) return { label: "MASTERPIECE", color: "var(--color-cinema)" };
  if (r >= 7) return { label: "HIGHLY RATED", color: "var(--color-brass)" };
  if (r >= 5) return { label: "SOLID SCREENING", color: "#4a6741" };
  return { label: "FORGETTABLE", color: "var(--color-faded)" };
}

function Leaderboard() {
  const movies = useMovies();
  useDocTitle("Leaderboard");
  const [q, setQ] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All Genres");

  const genres = useMemo(() => {
    const s = new Set();
    movies.forEach((m) => {
      if (Array.isArray(m.genres)) {
        m.genres.forEach((g) => {
          if (g && typeof g === "string") {
            s.add(g.trim());
          }
        });
      }
    });
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [movies]);

  const ranked = useMemo(() => {
    let list = [...movies].sort((a, b) => b.myRating - a.myRating);
    if (selectedGenre !== "All Genres") {
      list = list.filter((m) => (m.genres || []).includes(selectedGenre));
    }
    if (q) {
      list = list.filter((m) => m.title.toLowerCase().includes(q.toLowerCase()));
    }
    return list;
  }, [movies, q, selectedGenre]);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10 py-8">
      <div className="paper-texture rounded-sm p-6 md:p-8 border border-[color:var(--color-faded)]/40 mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <Trophy className="h-7 w-7 text-[color:var(--color-brass)]" />
              <h1 className="font-display text-3xl md:text-4xl text-[color:var(--color-cinema)]">Personal Leaderboard</h1>
            </div>
            <p className="font-serif text-lg text-[color:var(--color-faded)] mt-1">Your ultimate ranked list, from masterpiece to flop</p>
          </div>
          <div className="ink-stamp text-xs font-type">
            LOGGED: {ranked.length} {ranked.length === 1 ? "MOVIE" : "MOVIES"}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px] flex items-center gap-2 bg-[color:var(--color-parchment-2)] border border-[color:var(--color-faded)]/40 rounded-full px-4 py-2">
            <Search className="h-4 w-4 text-[color:var(--color-faded)]" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find in leaderboard..." className="w-full bg-transparent font-serif outline-none placeholder:text-[color:var(--color-faded)]" />
          </div>
          <label className="font-type text-[10px] uppercase tracking-widest text-[color:var(--color-faded)] flex items-center gap-2">
            Genre:
            <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} className="bg-[color:var(--color-parchment)] border border-[color:var(--color-faded)]/40 rounded-sm px-2 py-1 font-type text-[11px] outline-none focus:border-[color:var(--color-cinema)] cursor-pointer">
              <option value="All Genres">All Genres</option>
              {genres.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {ranked.length === 0 ? (
        <div className="paper-texture rounded-sm p-12 text-center border-2 border-dashed border-[color:var(--color-faded)]/50 relative overflow-hidden flex flex-col items-center justify-center">
          <div className="absolute inset-0 pointer-events-none grain opacity-10" />
          <div className="ticket-edge bg-[color:var(--color-parchment-2)] border border-[color:var(--color-faded)]/50 px-6 py-3 text-center rotate-[-3deg] mb-5 shadow-sm max-w-max">
            <div className="font-display text-sm text-[color:var(--color-cinema)]">ADMIT ONE</div>
          </div>
          <p className="font-serif text-xl text-[color:var(--color-ink)] mt-2">
            {movies.length === 0
              ? "No screenings ranked yet."
              : selectedGenre !== "All Genres"
              ? `Your archive doesn't contain any ${selectedGenre} films yet.`
              : "No movies match your search."}
          </p>
          <p className="font-type text-xs text-[color:var(--color-faded)] mt-2 uppercase tracking-widest">
            {movies.length === 0 ? "Log your first movie to begin ranking." : "Try choosing a different genre or query."}
          </p>
        </div>
      ) : (
        <ol className="space-y-3">
          {ranked.map((m, i) => {
            const t = tier(m.myRating);
            return (
              <li key={m.id}>
                <Link to="/movie/$id" params={{ id: m.id }} className="paper-texture group relative flex items-center gap-4 rounded-sm border border-[color:var(--color-faded)]/40 p-3 hover:-translate-y-0.5 transition-transform shadow-sm">
                  <div className="grid h-16 w-16 shrink-0 place-items-center rounded-sm text-[color:var(--color-parchment)] font-display text-2xl border-2" style={{ background: t.color, borderColor: "rgba(0,0,0,0.25)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="h-20 w-14 shrink-0 bg-[color:var(--color-walnut)] rounded-[2px] overflow-hidden border border-black/30">
                    {m.posterUrl && <img src={m.posterUrl} alt="" className="h-full w-full object-cover" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-movie text-xl tracking-wide truncate">{m.title}</h3>
                      <span className="font-type text-[9px] uppercase tracking-widest px-2 py-0.5 border" style={{ borderColor: t.color, color: t.color }}>{t.label}</span>
                    </div>
                    <div className="font-type text-[11px] uppercase tracking-widest text-[color:var(--color-faded)]">
                      {(m.genres || []).slice(0, 2).join(" · ")}
                    </div>
                    <div className="font-type text-[11px] uppercase tracking-widest text-[color:var(--color-faded)] mt-0.5">
                      {m.watchDate} · {m.myRating}/10 {m.rewatchCount > 0 ? `· x${m.rewatchCount}` : ""}
                    </div>
                  </div>
                  <div className="ink-stamp shrink-0 text-lg font-display" style={{ color: t.color, borderColor: t.color }}>
                    {m.myRating}/10
                  </div>
                  <div className="hidden md:block font-type text-[9px] uppercase tracking-widest text-[color:var(--color-faded)]" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                    NO. {m.serial || "—"}
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
