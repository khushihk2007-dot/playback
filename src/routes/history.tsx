// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, List, Ticket } from "lucide-react";
import { useMovies, useDocTitle } from "../lib/store";
import { AddMovieDialog } from "../components/AddMovieDialog";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Watch History — Playback" },
      { name: "description", content: "Your chronological cinema screening schedule." },
    ],
  }),
  component: History,
});

function History() {
  const movies = useMovies();
  useDocTitle("Watch History");
  const [view, setView] = useState("calendar");
  const [month, setMonth] = useState(() => { const d = new Date(); return { y: d.getFullYear(), m: d.getMonth() }; });
  const [addOpen, setAddOpen] = useState(false);

  const byDay = useMemo(() => {
    const map = new Map();
    movies.forEach((mv) => {
      const key = mv.watchDate;
      if (!key) return;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(mv);
    });
    return map;
  }, [movies]);

  const first = new Date(month.y, month.m, 1);
  const startDay = first.getDay();
  const daysInMonth = new Date(month.y, month.m + 1, 0).getDate();
  const monthLabel = first.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const nav = (delta) => {
    let y = month.y, m = month.m + delta;
    if (m < 0) { m = 11; y--; } else if (m > 11) { m = 0; y++; }
    setMonth({ y, m });
  };

  const chronological = useMemo(() => [...movies].sort((a, b) => b.watchDate.localeCompare(a.watchDate)), [movies]);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 py-8">
      <div className="paper-texture rounded-sm p-6 md:p-8 border border-[color:var(--color-faded)]/40 mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-7 w-7 text-[color:var(--color-brass)]" />
            <div>
              <h1 className="font-display text-3xl md:text-4xl text-[color:var(--color-cinema)]">Watch History</h1>
              <p className="font-serif text-lg text-[color:var(--color-faded)]">Chronological screening schedule</p>
            </div>
          </div>
          <div className="wood-texture rounded-full p-1 flex gap-1 border-2 border-black/40">
            {[["calendar", Calendar, "Calendar"], ["list", List, "List View"]].map(([id, Icon, lbl]) => (
              <button key={id} onClick={() => setView(id)} className={`px-4 py-1.5 rounded-full font-type text-[11px] uppercase tracking-widest flex items-center gap-2 ${view === id ? "bg-[color:var(--color-cinema)] text-[color:var(--color-parchment)]" : "text-[color:var(--color-parchment)]/70"}`}>
                <Icon className="h-3.5 w-3.5" /> {lbl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {view === "calendar" ? (
        <div className="paper-texture rounded-sm p-4 md:p-6 border border-[color:var(--color-faded)]/40 relative">
          {/* Notebook holes */}
          <div className="hidden md:flex absolute left-2 top-6 bottom-6 flex-col justify-around">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="h-3 w-3 rounded-full bg-[color:var(--color-paper)] border border-[color:var(--color-faded)]/40" />
            ))}
          </div>
          <div className="md:pl-8">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => nav(-1)} className="p-2 border border-[color:var(--color-faded)]/40 hover:bg-[color:var(--color-parchment-2)]"><ChevronLeft className="h-4 w-4" /></button>
              <h2 className="font-display text-2xl uppercase tracking-wider">{monthLabel}</h2>
              <button onClick={() => nav(1)} className="p-2 border border-[color:var(--color-faded)]/40 hover:bg-[color:var(--color-parchment-2)]"><ChevronRight className="h-4 w-4" /></button>
            </div>
            <div className="grid grid-cols-7 gap-1 md:gap-2">
              {["SUN","MON","TUE","WED","THU","FRI","SAT"].map((d) => (
                <div key={d} className="font-type text-[10px] uppercase tracking-widest text-[color:var(--color-faded)] text-center py-1 border-b border-[color:var(--color-faded)]/30">{d}</div>
              ))}
              {cells.map((d, i) => {
                if (d === null) return <div key={i} className="min-h-[80px]" />;
                const key = `${month.y}-${String(month.m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
                const items = byDay.get(key) || [];
                return (
                  <div key={i} className="min-h-[80px] md:min-h-[110px] border border-[color:var(--color-faded)]/25 p-1.5 md:p-2 relative bg-[color:var(--color-parchment)]/40">
                    <div className="font-type text-[10px] text-[color:var(--color-faded)]">{d}</div>
                    <div className="mt-1 space-y-1">
                      {items.slice(0, 2).map((m) => (
                        <Link key={m.id} to="/movie/$id" params={{ id: m.id }} className="block bg-[color:var(--color-parchment-2)] border border-[color:var(--color-faded)]/50 px-1.5 py-1 shadow-sm rotate-[-1deg] hover:rotate-0 transition-transform">
                          <div className="font-movie text-[10px] md:text-[11px] leading-tight truncate">{m.title}</div>
                          <div className="flex gap-[2px] mt-0.5">
                            {Array.from({ length: 5 }).map((_, k) => (
                              <span key={k} className={`h-1.5 w-1.5 rounded-full ${k < Math.round(m.myRating / 2) ? "bg-[color:var(--color-cinema)]" : "border border-[color:var(--color-faded)]/60"}`} />
                            ))}
                          </div>
                        </Link>
                      ))}
                      {items.length > 2 && <div className="font-type text-[9px] text-[color:var(--color-faded)]">+{items.length - 2} more</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <button onClick={() => setAddOpen(true)} className="ticket-edge absolute bottom-4 right-4 bg-[color:var(--color-cinema)] px-5 py-2 font-movie text-sm tracking-widest text-[color:var(--color-parchment)] shadow-lg hidden md:block">
            + LOG MOVIE
          </button>
        </div>
      ) : chronological.length === 0 ? (
        <div className="paper-texture rounded-sm p-10 text-center border-2 border-dashed border-[color:var(--color-faded)]/50">
          <Ticket className="mx-auto h-10 w-10 text-[color:var(--color-brass)]" />
          <p className="font-serif text-lg text-[color:var(--color-faded)] mt-2">No screenings on the schedule yet.</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {chronological.map((m) => (
            <li key={m.id}>
              <Link to="/movie/$id" params={{ id: m.id }} className="paper-texture flex items-center gap-4 p-3 border border-[color:var(--color-faded)]/40 rounded-sm hover:-translate-y-0.5 transition-transform">
                <div className="font-type text-[10px] uppercase tracking-widest text-[color:var(--color-faded)] w-24 shrink-0">
                  {new Date(m.watchDate + "T00:00:00").toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}
                </div>
                <div className="h-14 w-10 bg-[color:var(--color-walnut)] rounded-[2px] overflow-hidden">
                  {m.posterUrl && <img src={m.posterUrl} className="h-full w-full object-cover" alt="" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-movie text-lg truncate">{m.title}</div>
                  <div className="font-type text-[10px] uppercase tracking-widest text-[color:var(--color-faded)]">{(m.genres || []).join(" · ")}</div>
                </div>
                <div className="font-type text-sm">{m.myRating}/10</div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <AddMovieDialog open={addOpen} onOpenChange={setAddOpen} />
    </div>
  );
}
