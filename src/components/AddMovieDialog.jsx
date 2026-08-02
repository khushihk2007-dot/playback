import { useEffect, useRef, useState } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { searchMovies, getMovieDetails } from "../lib/tmdb";
import { useMovieActions, useWatchlistActions } from "../lib/store";
import { toast } from "sonner";

export function AddMovieDialog({ open, onOpenChange, initial, mode = "archive", onSuccess }) {
  const [step, setStep] = useState("search"); // search | details
  const [logType, setLogType] = useState("past"); // "detailed" | "past"
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");
  const [picked, setPicked] = useState(null);
  const [rating, setRating] = useState(7);
  const [watchDate, setWatchDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [watchTime, setWatchTime] = useState("");
  const [rewatchCount, setRewatchCount] = useState(0);
  const [notes, setNotes] = useState("");
  const [location, setLocation] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const timer = useRef();
  const { add } = useMovieActions();
  const { add: addToWatchlist } = useWatchlistActions();

  useEffect(() => {
    if (open) {
      if (initial) {
        setPicked(initial);
        setStep("details");
        setNotes(initial.notes || initial.summary || "");
      } else {
        setStep("search");
        setPicked(null);
        setNotes("");
      }
    } else {
      setStep("search"); setQ(""); setResults([]); setPicked(null);
      setRating(7); setWatchDate(new Date().toISOString().slice(0, 10));
      setRewatchCount(0); setNotes(""); setLocation(""); setWatchTime(""); setError("");
    }
  }, [open, initial]);

  useEffect(() => {
    clearTimeout(timer.current);
    if (!q.trim()) { setResults([]); return; }
    timer.current = setTimeout(async () => {
      setSearching(true); setError("");
      try {
        const r = await searchMovies(q);
        setResults(r);
        if (r.length === 0) setError("No films found in the reels.");
      } catch (e) {
        setError("Could not reach the archive. Check your connection or TMDB key.");
      } finally {
        setSearching(false);
      }
    }, 300);
    return () => clearTimeout(timer.current);
  }, [q]);

  const choose = async (r) => {
    setNotes(r.summary || "");
    try {
      const details = await getMovieDetails(r.tmdbId);
      if (mode === "watchlist") {
        await addToWatchlist({
          tmdbId: details.tmdbId,
          title: details.title,
          posterUrl: details.posterUrl,
          backdropUrl: details.backdropUrl,
          summary: details.summary,
          genres: details.genres,
          runtime: details.runtime,
          director: details.director,
          year: details.year,
          releaseDate: details.releaseDate,
          voteAverage: details.voteAverage,
          cast: details.cast,
        });
        toast.success("Ticket printed. Added to Want to Watch.");
        onOpenChange(false);
      } else {
        setPicked(details);
        // If year is available from release date, use it as default past watch date
        if (details.releaseDate) {
          setWatchDate(details.releaseDate);
        }
        setStep("details");
      }
    } catch {
      const fallback = {
        tmdbId: r.tmdbId,
        title: r.title,
        posterUrl: r.posterUrl,
        summary: r.summary,
        genres: r.genres,
        runtime: 0,
        director: "",
        year: r.year,
        releaseDate: "",
        voteAverage: 0,
        cast: [],
      };
      if (mode === "watchlist") {
        await addToWatchlist(fallback);
        toast.success("Ticket printed. Added to Want to Watch.");
        onOpenChange(false);
      } else {
        setPicked(fallback);
        setStep("details");
      }
    }
  };

  const save = async () => {
    if (!picked || isSaving) return;
    setIsSaving(true);
    try {
      await add({
        title: picked.title,
        posterUrl: picked.posterUrl,
        summary: picked.summary,
        genres: picked.genres,
        tmdbId: picked.tmdbId,
        director: picked.director,
        runtime: picked.runtime,
        myRating: Number(rating),
        watchDate: watchDate || new Date().toISOString().slice(0, 10),
        watchTime: logType === "past" ? "" : watchTime,
        rewatchCount: Number(rewatchCount),
        watchLocation: logType === "past" ? (location || "Past Screening (Vault)") : location,
        notes,
      });
      toast.success(logType === "past" ? "Movie rated & archived in Past Vault!" : "Ticket printed. Filed in the archive.");
      if (onSuccess) onSuccess(picked);
      onOpenChange(false);
    } catch (err) {
      toast.error(err.message || "Failed to save. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => onOpenChange(false)}>
      <div
        className="paper-texture relative w-full max-w-2xl max-h-[90vh] overflow-auto rounded-sm border-2 border-[color:var(--color-walnut)]/30 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="wood-texture flex items-center justify-between px-5 py-3 text-[color:var(--color-parchment)]">
          <div>
            <div className="font-display text-xl text-[color:var(--color-brass)]">
              {step === "search" ? (logType === "past" ? "Quick Rate Previously Watched Film" : "Log a New Screening") : (logType === "past" ? "Rate Past Screening" : "Ticket Details")}
            </div>
            <div className="font-type text-[10px] uppercase tracking-[0.25em] opacity-70">
              {logType === "past" ? "Vault Entry" : "Admit One"}
            </div>
          </div>
          <button onClick={() => onOpenChange(false)} className="text-[color:var(--color-parchment)]/70 hover:text-[color:var(--color-brass)]">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mode Toggle Tabs (only in archive mode) */}
        {mode === "archive" && (
          <div className="flex border-b border-[color:var(--color-faded)]/30 bg-[color:var(--color-parchment-2)]/60 text-xs font-type uppercase tracking-wider">
            <button
              onClick={() => setLogType("past")}
              className={`flex-1 py-2.5 px-4 text-center border-r border-[color:var(--color-faded)]/30 transition-colors ${
                logType === "past"
                  ? "bg-[color:var(--color-parchment)] font-bold text-[color:var(--color-cinema)] border-b-2 border-b-[color:var(--color-cinema)]"
                  : "text-[color:var(--color-faded)] hover:text-[color:var(--color-ink)]"
              }`}
            >
              🕰️ Quick Rate (Past Film)
            </button>
            <button
              onClick={() => setLogType("detailed")}
              className={`flex-1 py-2.5 px-4 text-center transition-colors ${
                logType === "detailed"
                  ? "bg-[color:var(--color-parchment)] font-bold text-[color:var(--color-cinema)] border-b-2 border-b-[color:var(--color-cinema)]"
                  : "text-[color:var(--color-faded)] hover:text-[color:var(--color-ink)]"
              }`}
            >
              🎟️ Full Cinema Ticket
            </button>
          </div>
        )}

        {step === "search" && (
          <div className="p-6 space-y-4">
            <label className="block">
              <div className="font-type text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-faded)] mb-2">
                {logType === "past" ? "Search a movie you've watched in the past" : "Search the reels"}
              </div>
              <div className="flex items-center gap-2 border-b-2 border-[color:var(--color-walnut)]/50 pb-2">
                <Search className="h-5 w-5 text-[color:var(--color-faded)]" />
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Type a movie title..."
                  className="flex-1 bg-transparent font-serif text-xl outline-none placeholder:text-[color:var(--color-faded)]/60"
                />
                {searching && <Loader2 className="h-4 w-4 animate-spin text-[color:var(--color-faded)]" />}
              </div>
            </label>
            {error && <p className="font-type text-sm text-[color:var(--color-cinema)]">{error}</p>}
            <div className="space-y-2">
              {results.map((r) => (
                <button
                  key={r.tmdbId}
                  onClick={() => choose(r)}
                  className="w-full flex items-center gap-3 p-2 hover:bg-[color:var(--color-parchment-2)] rounded-sm text-left border border-transparent hover:border-[color:var(--color-faded)]/30"
                >
                  <div className="h-20 w-14 shrink-0 bg-[color:var(--color-walnut)] rounded-[2px] overflow-hidden">
                    {r.posterUrl ? <img src={r.posterUrl} alt="" className="h-full w-full object-cover" /> : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-movie text-lg tracking-wide truncate">{r.title}</div>
                    <div className="font-type text-[11px] uppercase tracking-widest text-[color:var(--color-faded)]">
                      {r.year} {r.genres.length ? ` · ${r.genres.slice(0,2).join(", ")}` : ""}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "details" && picked && (
          <div className="p-4 sm:p-6 grid gap-5 md:grid-cols-[160px_1fr]">
            <div className="max-w-[160px] mx-auto md:mx-0 w-full">
              <div className="aspect-[2/3] bg-[color:var(--color-walnut)] rounded-[2px] overflow-hidden border border-black/30 shadow-md">
                {picked.posterUrl && <img src={picked.posterUrl} alt="" className="h-full w-full object-cover" />}
              </div>
            </div>
            <div className="space-y-3 min-w-0">
              <div>
                <h3 className="font-movie text-2xl tracking-wide">{picked.title}</h3>
                <div className="font-type text-[11px] uppercase tracking-widest text-[color:var(--color-faded)]">
                  {picked.genres.join(" · ")}
                </div>
              </div>
              <Field label="My Rating">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <input type="range" min="1" max="10" step="0.5" value={rating} onChange={(e) => setRating(e.target.value)} className="w-full accent-[color:var(--color-cinema)] cursor-pointer" />
                    <span className="font-type text-base font-bold text-[color:var(--color-cinema)] shrink-0 ml-3">★ {rating}/10</span>
                  </div>
                  <div className="flex justify-between font-type text-[9px] text-[color:var(--color-faded)]">
                    <span>1 (Poor)</span>
                    <span>5 (Average)</span>
                    <span>10 (Masterpiece)</span>
                  </div>
                </div>
              </Field>

              {logType === "past" ? (
                /* Simplified form for Past / Previously Watched Movie */
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field label="Date/Year Watched">
                      <input type="date" value={watchDate} onChange={(e) => setWatchDate(e.target.value)} className="w-full bg-transparent border-b border-[color:var(--color-faded)]/50 py-1 font-type text-sm outline-none focus:border-[color:var(--color-cinema)]" />
                    </Field>
                    <Field label="Where Watched (Optional)">
                      <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. TV / Theater / Netflix" className="w-full bg-transparent border-b border-[color:var(--color-faded)]/50 py-1 font-type text-sm outline-none focus:border-[color:var(--color-cinema)]" />
                    </Field>
                  </div>
                  <Field label="Quick Thoughts / Review (Optional)">
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Memory of watching this film..." className="w-full bg-[color:var(--color-parchment-2)] border border-[color:var(--color-faded)]/40 p-2 font-serif text-base outline-none focus:border-[color:var(--color-cinema)] placeholder:text-[color:var(--color-faded)]/60" />
                  </Field>
                </>
              ) : (
                /* Full Cinema Ticket form */
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Watch Date">
                      <input type="date" value={watchDate} onChange={(e) => setWatchDate(e.target.value)} className="w-full bg-transparent border-b border-[color:var(--color-faded)]/50 py-1 font-type text-sm outline-none focus:border-[color:var(--color-cinema)]" />
                    </Field>
                    <Field label="Showtime">
                      <input type="time" value={watchTime} onChange={(e) => setWatchTime(e.target.value)} className="w-full bg-transparent border-b border-[color:var(--color-faded)]/50 py-1 font-type text-sm outline-none focus:border-[color:var(--color-cinema)]" />
                    </Field>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Rewatch Count">
                      <input type="number" min="0" value={rewatchCount} onChange={(e) => setRewatchCount(e.target.value)} className="w-full bg-transparent border-b border-[color:var(--color-faded)]/50 py-1 font-type text-sm outline-none focus:border-[color:var(--color-cinema)]" />
                    </Field>
                    <Field label="Where I Watched">
                      <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Home Theatre" className="w-full bg-transparent border-b border-[color:var(--color-faded)]/50 py-1 font-type text-sm outline-none focus:border-[color:var(--color-cinema)]" />
                    </Field>
                  </div>
                  <Field label="Notes">
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} placeholder="Write your thoughts about this movie..." className="w-full bg-[color:var(--color-parchment-2)] border border-[color:var(--color-faded)]/40 p-2 font-serif text-base outline-none focus:border-[color:var(--color-cinema)] placeholder:text-[color:var(--color-faded)]/60" />
                  </Field>
                </>
              )}

              <div className="flex gap-2 pt-2">
                <button onClick={() => setStep("search")} className="font-type text-xs uppercase tracking-widest px-4 py-2 border border-[color:var(--color-faded)]/50 hover:bg-[color:var(--color-parchment-2)]">
                  ← Back
                </button>
                <button
                  onClick={save}
                  disabled={isSaving}
                  className="ticket-edge flex-1 bg-[color:var(--color-cinema)] hover:bg-[color:var(--color-cinema-dark)] py-3 font-movie text-lg tracking-widest text-[color:var(--color-parchment)] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSaving ? "SAVING..." : (logType === "past" ? "LOG TO PAST VAULT" : "PRINT TICKET")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <div className="font-type text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-faded)] mb-1">{label}</div>
      {children}
    </label>
  );
}
