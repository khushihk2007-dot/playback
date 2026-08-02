// @ts-nocheck
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportError } from "../lib/error-reporting";
import { Sidebar } from "../components/Sidebar";
import { AuthPage } from "../components/AuthPage";
import { AuthProvider, useAuth } from "../contexts/AuthContext";

// ─────────────────────────────────────────────────────────────────────────────
// 404 Page
// ─────────────────────────────────────────────────────────────────────────────
function NotFoundComponent() {
  return (
    <div className="paper-bg flex min-h-screen items-center justify-center px-4">
      <div className="paper-texture max-w-md rounded-md p-10 text-center">
        <h1 className="font-display text-7xl text-[color:var(--color-cinema)]">404</h1>
        <p className="font-type mt-2 text-sm uppercase tracking-widest text-[color:var(--color-faded)]">
          Reel not found in the archive
        </p>
        <Link
          to="/"
          className="font-type mt-6 inline-block border-2 border-[color:var(--color-cinema)] bg-[color:var(--color-cinema)] px-5 py-2 text-sm uppercase tracking-widest text-[color:var(--color-parchment)]"
        >
          Return to Archive
        </Link>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Error Boundary
// ─────────────────────────────────────────────────────────────────────────────
function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportError(error, { boundary: "root_error_boundary" });
  }, [error]);
  return (
    <div className="paper-bg flex min-h-screen items-center justify-center px-4">
      <div className="paper-texture max-w-md rounded-md p-8 text-center">
        <h1 className="font-display text-2xl">A frame slipped in the projector</h1>
        <p className="font-type mt-2 text-xs uppercase tracking-widest text-[color:var(--color-faded)]">
          Try rewinding
        </p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="font-type mt-6 border-2 border-[color:var(--color-cinema)] bg-[color:var(--color-cinema)] px-5 py-2 text-sm uppercase tracking-widest text-[color:var(--color-parchment)]"
        >
          Rewind
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Route definition
// ─────────────────────────────────────────────────────────────────────────────
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Playback — Personal Cinema Archive" },
      { name: "description", content: "A vintage personal movie logging journal. Log, rate and remember every film you've watched." },
      { property: "og:title", content: "Playback" },
      { property: "og:description", content: "A vintage personal cinema archive." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Cormorant+Garamond:wght@400;600;700&family=Bebas+Neue&family=IBM+Plex+Sans:wght@400;500;600&family=Special+Elite&family=Caveat:wght@400;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

// ─────────────────────────────────────────────────────────────────────────────
// Shell — required by TanStack Start for SSR
// ─────────────────────────────────────────────────────────────────────────────
function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AppGate — decides what to render based on auth state.
//
// Loading  → Spinner (session is being restored from localStorage)
// No session → AuthPage (login / sign-up)
// Session  → Main app with Sidebar
// ─────────────────────────────────────────────────────────────────────────────
function AppGate({ queryClient }) {
  const { session, loading } = useAuth();

  // While Supabase restores the session (reads localStorage, usually <100ms)
  if (loading) {
    return (
      <div className="min-h-screen bg-[#1c1010] flex flex-col items-center justify-center gap-6">
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-[#c8973c]/30 border-t-[#c8973c]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-4 rounded-full bg-[#c8973c]/60" />
          </div>
        </div>
        <div className="text-center">
          <div className="font-display text-4xl text-[#c8973c]">Playback</div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.35em] text-[#c8973c]/50">
            Loading your archive…
          </div>
        </div>
      </div>
    );
  }

  // Not logged in — show the login / sign-up page
  if (!session) {
    return <AuthPage />;
  }

  // Logged in — show the full app
  return (
    <QueryClientProvider client={queryClient}>
      <div className="paper-bg min-h-screen">
        <div className="flex min-h-screen flex-col lg:flex-row">
          <Sidebar />
          <main className="grain flex-1 min-w-0 pb-24 lg:pb-0">
            <Outlet />
          </main>
        </div>
      </div>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            fontFamily: "Special Elite, monospace",
            background: "#f9f3e7",
            color: "#2a2522",
            border: "1px solid rgba(122,108,97,0.4)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Root — wraps everything in AuthProvider
// ─────────────────────────────────────────────────────────────────────────────
function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <AuthProvider>
      <AppGate queryClient={queryClient} />
    </AuthProvider>
  );
}
