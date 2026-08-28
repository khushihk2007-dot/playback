import { Link, useRouterState } from "@tanstack/react-router";
import { Film, Trophy, Calendar, Ticket, Settings, Clapperboard } from "lucide-react";
import { useState } from "react";
import { AddMovieDialog } from "./AddMovieDialog";
import { SettingsDialog } from "./SettingsDialog";
import { useAuth } from "../contexts/AuthContext";

const NAV = [
  { to: "/", label: "Home Archive", icon: Film, exact: true },
  { to: "/watchlist", label: "Want to Watch", icon: Clapperboard },
  { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { to: "/history", label: "Watch History", icon: Calendar },
];

export function Sidebar() {
  const [addOpen, setAddOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { displayName } = useAuth();


  return (
    <>
      {/* Desktop sidebar */}
      <aside className="wood-texture hidden lg:flex lg:w-72 xl:w-80 flex-col text-[color:var(--color-parchment)] border-r-4 border-black/40 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40" style={{
          backgroundImage: "radial-gradient(circle at 50% 10%, rgba(200,155,60,0.15), transparent 60%)"
        }} />
        <div className="relative p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full border-2 border-[color:var(--color-brass)] bg-black/30">
              <Film className="h-6 w-6 text-[color:var(--color-brass)]" />
            </div>
            <div className="min-w-0">
              <div className="font-display text-2xl leading-none text-[color:var(--color-brass)]">{displayName || "Playback"}</div>
              {displayName && <div className="font-movie text-xl tracking-widest text-[color:var(--color-parchment)]/90">PLAYBACK</div>}
            </div>
          </div>

        </div>

        <nav className="relative flex-1 p-4 space-y-1">
          {NAV.map((n) => {
            const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
            const Icon = n.icon;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`group flex items-center gap-3 px-4 py-3 rounded-sm font-type text-[13px] uppercase tracking-[0.15em] transition-all ${
                  active
                    ? "bg-black/40 text-[color:var(--color-brass)] shadow-[inset_2px_0_0_0_var(--color-brass),inset_-1px_-1px_0_rgba(255,255,255,0.05)]"
                    : "text-[color:var(--color-parchment)]/75 hover:text-[color:var(--color-brass)] hover:bg-black/20"
                }`}
                style={{ textShadow: active ? "0 1px 0 rgba(0,0,0,0.6)" : "none" }}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{n.label}</span>
              </Link>
            );
          })}

          <div className="pt-4 space-y-2">
            <button
              onClick={() => setAddOpen(true)}
              className="group relative w-full block cursor-pointer"
            >
              <div className="ticket-edge bg-[color:var(--color-cinema)] hover:bg-[color:var(--color-cinema-dark)] transition-colors py-3 px-5 text-center border-y-2 border-black/40">
                <div className="font-movie text-xl tracking-[0.2em] text-[color:var(--color-parchment)]">
                  + LOG A MOVIE
                </div>
                <div className="font-type text-[9px] uppercase tracking-[0.3em] text-[color:var(--color-parchment)]/70 mt-0.5">
                  ADMIT ONE
                </div>
              </div>
            </button>


            <button
              onClick={() => setSettingsOpen(true)}
              className="flex items-center gap-2 px-2 py-1 font-type text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-parchment)]/60 hover:text-[color:var(--color-brass)] cursor-pointer"
            >
              <Settings className="h-3.5 w-3.5" /> Settings
            </button>
          </div>
        </nav>
      </aside>

      {/* Mobile top bar */}
      <header className="wood-texture lg:hidden flex items-center gap-3 px-4 py-3 text-[color:var(--color-parchment)] border-b-2 border-black/40">
        <div className="grid h-10 w-10 place-items-center rounded-full border-2 border-[color:var(--color-brass)] bg-black/30 shrink-0">
          <Film className="h-5 w-5 text-[color:var(--color-brass)]" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-display text-lg leading-none text-[color:var(--color-brass)]">{displayName ? `${displayName}'s Playback` : "Playback"}</div>

        </div>
        <button onClick={() => setSettingsOpen(true)} className="text-[color:var(--color-parchment)]/70">
          <Settings className="h-5 w-5" />
        </button>
      </header>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-3 left-3 right-3 z-40 wood-texture rounded-full border-2 border-black/40 shadow-2xl px-3 py-2 flex items-center justify-around text-[color:var(--color-parchment)]">
        {NAV.map((n, i) => {
          const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
          const Icon = n.icon;
          if (i === 2) {
            return (
              <div key="add" className="flex items-center gap-2">
                <button
                  onClick={() => setAddOpen(true)}
                  className="grid h-14 w-14 -mt-8 place-items-center rounded-full bg-[color:var(--color-cinema)] border-4 border-[color:var(--color-brass)] shadow-lg"
                  aria-label="Log a movie"
                >
                  <Ticket className="h-6 w-6 text-[color:var(--color-parchment)]" />
                </button>
                <Link to={n.to} className={`p-2 ${active ? "text-[color:var(--color-brass)]" : "text-[color:var(--color-parchment)]/75"}`} aria-label={n.label}>
                  <Icon className="h-5 w-5" />
                </Link>
              </div>
            );
          }
          return (
            <Link key={n.to} to={n.to} className={`p-2 ${active ? "text-[color:var(--color-brass)]" : "text-[color:var(--color-parchment)]/75"}`} aria-label={n.label}>
              <Icon className="h-5 w-5" />
            </Link>
          );
        })}
      </nav>

      <AddMovieDialog open={addOpen} onOpenChange={setAddOpen} />
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
}
