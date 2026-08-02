// @ts-nocheck
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Trash2, Repeat, Check, Edit3 } from "lucide-react";
import { useMovies, useMovieActions, useDocTitle } from "../lib/store";
import { PunchedRating } from "../components/Rating";
import { toast } from "sonner";

export const Route = createFileRoute("/movie/$id")({
  head: () => ({
    meta: [
      { title: "Ticket — Playback" },
      { name: "description", content: "A logged screening in your archive." },
    ],
  }),
  component: MovieDetail,
});

function MovieDetail() {
  const { id } = Route.useParams();
  const movies = useMovies();
  const { update, remove, logRewatch } = useMovieActions();
  const nav = useNavigate();
  const movie = movies.find((m) => m.id === id);
  useDocTitle(movie ? movie.title : "Ticket");
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(movie);

  if (!movie) {
    return (
      <div className="p-10 text-center">
        <p className="font-serif text-lg">This ticket has been lost to the archives.</p>
        <Link to="/" className="mt-4 inline-block font-type text-xs uppercase tracking-widest text-[color:var(--color-cinema)] underline">Return home</Link>
      </div>
    );
  }

  const current = editing ? draft : movie;

  const save = () => {
    update(movie.id, {
      title: draft.title, myRating: Number(draft.myRating), watchDate: draft.watchDate,
      notes: draft.notes, favoriteScene: draft.favoriteScene, watchLocation: draft.watchLocation,
      summary: draft.summary,
    });
    setEditing(false);
    toast.success("Ticket updated.");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 py-6">
      <div className="mb-4 flex items-center justify-between">
        <Link to="/" className="font-type text-xs uppercase tracking-widest text-[color:var(--color-faded)] hover:text-[color:var(--color-cinema)] flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Back to archive
        </Link>
        <div className="flex items-center gap-2">
          <button onClick={() => { setEditing(!editing); setDraft(movie); }} className="font-type text-xs uppercase tracking-widest px-3 py-1.5 border border-[color:var(--color-faded)]/50 hover:bg-[color:var(--color-parchment-2)] flex items-center gap-1">
            <Edit3 className="h-3.5 w-3.5" /> {editing ? "Cancel" : "Edit"}
          </button>
          <button
            onClick={() => { if (confirm("Burn this ticket from the archive?")) { remove(movie.id); nav({ to: "/" }); }}}
            className="font-type text-xs uppercase tracking-widest px-3 py-1.5 border border-[color:var(--color-cinema)]/50 text-[color:var(--color-cinema)] hover:bg-[color:var(--color-cinema)]/10 flex items-center gap-1"
          >
            <Trash2 className="h-3.5 w-3.5" /> Delete
          </button>
        </div>
      </div>

      {/* Journal spread */}
      <div className="paper-texture relative rounded-sm border border-[color:var(--color-faded)]/40 shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2 relative">


          {/* Left page */}
          <div className="p-6 md:p-10 border-b md:border-b-0 md:border-r border-[color:var(--color-faded)]/30">
            <div className="relative w-full max-w-[280px] mx-auto">
              <span className="tape" style={{ top: -10, left: "50%", transform: "translateX(-50%) rotate(-3deg)", width: 70, height: 20 }} />
              <div className="aspect-[2/3] bg-[color:var(--color-walnut)] rounded-[2px] overflow-hidden border-2 border-black/30 shadow-lg">
                {current.posterUrl ? <img src={current.posterUrl} alt={current.title} className="h-full w-full object-cover" style={{ filter: "sepia(0.15)" }} /> : null}
              </div>
              <span className="absolute -top-3 -right-3 h-8 w-3 bg-[color:var(--color-brass)] shadow-md" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)" }} />
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="font-type text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-faded)]">My Rating</div>
                {editing && (
                  <span className="font-type text-sm font-semibold text-[color:var(--color-cinema)]">
                    ★ {draft.myRating || 0} / 10
                  </span>
                )}
              </div>
              {editing ? (
                <div className="space-y-1">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={draft.myRating || 5}
                    onChange={(e) => setDraft({ ...draft, myRating: Number(e.target.value) })}
                    className="w-full accent-[color:var(--color-cinema)] cursor-pointer"
                  />
                  <div className="flex justify-between font-type text-[9px] text-[color:var(--color-faded)]">
                    <span>1 (Poor)</span>
                    <span>5 (Average)</span>
                    <span>10 (Masterpiece)</span>
                  </div>
                </div>
              ) : (
                <PunchedRating value={current.myRating} size={14} />
              )}
            </div>
          </div>

          {/* Right page */}
          <div className="p-6 md:p-10 relative">
            <div className="flex items-start justify-between gap-4">
              {editing ? (
                <input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} className="font-movie text-3xl md:text-4xl bg-transparent border-b border-[color:var(--color-faded)]/50 outline-none w-full" />
              ) : (
                <h1 className="font-movie text-3xl md:text-4xl tracking-wide uppercase">{current.title}</h1>
              )}
              {current.rewatchCount > 0 && !editing && (
                <div className="ink-stamp text-xs shrink-0">Rewatched x{current.rewatchCount}</div>
              )}
            </div>

            <dl className="mt-6 space-y-3">
              <Row label="Genre">{(current.genres || []).join(", ") || "—"}</Row>
              <Row label="Runtime">{current.runtime ? `${current.runtime} min` : "—"}</Row>
              <Row label="Watched On">
                {editing ? (
                  <input type="date" value={draft.watchDate} onChange={(e) => setDraft({ ...draft, watchDate: e.target.value })} className="bg-transparent border-b border-[color:var(--color-faded)]/50 font-type text-sm outline-none" />
                ) : (
                  new Date(current.watchDate + "T00:00:00").toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" })
                )}
              </Row>
              <Row label="Where I Watched">
                {editing ? (
                  <input value={draft.watchLocation || ""} onChange={(e) => setDraft({ ...draft, watchLocation: e.target.value })} className="bg-transparent border-b border-[color:var(--color-faded)]/50 font-type text-sm outline-none w-full" />
                ) : (
                  current.watchLocation || "—"
                )}
              </Row>
            </dl>

            {current.summary && (
              <div className="mt-6">
                <div className="font-type text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-faded)] mb-1">Summary</div>
                {editing ? (
                  <textarea value={draft.summary} onChange={(e) => setDraft({ ...draft, summary: e.target.value })} rows={3} className="w-full bg-[color:var(--color-parchment-2)] border border-[color:var(--color-faded)]/40 p-2 font-serif outline-none" />
                ) : (
                  <p className="font-serif text-base leading-relaxed">{current.summary}</p>
                )}
              </div>
            )}



            {editing ? (
              <button onClick={save} className="ticket-edge mt-8 w-full bg-[color:var(--color-cinema)] py-3 font-movie text-lg tracking-widest text-[color:var(--color-parchment)]">SAVE CHANGES</button>
            ) : (
              <button
                onClick={() => { logRewatch(movie.id); toast.success("Encore screening logged."); }}
                className="mt-8 w-full flex items-center justify-center gap-2 bg-[color:var(--color-brass)] hover:bg-[color:var(--color-brass-dark)] text-[color:var(--color-walnut)] py-3 font-movie text-lg tracking-widest border-2 border-[color:var(--color-walnut)]/30"
              >
                <Repeat className="h-4 w-4" /> LOG A REWATCH
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, children }) {
  return (
    <div className="grid grid-cols-[110px_1fr] items-start gap-3 border-b border-dotted border-[color:var(--color-faded)]/40 pb-2">
      <dt className="font-type text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-faded)] flex items-center gap-1.5 pt-0.5">
        <Check className="h-3 w-3 text-[color:var(--color-brass-dark)]" />{label}
      </dt>
      <dd className="font-serif text-lg text-[color:var(--color-ink)]">{children}</dd>
    </div>
  );
}
