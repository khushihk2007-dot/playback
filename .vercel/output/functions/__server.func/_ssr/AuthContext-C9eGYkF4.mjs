import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as supabase } from "./store-BzXj58nY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AuthContext-C9eGYkF4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function friendlyError(error) {
	if (!error) return "An unexpected error occurred.";
	const msg = error.message || "";
	if (msg.includes("Invalid login credentials")) return "Incorrect email or password.";
	if (msg.includes("Email not confirmed")) return "Please confirm your email first.";
	if (msg.includes("User already registered")) return "An account with this email already exists.";
	if (msg.includes("Password should be at least")) return "Password must be at least 6 characters.";
	if (msg.includes("Unable to validate email")) return "That email address doesn't look valid.";
	if (msg.includes("Network") || msg.includes("fetch")) return "Network error — check your connection.";
	if (msg.includes("rate limit") || msg.includes("too many")) return "Too many attempts — wait a moment.";
	return msg || "Something went wrong. Please try again.";
}
var AuthContext = (0, import_react.createContext)(null);
function AuthProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [session, setSession] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [displayName, setDisplayName] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
			setUser(session?.user ?? null);
			setLoading(false);
		});
		const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
			setUser(session?.user ?? null);
		});
		return () => subscription.unsubscribe();
	}, []);
	(0, import_react.useEffect)(() => {
		if (!user) {
			setDisplayName("");
			return;
		}
		supabase.from("profiles").select("display_name").eq("id", user.id).single().then(({ data }) => setDisplayName(data?.display_name || ""));
	}, [user]);
	const signUp = (0, import_react.useCallback)(async ({ email, password, displayName: dn }) => {
		const { data, error } = await supabase.auth.signUp({
			email,
			password
		});
		if (error) throw new Error(friendlyError(error));
		const newUser = data.user;
		if (newUser) {
			await supabase.from("profiles").upsert({
				id: newUser.id,
				email: newUser.email,
				display_name: dn || "",
				created_at: (/* @__PURE__ */ new Date()).toISOString()
			}, { onConflict: "id" });
			setDisplayName(dn || "");
		}
		return data;
	}, []);
	const signIn = (0, import_react.useCallback)(async ({ email, password }) => {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		if (error) throw new Error(friendlyError(error));
		return data;
	}, []);
	const signOut = (0, import_react.useCallback)(async () => {
		await supabase.auth.signOut();
		setDisplayName("");
	}, []);
	const updateProfile = (0, import_react.useCallback)(async (patch) => {
		const { data: { user: liveUser }, error: userErr } = await supabase.auth.getUser();
		if (userErr || !liveUser) throw new Error("Not authenticated.");
		const { error } = await supabase.from("profiles").upsert({
			id: liveUser.id,
			email: liveUser.email,
			...patch
		}, { onConflict: "id" });
		if (error) throw new Error(friendlyError(error));
		if (patch.display_name !== void 0) setDisplayName(patch.display_name || "");
	}, []);
	const resetPassword = (0, import_react.useCallback)(async (email) => {
		const { data, error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin });
		if (error) throw new Error(friendlyError(error));
		return data;
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			user,
			session,
			loading,
			displayName,
			signIn,
			signUp,
			signOut,
			updateProfile,
			resetPassword
		},
		children
	});
}
function useAuth() {
	const ctx = (0, import_react.useContext)(AuthContext);
	if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
	return ctx;
}
//#endregion
export { useAuth as n, AuthProvider as t };
