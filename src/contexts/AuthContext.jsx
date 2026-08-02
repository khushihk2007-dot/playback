import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabase";

// ─────────────────────────────────────────────────────────────────────────────
// Friendly user-facing error messages
// ─────────────────────────────────────────────────────────────────────────────
function friendlyError(error) {
  if (!error) return "An unexpected error occurred.";
  const msg = error.message || "";
  if (msg.includes("Invalid login credentials"))  return "Incorrect email or password.";
  if (msg.includes("Email not confirmed"))         return "Please confirm your email first.";
  if (msg.includes("User already registered"))     return "An account with this email already exists.";
  if (msg.includes("Password should be at least")) return "Password must be at least 6 characters.";
  if (msg.includes("Unable to validate email"))    return "That email address doesn't look valid.";
  if (msg.includes("Network") || msg.includes("fetch")) return "Network error — check your connection.";
  if (msg.includes("rate limit") || msg.includes("too many")) return "Too many attempts — wait a moment.";
  return msg || "Something went wrong. Please try again.";
}

// ─────────────────────────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────────────────────────
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]               = useState(null);
  const [session, setSession]         = useState(null);
  const [loading, setLoading]         = useState(true);   // true until getSession() resolves
  const [displayName, setDisplayName] = useState("");

  // ── Restore session on mount ───────────────────────────────────────────────
  useEffect(() => {
    // getSession() reads from localStorage — fast on page reload.
    // Only makes a network call if the access token is expired and needs refresh.
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Keep session in sync across tabs / token refreshes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // ── Fetch display_name whenever user changes ────────────────────────────────
  useEffect(() => {
    if (!user) { setDisplayName(""); return; }
    supabase
      .from("profiles")
      .select("display_name")
      .eq("id", user.id)
      .single()
      .then(({ data }) => setDisplayName(data?.display_name || ""));
  }, [user]);

  // ── Sign up — creates auth user + profile row ──────────────────────────────
  const signUp = useCallback(async ({ email, password, displayName: dn }) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw new Error(friendlyError(error));

    const newUser = data.user;
    if (newUser) {
      await supabase.from("profiles").upsert(
        { id: newUser.id, email: newUser.email, display_name: dn || "", created_at: new Date().toISOString() },
        { onConflict: "id" }
      );
      setDisplayName(dn || "");
    }
    return data;
  }, []);

  // ── Sign in ────────────────────────────────────────────────────────────────
  const signIn = useCallback(async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(friendlyError(error));
    return data;
  }, []);

  // ── Sign out ───────────────────────────────────────────────────────────────
  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setDisplayName("");
  }, []);

  // ── Update profile (display name) ──────────────────────────────────────────
  const updateProfile = useCallback(async (patch) => {
    const { data: { user: liveUser }, error: userErr } = await supabase.auth.getUser();
    if (userErr || !liveUser) throw new Error("Not authenticated.");
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: liveUser.id, email: liveUser.email, ...patch }, { onConflict: "id" });
    if (error) throw new Error(friendlyError(error));
    if (patch.display_name !== undefined) setDisplayName(patch.display_name || "");
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, loading, displayName, signIn, signUp, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
