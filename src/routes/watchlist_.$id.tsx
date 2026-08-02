// @ts-nocheck
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Trash2, Check, Edit3, AlertCircle } from "lucide-react";
import { useWatchlist, useWatchlistActions, useDocTitle } from "../lib/store";
import { PunchedRating } from "../components/Rating";
import { AddMovieDialog } from "../components/AddMovieDialog";
import { toast } from "sonner";

export const Route = createFileRoute("/watchlist_/$id")({
  head: () => ({
    meta: [
      { title: "Watchlist Details — Playback" },
      { name: "description", content: "Details of a movie you want to watch." },
    ],
  }),
  component: WatchlistDetail,
});

function WatchlistDetail() {
  const { id } = Route.useParams();
  const watchlist = useWatchlist();
  const { update, remove } = useWatchlistActions();
  const nav = useNavigate();
  
  const movie = watchlist.find((m) => m.id === id);
  useDocTitle(movie ? movie.title : "Watchlist Details");

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(movie);

  // Archive dialog flow state
  const [archiveConfirmOpen, setArchiveConfirmOpen] = useState(false);
  const [logDialogOpen, setLogDialogOpen] = useState(false);

  if (!movie) {
    return (
      <div className="p-10 text-center">
        <p className="font-serif text-lg">This movie has been removed from the watchlist or logged.</p>
        <Link to="/watchlist" className="mt-4 inline-block font-type text-xs uppercase tracking-widest text-[color:var(--color-cinema)] underline">Return to Watchlist</Link>
      </div>
    );
  }

  const save = () => {
    update(movie.id, {
      expectedRating: Number(draft.expectedRating) || 0,
    });
    setEditing(false);
    toast.success("Target rating updated.");
  };

  const handleArchiveConfirm = () => {
    setArchiveConfirmOpen(false);
    setLogDialogOpen(true);
  };

  const handleLogSuccess = () => {
    remove(movie.id);
    nav({ to: "/watchlist" });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 py-6">
      <div className="mb-4 flex items-center justify-between">
        <Link to="/watchlist" className="font-type text-xs uppercase tracking-widest text-[color:var(--color-faded)] hover:text-[color:var(--color-cinema)] flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Back to Watchlist
        </Link>
        <div className="flex items-center gap-2">
          <button onClick={() => { setEditing(!editing); setDraft(movie); }} className="font-type text-xs uppercase tracking-widest px-3 py-1.5 border border-[color:var(--color-faded)]/50 hover:bg-[color:var(--color-parchment-2)] flex items-center gap-1">
            <Edit3 className="h-3.5 w-3.5" /> {editing ? "Cancel" : "Edit Target Rating"}
          </button>
          <button
            onClick={() => { if (confirm("Remove this movie from the watchlist?")) { remove(movie.id); nav({ to: "/watchlist" }); }}}
            className="font-type text-xs uppercase tracking-widest px-3 py-1.5 border border-[color:var(--color-cinema)]/50 text-[color:var(--color-cinema)] hover:bg-[color:var(--color-cinema)]/10 flex items-center gap-1"
          >
            <Trash2 className="h-3.5 w-3.5" /> Remove
          </button>
        </div>
      </div>

      {/* Journal spread */}
      <div className="paper-texture relative rounded-sm border border-[color:var(--color-faded)]/40 shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2 relative">
          {/* Left page */}
          <div className="p-6 md:p-10 border-b md:border-b-0 md:border-r border-[color:var(--color-faded)]/30 bg-[color:var(--color-parchment)]/20">
            <div className="relative w-full max-w-[260px] mx-auto">
              <span className="tape" style={{ top: -10, left: "50%", transform: "translateX(-50%) rotate(-2deg)", width: 70, height: 20 }} />
              <div className="aspect-[2/3] bg-[color:var(--color-walnut)] rounded-[2px] overflow-hidden border-2 border-black/30 shadow-lg">
                {movie.posterUrl ? <img src={movie.posterUrl} alt={movie.title} className="h-full w-full object-cover" style={{ filter: "sepia(0.1)" }} /> : null}
              </div>
              <span className="absolute -top-3 -right-3 h-8 w-3 bg-[color:var(--color-brass)] shadow-md" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)" }} />
            </div>

            <div className="mt-8">
              <div className="font-type text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-faded)] mb-2">Expected Rating</div>
              {editing ? (
                <div className="space-y-1">
                  <input type="range" min="1" max="10" value={draft.expectedRating || 7} onChange={(e) => setDraft({ ...draft, expectedRating: Number(e.target.value) })} className="w-full accent-[color:var(--color-cinema)]" />
                  <div className="font-type text-xs text-right font-bold text-[color:var(--color-cinema)]">Target: {draft.expectedRating || 7}/10</div>
                </div>
              ) : (
                movie.expectedRating ? (
                  <PunchedRating value={movie.expectedRating} size={12} />
                ) : (
                  <p className="font-serif text-sm italic text-[color:var(--color-faded)]">No rating expectation set.</p>
                )
              )}
            </div>
          </div>

          {/* Right page */}
          <div className="p-6 md:p-10 relative">
            <div className="flex items-start justify-between gap-4">
              <h1 className="font-movie text-3xl md:text-4xl tracking-wide uppercase leading-tight">{movie.title}</h1>
              <div className="font-type text-[8px] uppercase tracking-wider bg-[color:var(--color-brass)]/20 text-[color:var(--color-brass-dark)] border border-[color:var(--color-brass)]/50 px-2 py-0.5 rounded-[2px] shrink-0 mt-1">
                COMING SOON
              </div>
            </div>

            <dl className="mt-6 space-y-3">
              <Row label="Genre">{(movie.genres || []).join(", ") || "—"}</Row>
              <Row label="Runtime">{movie.runtime ? `${movie.runtime} min` : "—"}</Row>
            </dl>

            {movie.summary && (
              <div className="mt-6">
                <div className="font-type text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-faded)] mb-1">Overview</div>
                <p className="font-serif text-base leading-relaxed">{movie.summary}</p>
              </div>
            )}

            {editing ? (
              <button onClick={save} className="ticket-edge mt-8 w-full bg-[color:var(--color-cinema)] py-3 font-movie text-lg tracking-widest text-[color:var(--color-parchment)]">
                SAVE CHANGES
              </button>
            ) : (
              <button
                onClick={() => setArchiveConfirmOpen(true)}
                className="ticket-edge mt-8 w-full bg-[color:var(--color-cinema)] hover:bg-[color:var(--color-cinema-dark)] text-[color:var(--color-parchment)] py-3 font-movie text-lg tracking-widest flex items-center justify-center gap-2"
              >
                <Check className="h-5 w-5" /> I'VE WATCHED THIS FILM
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {archiveConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="paper-texture relative w-full max-w-md rounded-sm border-2 border-[color:var(--color-walnut)]/30 shadow-2xl overflow-hidden">
            <div className="wood-texture px-5 py-3 text-[color:var(--color-parchment)] flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-[color:var(--color-brass)]" />
              <div className="font-display text-lg text-[color:var(--color-brass)]">Archive this movie?</div>
            </div>
            <div className="p-6">
              <p className="font-serif text-lg leading-relaxed text-[color:var(--color-ink)]">
                Move <strong className="font-semibold">{movie.title}</strong> from your watchlist into your Playback Archive?
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

      {/* Logging dialog for archiving */}
      <AddMovieDialog
        open={logDialogOpen}
        onOpenChange={setLogDialogOpen}
        initial={movie}
        onSuccess={handleLogSuccess}
      />
    </div>
  );
}

function Row({ label, children }) {
  return (
    <div className="grid grid-cols-[125px_1fr] items-start gap-3 border-b border-dotted border-[color:var(--color-faded)]/40 pb-2">
      <dt className="font-type text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-faded)] flex items-center gap-1.5 pt-0.5">
        <Check className="h-3 w-3 text-[color:var(--color-brass-dark)]" />{label}
      </dt>
      <dd className="font-serif text-lg text-[color:var(--color-ink)]">{children}</dd>
    </div>
  );
}
