import { Link } from "@tanstack/react-router";
import { PunchedRating } from "./Rating";

export function TicketCard({ movie }) {
  const dateStr = movie.watchDate
    ? new Date(movie.watchDate + "T00:00:00").toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase()
    : "";
  return (
    <Link
      to="/movie/$id"
      params={{ id: movie.id }}
      className="group relative block transition-transform duration-300 hover:-translate-y-1 hover:rotate-[0.4deg]"
    >
      <div className="paper-texture relative rounded-sm border border-[color:var(--color-faded)]/40 shadow-[0_4px_10px_rgba(43,26,26,0.15),0_1px_2px_rgba(43,26,26,0.1)]">
        {/* Masking tape */}
        <span className="tape" style={{ top: -8, left: "50%", transform: "translateX(-50%) rotate(-4deg)", width: 60, height: 18 }} />

        {/* Serial number vertical */}
        <div
          className="absolute left-1 top-3 font-type text-[9px] uppercase tracking-widest text-[color:var(--color-faded)]"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          NO. {movie.serial || "000000"}
        </div>

        <div className="pl-6 pr-4 pt-5 pb-4">
          {/* Poster */}
          <div className="relative aspect-[2/3] w-full overflow-hidden bg-[color:var(--color-walnut)] rounded-[2px] border border-black/40 shadow-inner">
            {movie.posterUrl ? (
              <img
                src={movie.posterUrl}
                alt={movie.title}
                loading="lazy"
                className="h-full w-full object-cover"
                style={{ filter: "sepia(0.15) contrast(1.05)" }}
              />
            ) : (
              <div className="flex h-full items-center justify-center font-movie text-2xl text-[color:var(--color-brass)]/50">
                NO REEL
              </div>
            )}
            {movie.rewatchCount > 0 && (
              <div className="absolute -top-2 -right-2 ink-stamp text-[10px] rotate-[8deg]" style={{ transform: "rotate(8deg)" }}>
                Rewatch x{movie.rewatchCount}
              </div>
            )}
          </div>

          {/* Perforated divider */}
          <div className="my-3 border-t border-dashed border-[color:var(--color-faded)]/50 relative">
            <span className="absolute -left-3 -top-1.5 h-3 w-3 rounded-full bg-[color:var(--color-paper)]" />
            <span className="absolute -right-3 -top-1.5 h-3 w-3 rounded-full bg-[color:var(--color-paper)]" />
          </div>

          <h3 className="font-movie text-xl tracking-wide text-[color:var(--color-ink)] leading-tight uppercase truncate">
            {movie.title}
          </h3>
          <p className="font-type text-[10px] uppercase tracking-[0.15em] text-[color:var(--color-faded)] mt-1 truncate">
            {(movie.genres || []).slice(0, 2).join(" · ")}
          </p>
          <p className="font-type text-[10px] uppercase tracking-[0.15em] text-[color:var(--color-faded)] mt-1">
            {dateStr} {movie.watchTime ? `· ${movie.watchTime}` : ""}
          </p>
          <div className="mt-2">
            <PunchedRating value={movie.myRating} />
          </div>
        </div>
      </div>
    </Link>
  );
}
