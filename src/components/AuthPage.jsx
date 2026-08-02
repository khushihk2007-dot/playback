import { useState } from "react";
import { Film, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

// ─────────────────────────────────────────────────────────────────────────────
// AuthPage — shown when no session exists.
// Toggles between Sign In (email + password) and Sign Up (email + username + password).
// ─────────────────────────────────────────────────────────────────────────────
export function AuthPage() {
  const { signIn, signUp } = useAuth();

  const [mode, setMode]               = useState("signin"); // "signin" | "signup"
  const [email, setEmail]             = useState("");
  const [username, setUsername]       = useState("");
  const [password, setPassword]       = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");

  const isSignUp = mode === "signup";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic client-side validation
    if (!email.trim())    { setError("Email is required."); return; }
    if (!password.trim()) { setError("Password is required."); return; }
    if (isSignUp && !username.trim()) { setError("Username is required."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }

    setLoading(true);
    try {
      if (isSignUp) {
        await signUp({ email: email.trim(), password, displayName: username.trim() });
        // If email confirmation is disabled in Supabase, user is immediately logged in.
        // If confirmation is required, show a message.
      } else {
        await signIn({ email: email.trim(), password });
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(isSignUp ? "signin" : "signup");
    setError("");
    setEmail("");
    setUsername("");
    setPassword("");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, #2a1010 0%, #160a0a 55%, #0d0505 100%)",
      }}
    >
      {/* Film grain overlay */}
      <div className="fixed inset-0 pointer-events-none grain opacity-30" />

      {/* Decorative reel lines */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 border-l border-[#c8973c]"
            style={{ left: `${(i + 1) * 12.5}%` }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-md">

        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full border-2 border-[#c8973c] bg-black/40 mb-4 mx-auto">
            <Film className="h-8 w-8 text-[#c8973c]" />
          </div>
          <h1
            className="text-5xl text-[#c8973c]"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Playback
          </h1>
          <p
            className="mt-1 text-[10px] uppercase tracking-[0.4em] text-[#c8973c]/50"
            style={{ fontFamily: "'Special Elite', monospace" }}
          >
            Personal Cinema Archive
          </p>
        </div>

        {/* Card */}
        <div
          className="relative overflow-hidden rounded-sm border-2 shadow-2xl"
          style={{
            background: "linear-gradient(160deg, #f9f3e7 0%, #f0e8d4 100%)",
            borderColor: "rgba(122,108,97,0.5)",
          }}
        >
          {/* Card top wooden strip */}
          <div
            className="wood-texture px-6 py-4 border-b-2 border-black/30"
          >
            {/* Mode tabs */}
            <div className="flex gap-1 bg-black/20 rounded-sm p-1">
              <button
                type="button"
                onClick={() => mode !== "signin" && switchMode()}
                className={`flex-1 py-2 text-[11px] uppercase tracking-[0.2em] transition-all rounded-sm ${
                  !isSignUp
                    ? "bg-[#c8973c] text-[#1c1010] font-bold"
                    : "text-[#c8973c]/70 hover:text-[#c8973c]"
                }`}
                style={{ fontFamily: "'Special Elite', monospace" }}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => mode !== "signup" && switchMode()}
                className={`flex-1 py-2 text-[11px] uppercase tracking-[0.2em] transition-all rounded-sm ${
                  isSignUp
                    ? "bg-[#c8973c] text-[#1c1010] font-bold"
                    : "text-[#c8973c]/70 hover:text-[#c8973c]"
                }`}
                style={{ fontFamily: "'Special Elite', monospace" }}
              >
                Create Account
              </button>
            </div>
          </div>

          {/* Form body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Grain texture */}
            <div className="absolute inset-0 pointer-events-none grain opacity-10" />

            {/* Email */}
            <div className="relative z-10">
              <label
                className="block text-[9px] uppercase tracking-[0.2em] mb-1.5"
                style={{ color: "var(--color-faded, #7a6c61)", fontFamily: "'Special Elite', monospace" }}
              >
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                autoComplete="email"
                disabled={loading}
                className="w-full bg-transparent border-b-2 py-2 text-base outline-none transition-colors disabled:opacity-50"
                style={{
                  borderColor: "rgba(122,108,97,0.35)",
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "#2a2522",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#7a2020")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(122,108,97,0.35)")}
              />
            </div>

            {/* Username — only on Sign Up */}
            {isSignUp && (
              <div className="relative z-10">
                <label
                  className="block text-[9px] uppercase tracking-[0.2em] mb-1.5"
                  style={{ color: "var(--color-faded, #7a6c61)", fontFamily: "'Special Elite', monospace" }}
                >
                  Username / Display Name
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Khushi"
                  autoComplete="username"
                  disabled={loading}
                  className="w-full bg-transparent border-b-2 py-2 text-xl outline-none transition-colors disabled:opacity-50"
                  style={{
                    borderColor: "rgba(122,108,97,0.35)",
                    fontFamily: "'Bebas Neue', cursive",
                    letterSpacing: "0.12em",
                    color: "#2a2522",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#7a2020")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(122,108,97,0.35)")}
                />
                <p
                  className="text-[8px] uppercase tracking-[0.15em] mt-1 opacity-60"
                  style={{ fontFamily: "'Special Elite', monospace", color: "#7a6c61" }}
                >
                  This is your name on the archive.
                </p>
              </div>
            )}

            {/* Password */}
            <div className="relative z-10">
              <label
                className="block text-[9px] uppercase tracking-[0.2em] mb-1.5"
                style={{ color: "var(--color-faded, #7a6c61)", fontFamily: "'Special Elite', monospace" }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  disabled={loading}
                  className="w-full bg-transparent border-b-2 py-2 pr-10 text-base outline-none transition-colors disabled:opacity-50"
                  style={{
                    borderColor: "rgba(122,108,97,0.35)",
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "#2a2522",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#7a2020")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(122,108,97,0.35)")}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 p-1 opacity-50 hover:opacity-100 transition-opacity"
                >
                  {showPassword
                    ? <EyeOff className="h-4 w-4" style={{ color: "#7a6c61" }} />
                    : <Eye    className="h-4 w-4" style={{ color: "#7a6c61" }} />
                  }
                </button>
              </div>
              {isSignUp && (
                <p
                  className="text-[8px] uppercase tracking-[0.15em] mt-1 opacity-60"
                  style={{ fontFamily: "'Special Elite', monospace", color: "#7a6c61" }}
                >
                  Minimum 6 characters.
                </p>
              )}
            </div>

            {/* Error message */}
            {error && (
              <div
                className="relative z-10 rounded-sm border px-4 py-3 text-sm"
                style={{
                  background: "rgba(122,32,32,0.08)",
                  borderColor: "rgba(122,32,32,0.3)",
                  color: "#7a2020",
                  fontFamily: "'Special Elite', monospace",
                  fontSize: "12px",
                  letterSpacing: "0.05em",
                }}
              >
                {error}
              </div>
            )}

            {/* Submit button */}
            <div className="relative z-10 pt-1">
              <button
                type="submit"
                disabled={loading}
                className="ticket-edge w-full py-3 px-6 border-y-2 border-black/30 transition-all active:translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  background: loading ? "#5a1515" : "#7a2020",
                  color: "#f9f3e7",
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: "20px",
                  letterSpacing: "0.2em",
                }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {isSignUp ? "CREATING ACCOUNT..." : "SIGNING IN..."}
                  </span>
                ) : (
                  isSignUp ? "CREATE ACCOUNT" : "ENTER THE ARCHIVE"
                )}
              </button>
            </div>
          </form>

          {/* Footer ticket stub */}
          <div
            className="px-6 py-3 border-t border-black/10 text-center"
            style={{ background: "rgba(0,0,0,0.04)" }}
          >
            <p
              className="text-[9px] uppercase tracking-[0.2em] opacity-50"
              style={{ fontFamily: "'Special Elite', monospace", color: "#2a2522" }}
            >
              {isSignUp
                ? "Already have an account? "
                : "New to Playback? "}
              <button
                type="button"
                onClick={switchMode}
                className="underline opacity-100 hover:opacity-80 transition-opacity"
                style={{ color: "#7a2020" }}
              >
                {isSignUp ? "Sign in" : "Create account"}
              </button>
            </p>
          </div>
        </div>

        {/* Ticket perforation decoration */}
        <div className="flex justify-center mt-4 gap-1.5 opacity-20">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-1.5 w-1.5 rounded-full bg-[#c8973c]" />
          ))}
        </div>
      </div>
    </div>
  );
}
