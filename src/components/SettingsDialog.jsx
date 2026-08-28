import { useEffect, useState } from "react";
import { X, KeyRound, CheckCircle2 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";

export function SettingsDialog({ open, onOpenChange }) {
  const { user, displayName, signOut, updateProfile, resetPassword } = useAuth();
  const [name, setName]                 = useState("");
  const [isSaving, setIsSaving]         = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isResetting, setIsResetting]   = useState(false);
  const [resetSent, setResetSent]       = useState(false);

  // Sync input with current displayName whenever the dialog opens
  useEffect(() => {
    if (open) {
      setName(displayName || "");
      setResetSent(false);
    }
  }, [open, displayName]);

  if (!open) return null;

  const save = async () => {
    if (!name.trim()) { toast.error("Display name cannot be empty."); return; }
    setIsSaving(true);
    try {
      await updateProfile({ display_name: name.trim() });
      toast.success("Profile updated.");
      onOpenChange(false);
    } catch (err) {
      toast.error(err.message || "Failed to save settings.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      onOpenChange(false);
    } catch (err) {
      toast.error(err.message || "Failed to log out.");
      setIsLoggingOut(false);
    }
  };

  const handleResetPassword = async () => {
    if (!user?.email) return;
    setIsResetting(true);
    try {
      await resetPassword(user.email);
      setResetSent(true);
    } catch (err) {
      toast.error(err.message || "Failed to send reset email.");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="relative w-full max-w-sm overflow-hidden border-2 border-[color:var(--color-walnut)]/40 shadow-2xl rounded-sm flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dark wooden header */}
        <div className="wood-texture flex items-center justify-between px-5 py-4 text-[color:var(--color-parchment)] border-b-2 border-black/40">
          <div>
            <div className="font-display text-2xl text-[color:var(--color-brass)] leading-none">Settings</div>
            <div className="font-type text-[9px] uppercase tracking-[0.25em] text-[color:var(--color-brass)]/70 mt-1">
              PROJECTIONIST PROFILE
            </div>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="text-[color:var(--color-parchment)]/70 hover:text-[color:var(--color-brass)] transition-colors p-1 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Aged paper body */}
        <div className="paper-texture p-6 space-y-6 relative">
          <div className="absolute inset-0 pointer-events-none grain opacity-15" />

          <div className="space-y-4 relative z-10">
            {/* Display Name */}
            <label className="block">
              <div className="font-type text-[9px] uppercase tracking-[0.2em] text-[color:var(--color-faded)] mb-1.5">
                Display Name
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full bg-transparent border-b-2 border-[color:var(--color-walnut)]/30 py-1.5 font-movie text-2xl tracking-widest outline-none focus:border-[color:var(--color-cinema)] transition-colors"
              />
              <div className="font-type text-[8px] uppercase tracking-[0.15em] text-[color:var(--color-faded)]/70 mt-1">
                Owner of this personal cinema archive.
              </div>
            </label>

            {/* Email — read-only */}
            <label className="block">
              <div className="font-type text-[9px] uppercase tracking-[0.2em] text-[color:var(--color-faded)] mb-1.5">
                Email Address
              </div>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full bg-transparent border-b-2 border-[color:var(--color-walnut)]/10 py-1.5 font-serif text-base text-[color:var(--color-faded)] cursor-not-allowed outline-none"
              />
              <div className="font-type text-[8px] uppercase tracking-[0.15em] text-[color:var(--color-faded)]/50 mt-1">
                Read-only ticket credential.
              </div>
            </label>

            {/* Password Reset */}
            <div className="border-t border-[color:var(--color-walnut)]/20 pt-4">
              <div className="font-type text-[9px] uppercase tracking-[0.2em] text-[color:var(--color-faded)] mb-2">
                Password
              </div>
              {resetSent ? (
                <div
                  className="flex items-start gap-2 rounded-sm border px-3 py-2.5"
                  style={{
                    background: "rgba(34,139,34,0.07)",
                    borderColor: "rgba(34,139,34,0.25)",
                    color: "#1e531e",
                  }}
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                  <p className="font-type text-[10px] uppercase tracking-[0.12em] leading-relaxed">
                    Reset link sent to <span className="font-bold">{user?.email}</span>. Check your inbox.
                  </p>
                </div>
              ) : (
                <button
                  onClick={handleResetPassword}
                  disabled={isResetting}
                  className="w-full flex items-center justify-center gap-2 border border-[color:var(--color-walnut)]/50 hover:border-[color:var(--color-cinema)]/60 hover:bg-[color:var(--color-cinema)]/5 text-[color:var(--color-walnut)] hover:text-[color:var(--color-cinema)] py-2 px-4 font-type text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer active:translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed rounded-sm"
                >
                  <KeyRound className="h-3.5 w-3.5" />
                  {isResetting ? "SENDING..." : "SEND PASSWORD RESET EMAIL"}
                </button>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3 pt-2 relative z-10">
            <button
              onClick={save}
              disabled={isSaving}
              className="ticket-edge w-full bg-[color:var(--color-cinema)] hover:bg-[color:var(--color-cinema-dark)] text-[color:var(--color-parchment)] py-2.5 px-4 font-movie text-lg tracking-[0.2em] border-y border-black/35 shadow-md active:translate-y-0.5 transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSaving ? "SAVING..." : "SAVE CHANGES"}
            </button>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full border border-[color:var(--color-walnut)]/60 text-[color:var(--color-walnut)] hover:bg-[color:var(--color-walnut)]/5 py-2.5 px-4 font-type text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer active:translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoggingOut ? "LOGGING OUT..." : "LOG OUT"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
