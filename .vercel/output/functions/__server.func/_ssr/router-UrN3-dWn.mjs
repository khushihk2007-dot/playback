import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { S as useRouter, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, y as createRootRouteWithContext } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { S as ArrowLeft, a as Settings, d as KeyRound, f as Film, g as CircleCheck, h as Clapperboard, i as Ticket, l as LoaderCircle, m as EyeOff, n as Trophy, p as Eye, t as X, x as Calendar } from "../_libs/lucide-react.mjs";
import { t as AddMovieDialog } from "./AddMovieDialog-CwwBbsxX.mjs";
import { t as Route$5 } from "./movie._id-BS6tonR7.mjs";
import { n as useAuth, t as AuthProvider } from "./AuthContext-C9eGYkF4.mjs";
import { t as Route$6 } from "./watchlist_._id-CTwfmrnq.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-UrN3-dWn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-gYZPN1_8.css";
function reportError(error, context = {}) {
	console.error("Projector Error Boundary Captured:", error, context);
}
function SettingsDialog({ open, onOpenChange }) {
	const { user, displayName, signOut, updateProfile, resetPassword } = useAuth();
	const [name, setName] = (0, import_react.useState)("");
	const [isSaving, setIsSaving] = (0, import_react.useState)(false);
	const [isLoggingOut, setIsLoggingOut] = (0, import_react.useState)(false);
	const [isResetting, setIsResetting] = (0, import_react.useState)(false);
	const [resetSent, setResetSent] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (open) {
			setName(displayName || "");
			setResetSent(false);
		}
	}, [open, displayName]);
	if (!open) return null;
	const save = async () => {
		if (!name.trim()) {
			toast.error("Display name cannot be empty.");
			return;
		}
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs",
		onClick: () => onOpenChange(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-sm overflow-hidden border-2 border-[color:var(--color-walnut)]/40 shadow-2xl rounded-sm flex flex-col",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "wood-texture flex items-center justify-between px-5 py-4 text-[color:var(--color-parchment)] border-b-2 border-black/40",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-2xl text-[color:var(--color-brass)] leading-none",
					children: "Settings"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-type text-[9px] uppercase tracking-[0.25em] text-[color:var(--color-brass)]/70 mt-1",
					children: "PROJECTIONIST PROFILE"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => onOpenChange(false),
					className: "text-[color:var(--color-parchment)]/70 hover:text-[color:var(--color-brass)] transition-colors p-1 cursor-pointer",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "paper-texture p-6 space-y-6 relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 pointer-events-none grain opacity-15" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 relative z-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-type text-[9px] uppercase tracking-[0.2em] text-[color:var(--color-faded)] mb-1.5",
										children: "Display Name"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: name,
										onChange: (e) => setName(e.target.value),
										placeholder: "Your name",
										className: "w-full bg-transparent border-b-2 border-[color:var(--color-walnut)]/30 py-1.5 font-movie text-2xl tracking-widest outline-none focus:border-[color:var(--color-cinema)] transition-colors"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-type text-[8px] uppercase tracking-[0.15em] text-[color:var(--color-faded)]/70 mt-1",
										children: "Owner of this personal cinema archive."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-type text-[9px] uppercase tracking-[0.2em] text-[color:var(--color-faded)] mb-1.5",
										children: "Email Address"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "email",
										value: user?.email || "",
										readOnly: true,
										className: "w-full bg-transparent border-b-2 border-[color:var(--color-walnut)]/10 py-1.5 font-serif text-base text-[color:var(--color-faded)] cursor-not-allowed outline-none"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-type text-[8px] uppercase tracking-[0.15em] text-[color:var(--color-faded)]/50 mt-1",
										children: "Read-only ticket credential."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t border-[color:var(--color-walnut)]/20 pt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-type text-[9px] uppercase tracking-[0.2em] text-[color:var(--color-faded)] mb-2",
									children: "Password"
								}), resetSent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-2 rounded-sm border px-3 py-2.5",
									style: {
										background: "rgba(34,139,34,0.07)",
										borderColor: "rgba(34,139,34,0.25)",
										color: "#1e531e"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-type text-[10px] uppercase tracking-[0.12em] leading-relaxed",
										children: [
											"Reset link sent to ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold",
												children: user?.email
											}),
											". Check your inbox."
										]
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: handleResetPassword,
									disabled: isResetting,
									className: "w-full flex items-center justify-center gap-2 border border-[color:var(--color-walnut)]/50 hover:border-[color:var(--color-cinema)]/60 hover:bg-[color:var(--color-cinema)]/5 text-[color:var(--color-walnut)] hover:text-[color:var(--color-cinema)] py-2 px-4 font-type text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer active:translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed rounded-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "h-3.5 w-3.5" }), isResetting ? "SENDING..." : "SEND PASSWORD RESET EMAIL"]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 pt-2 relative z-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: save,
							disabled: isSaving,
							className: "ticket-edge w-full bg-[color:var(--color-cinema)] hover:bg-[color:var(--color-cinema-dark)] text-[color:var(--color-parchment)] py-2.5 px-4 font-movie text-lg tracking-[0.2em] border-y border-black/35 shadow-md active:translate-y-0.5 transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed",
							children: isSaving ? "SAVING..." : "SAVE CHANGES"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handleLogout,
							disabled: isLoggingOut,
							className: "w-full border border-[color:var(--color-walnut)]/60 text-[color:var(--color-walnut)] hover:bg-[color:var(--color-walnut)]/5 py-2.5 px-4 font-type text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer active:translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed",
							children: isLoggingOut ? "LOGGING OUT..." : "LOG OUT"
						})]
					})
				]
			})]
		})
	});
}
var NAV = [
	{
		to: "/",
		label: "Home Archive",
		icon: Film,
		exact: true
	},
	{
		to: "/watchlist",
		label: "Want to Watch",
		icon: Clapperboard
	},
	{
		to: "/leaderboard",
		label: "Leaderboard",
		icon: Trophy
	},
	{
		to: "/history",
		label: "Watch History",
		icon: Calendar
	}
];
function Sidebar() {
	const [addOpen, setAddOpen] = (0, import_react.useState)(false);
	const [settingsOpen, setSettingsOpen] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { displayName } = useAuth();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "wood-texture hidden lg:flex lg:w-72 xl:w-80 flex-col text-[color:var(--color-parchment)] border-r-4 border-black/40 relative overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 pointer-events-none opacity-40",
					style: { backgroundImage: "radial-gradient(circle at 50% 10%, rgba(200,155,60,0.15), transparent 60%)" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative p-6 border-b border-white/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-12 w-12 place-items-center rounded-full border-2 border-[color:var(--color-brass)] bg-black/30",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Film, { className: "h-6 w-6 text-[color:var(--color-brass)]" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-2xl leading-none text-[color:var(--color-brass)]",
								children: displayName || "Playback"
							}), displayName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-movie text-xl tracking-widest text-[color:var(--color-parchment)]/90",
								children: "PLAYBACK"
							})]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "relative flex-1 p-4 space-y-1",
					children: [NAV.map((n) => {
						const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
						const Icon = n.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: n.to,
							className: `group flex items-center gap-3 px-4 py-3 rounded-sm font-type text-[13px] uppercase tracking-[0.15em] transition-all ${active ? "bg-black/40 text-[color:var(--color-brass)] shadow-[inset_2px_0_0_0_var(--color-brass),inset_-1px_-1px_0_rgba(255,255,255,0.05)]" : "text-[color:var(--color-parchment)]/75 hover:text-[color:var(--color-brass)] hover:bg-black/20"}`,
							style: { textShadow: active ? "0 1px 0 rgba(0,0,0,0.6)" : "none" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: n.label
							})]
						}, n.to);
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-4 space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setAddOpen(true),
							className: "group relative w-full block cursor-pointer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ticket-edge bg-[color:var(--color-cinema)] hover:bg-[color:var(--color-cinema-dark)] transition-colors py-3 px-5 text-center border-y-2 border-black/40",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-movie text-xl tracking-[0.2em] text-[color:var(--color-parchment)]",
									children: "+ LOG A MOVIE"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-type text-[9px] uppercase tracking-[0.3em] text-[color:var(--color-parchment)]/70 mt-0.5",
									children: "ADMIT ONE"
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setSettingsOpen(true),
							className: "flex items-center gap-2 px-2 py-1 font-type text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-parchment)]/60 hover:text-[color:var(--color-brass)] cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-3.5 w-3.5" }), " Settings"]
						})]
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "wood-texture lg:hidden flex items-center gap-3 px-4 py-3 text-[color:var(--color-parchment)] border-b-2 border-black/40",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-10 w-10 place-items-center rounded-full border-2 border-[color:var(--color-brass)] bg-black/30 shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Film, { className: "h-5 w-5 text-[color:var(--color-brass)]" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0 flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-lg leading-none text-[color:var(--color-brass)]",
						children: displayName ? `${displayName}'s Playback` : "Playback"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setSettingsOpen(true),
					className: "text-[color:var(--color-parchment)]/70",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-5 w-5" })
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "lg:hidden fixed bottom-3 left-3 right-3 z-40 wood-texture rounded-full border-2 border-black/40 shadow-2xl px-3 py-2 flex items-center justify-around text-[color:var(--color-parchment)]",
			children: NAV.map((n, i) => {
				const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
				const Icon = n.icon;
				if (i === 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setAddOpen(true),
						className: "grid h-14 w-14 -mt-8 place-items-center rounded-full bg-[color:var(--color-cinema)] border-4 border-[color:var(--color-brass)] shadow-lg",
						"aria-label": "Log a movie",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "h-6 w-6 text-[color:var(--color-parchment)]" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: n.to,
						className: `p-2 ${active ? "text-[color:var(--color-brass)]" : "text-[color:var(--color-parchment)]/75"}`,
						"aria-label": n.label,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
					})]
				}, "add");
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: n.to,
					className: `p-2 ${active ? "text-[color:var(--color-brass)]" : "text-[color:var(--color-parchment)]/75"}`,
					"aria-label": n.label,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
				}, n.to);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddMovieDialog, {
			open: addOpen,
			onOpenChange: setAddOpen
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsDialog, {
			open: settingsOpen,
			onOpenChange: setSettingsOpen
		})
	] });
}
function AuthPage() {
	const { signIn, signUp, resetPassword } = useAuth();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [email, setEmail] = (0, import_react.useState)("");
	const [username, setUsername] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [resetSent, setResetSent] = (0, import_react.useState)(false);
	const isSignUp = mode === "signup";
	const isReset = mode === "reset";
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		if (!email.trim()) {
			setError("Email address is required.");
			return;
		}
		if (isReset) {
			setLoading(true);
			try {
				await resetPassword(email.trim());
				setResetSent(true);
			} catch (err) {
				setError(err.message || "Failed to send password reset email.");
			} finally {
				setLoading(false);
			}
			return;
		}
		if (!password.trim()) {
			setError("Password is required.");
			return;
		}
		if (isSignUp && !username.trim()) {
			setError("Username is required.");
			return;
		}
		if (password.length < 6) {
			setError("Password must be at least 6 characters.");
			return;
		}
		setLoading(true);
		try {
			if (isSignUp) await signUp({
				email: email.trim(),
				password,
				displayName: username.trim()
			});
			else await signIn({
				email: email.trim(),
				password
			});
		} catch (err) {
			setError(err.message || "Something went wrong.");
		} finally {
			setLoading(false);
		}
	};
	const switchMode = (newMode) => {
		setMode(newMode);
		setError("");
		setResetSent(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex items-center justify-center px-4 py-12",
		style: { background: "radial-gradient(ellipse at 50% 0%, #2a1010 0%, #160a0a 55%, #0d0505 100%)" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "fixed inset-0 pointer-events-none grain opacity-30" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 pointer-events-none overflow-hidden opacity-5",
				children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute top-0 bottom-0 border-l border-[#c8973c]",
					style: { left: `${(i + 1) * 12.5}%` }
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative w-full max-w-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center mb-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "inline-flex items-center justify-center h-16 w-16 rounded-full border-2 border-[#c8973c] bg-black/40 mb-4 mx-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Film, { className: "h-8 w-8 text-[#c8973c]" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-5xl text-[#c8973c]",
								style: { fontFamily: "'DM Serif Display', serif" },
								children: "Playback"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[10px] uppercase tracking-[0.4em] text-[#c8973c]/50",
								style: { fontFamily: "'Special Elite', monospace" },
								children: "Personal Cinema Archive"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative overflow-hidden rounded-sm border-2 shadow-2xl",
						style: {
							background: "linear-gradient(160deg, #f9f3e7 0%, #f0e8d4 100%)",
							borderColor: "rgba(122,108,97,0.5)"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "wood-texture px-6 py-4 border-b-2 border-black/30",
								children: isReset ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => switchMode("signin"),
										className: "inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-[#c8973c]/80 hover:text-[#c8973c] transition-colors cursor-pointer",
										style: { fontFamily: "'Special Elite', monospace" },
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), " Back to Sign In"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] uppercase tracking-[0.2em] text-[#c8973c]/50",
										style: { fontFamily: "'Special Elite', monospace" },
										children: "Reset Mode"
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-1 bg-black/20 rounded-sm p-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => switchMode("signin"),
										className: `flex-1 py-2 text-[11px] uppercase tracking-[0.2em] transition-all rounded-sm cursor-pointer ${mode === "signin" ? "bg-[#c8973c] text-[#1c1010] font-bold" : "text-[#c8973c]/70 hover:text-[#c8973c]"}`,
										style: { fontFamily: "'Special Elite', monospace" },
										children: "Sign In"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => switchMode("signup"),
										className: `flex-1 py-2 text-[11px] uppercase tracking-[0.2em] transition-all rounded-sm cursor-pointer ${mode === "signup" ? "bg-[#c8973c] text-[#1c1010] font-bold" : "text-[#c8973c]/70 hover:text-[#c8973c]"}`,
										style: { fontFamily: "'Special Elite', monospace" },
										children: "Create Account"
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleSubmit,
								className: "p-6 space-y-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 pointer-events-none grain opacity-10" }),
									isReset && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative z-10 text-center pb-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "inline-flex items-center justify-center h-10 w-10 rounded-full bg-[#7a2020]/10 border border-[#7a2020]/30 text-[#7a2020] mb-2 mx-auto",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "h-5 w-5" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "text-2xl text-[#2a2522]",
												style: { fontFamily: "'DM Serif Display', serif" },
												children: "Reset Password"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] uppercase tracking-[0.15em] text-[#7a6c61] mt-1",
												style: { fontFamily: "'Special Elite', monospace" },
												children: "Enter your email to receive a password reset link"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative z-10",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-[9px] uppercase tracking-[0.2em] mb-1.5",
											style: {
												color: "var(--color-faded, #7a6c61)",
												fontFamily: "'Special Elite', monospace"
											},
											children: "Email Address"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "email",
											value: email,
											onChange: (e) => setEmail(e.target.value),
											placeholder: "your@email.com",
											autoComplete: "email",
											disabled: loading || isReset && resetSent,
											className: "w-full bg-transparent border-b-2 py-2 text-base outline-none transition-colors disabled:opacity-50",
											style: {
												borderColor: "rgba(122,108,97,0.35)",
												fontFamily: "'Cormorant Garamond', serif",
												color: "#2a2522"
											},
											onFocus: (e) => e.target.style.borderColor = "#7a2020",
											onBlur: (e) => e.target.style.borderColor = "rgba(122,108,97,0.35)"
										})]
									}),
									isSignUp && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative z-10",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-[9px] uppercase tracking-[0.2em] mb-1.5",
												style: {
													color: "var(--color-faded, #7a6c61)",
													fontFamily: "'Special Elite', monospace"
												},
												children: "Username / Display Name"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: username,
												onChange: (e) => setUsername(e.target.value),
												placeholder: "Khushi",
												autoComplete: "username",
												disabled: loading,
												className: "w-full bg-transparent border-b-2 py-2 text-xl outline-none transition-colors disabled:opacity-50",
												style: {
													borderColor: "rgba(122,108,97,0.35)",
													fontFamily: "'Bebas Neue', cursive",
													letterSpacing: "0.12em",
													color: "#2a2522"
												},
												onFocus: (e) => e.target.style.borderColor = "#7a2020",
												onBlur: (e) => e.target.style.borderColor = "rgba(122,108,97,0.35)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[8px] uppercase tracking-[0.15em] mt-1 opacity-60",
												style: {
													fontFamily: "'Special Elite', monospace",
													color: "#7a6c61"
												},
												children: "This is your name on the archive."
											})
										]
									}),
									!isReset && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative z-10",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between mb-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block text-[9px] uppercase tracking-[0.2em]",
													style: {
														color: "var(--color-faded, #7a6c61)",
														fontFamily: "'Special Elite', monospace"
													},
													children: "Password"
												}), mode === "signin" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => switchMode("reset"),
													className: "text-[9px] uppercase tracking-[0.15em] transition-colors hover:underline hover:opacity-80 cursor-pointer",
													style: {
														color: "#7a2020",
														fontFamily: "'Special Elite', monospace"
													},
													children: "Forgot password?"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: showPassword ? "text" : "password",
													value: password,
													onChange: (e) => setPassword(e.target.value),
													placeholder: "••••••••",
													autoComplete: isSignUp ? "new-password" : "current-password",
													disabled: loading,
													className: "w-full bg-transparent border-b-2 py-2 pr-10 text-base outline-none transition-colors disabled:opacity-50",
													style: {
														borderColor: "rgba(122,108,97,0.35)",
														fontFamily: "'Cormorant Garamond', serif",
														color: "#2a2522"
													},
													onFocus: (e) => e.target.style.borderColor = "#7a2020",
													onBlur: (e) => e.target.style.borderColor = "rgba(122,108,97,0.35)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													tabIndex: -1,
													onClick: () => setShowPassword((v) => !v),
													className: "absolute right-1 top-1/2 -translate-y-1/2 p-1 opacity-50 hover:opacity-100 transition-opacity",
													children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, {
														className: "h-4 w-4",
														style: { color: "#7a6c61" }
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
														className: "h-4 w-4",
														style: { color: "#7a6c61" }
													})
												})]
											}),
											isSignUp && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[8px] uppercase tracking-[0.15em] mt-1 opacity-60",
												style: {
													fontFamily: "'Special Elite', monospace",
													color: "#7a6c61"
												},
												children: "Minimum 6 characters."
											})
										]
									}),
									error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "relative z-10 rounded-sm border px-4 py-3 text-sm",
										style: {
											background: "rgba(122,32,32,0.08)",
											borderColor: "rgba(122,32,32,0.3)",
											color: "#7a2020",
											fontFamily: "'Special Elite', monospace",
											fontSize: "12px",
											letterSpacing: "0.05em"
										},
										children: error
									}),
									isReset && resetSent && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative z-10 rounded-sm border px-4 py-3 text-center space-y-2",
										style: {
											background: "rgba(34,139,34,0.08)",
											borderColor: "rgba(34,139,34,0.3)",
											color: "#1e531e",
											fontFamily: "'Special Elite', monospace",
											fontSize: "12px",
											letterSpacing: "0.05em"
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "inline-flex items-center justify-center h-8 w-8 rounded-full bg-green-100 text-green-700 mx-auto",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-semibold",
												children: "Password Reset Email Sent!"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[11px] opacity-90 leading-relaxed",
												children: [
													"We've sent a password reset link to ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "underline font-bold",
														children: email
													}),
													". Please check your inbox and follow the link to reset your password."
												]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "relative z-10 pt-1",
										children: isReset ? !resetSent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "submit",
											disabled: loading,
											className: "ticket-edge w-full py-3 px-6 border-y-2 border-black/30 transition-all active:translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer",
											style: {
												background: loading ? "#5a1515" : "#7a2020",
												color: "#f9f3e7",
												fontFamily: "'Bebas Neue', cursive",
												fontSize: "20px",
												letterSpacing: "0.2em"
											},
											children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center justify-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), "SENDING RESET LINK..."]
											}) : "SEND RESET LINK"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => switchMode("signin"),
											className: "ticket-edge w-full py-3 px-6 border-y-2 border-black/30 transition-all active:translate-y-0.5 cursor-pointer",
											style: {
												background: "#7a2020",
												color: "#f9f3e7",
												fontFamily: "'Bebas Neue', cursive",
												fontSize: "20px",
												letterSpacing: "0.2em"
											},
											children: "RETURN TO SIGN IN"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "submit",
											disabled: loading,
											className: "ticket-edge w-full py-3 px-6 border-y-2 border-black/30 transition-all active:translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer",
											style: {
												background: loading ? "#5a1515" : "#7a2020",
												color: "#f9f3e7",
												fontFamily: "'Bebas Neue', cursive",
												fontSize: "20px",
												letterSpacing: "0.2em"
											},
											children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center justify-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), isSignUp ? "CREATING ACCOUNT..." : "SIGNING IN..."]
											}) : isSignUp ? "CREATE ACCOUNT" : "ENTER THE ARCHIVE"
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "px-6 py-3 border-t border-black/10 text-center",
								style: { background: "rgba(0,0,0,0.04)" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[9px] uppercase tracking-[0.2em] opacity-60",
									style: {
										fontFamily: "'Special Elite', monospace",
										color: "#2a2522"
									},
									children: isReset ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										"Remembered your password?",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => switchMode("signin"),
											className: "underline opacity-100 hover:opacity-80 transition-opacity font-bold cursor-pointer",
											style: { color: "#7a2020" },
											children: "Sign in"
										})
									] }) : isSignUp ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										"Already have an account?",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => switchMode("signin"),
											className: "underline opacity-100 hover:opacity-80 transition-opacity font-bold cursor-pointer",
											style: { color: "#7a2020" },
											children: "Sign in"
										})
									] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										"New to Playback?",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => switchMode("signup"),
											className: "underline opacity-100 hover:opacity-80 transition-opacity font-bold cursor-pointer",
											style: { color: "#7a2020" },
											children: "Create account"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mx-1 opacity-40",
											children: "•"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => switchMode("reset"),
											className: "underline opacity-100 hover:opacity-80 transition-opacity font-bold cursor-pointer",
											style: { color: "#7a2020" },
											children: "Reset password"
										})
									] })
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-center mt-4 gap-1.5 opacity-20",
						children: Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1.5 w-1.5 rounded-full bg-[#c8973c]" }, i))
					})
				]
			})
		]
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "paper-bg flex min-h-screen items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "paper-texture max-w-md rounded-md p-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-7xl text-[color:var(--color-cinema)]",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-type mt-2 text-sm uppercase tracking-widest text-[color:var(--color-faded)]",
					children: "Reel not found in the archive"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "font-type mt-6 inline-block border-2 border-[color:var(--color-cinema)] bg-[color:var(--color-cinema)] px-5 py-2 text-sm uppercase tracking-widest text-[color:var(--color-parchment)]",
					children: "Return to Archive"
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportError(error, { boundary: "root_error_boundary" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "paper-bg flex min-h-screen items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "paper-texture max-w-md rounded-md p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl",
					children: "A frame slipped in the projector"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-type mt-2 text-xs uppercase tracking-widest text-[color:var(--color-faded)]",
					children: "Try rewinding"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						router.invalidate();
						reset();
					},
					className: "font-type mt-6 border-2 border-[color:var(--color-cinema)] bg-[color:var(--color-cinema)] px-5 py-2 text-sm uppercase tracking-widest text-[color:var(--color-parchment)]",
					children: "Rewind"
				})
			]
		})
	});
}
var Route$4 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Playback — Personal Cinema Archive" },
			{
				name: "description",
				content: "A vintage personal movie logging journal. Log, rate and remember every film you've watched."
			},
			{
				property: "og:title",
				content: "Playback"
			},
			{
				property: "og:description",
				content: "A vintage personal cinema archive."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Cormorant+Garamond:wght@400;600;700&family=Bebas+Neue&family=IBM+Plex+Sans:wght@400;500;600&family=Special+Elite&family=Caveat:wght@400;600&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			style: { background: "#160a0a" },
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})]
		})]
	});
}
function AppGate({ queryClient }) {
	const { session, loading } = useAuth();
	if (loading) return null;
	if (!session) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthPage, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "paper-bg min-h-screen",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-screen flex-col lg:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "grain flex-1 min-w-0 pb-24 lg:pb-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
			position: "bottom-center",
			toastOptions: { style: {
				fontFamily: "Special Elite, monospace",
				background: "#f9f3e7",
				color: "#2a2522",
				border: "1px solid rgba(122,108,97,0.4)"
			} }
		})]
	});
}
function RootComponent() {
	const { queryClient } = Route$4.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppGate, { queryClient }) });
}
var $$splitComponentImporter$3 = () => import("./routes-HhU-I9F5.mjs");
var Route$3 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "Playback — Home Archive" }, {
		name: "description",
		content: "Your personal cinema archive of logged films."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./history-BANdG6S7.mjs");
var Route$2 = createFileRoute("/history")({
	head: () => ({ meta: [{ title: "Watch History — Playback" }, {
		name: "description",
		content: "Your chronological cinema screening schedule."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./leaderboard-DHSfN4JZ.mjs");
var Route$1 = createFileRoute("/leaderboard")({
	head: () => ({ meta: [{ title: "Leaderboard — Playback" }, {
		name: "description",
		content: "Your ranked list of films, from masterpiece to flop."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./watchlist.index-IeKXAUoR.mjs");
var Route = createFileRoute("/watchlist/")({
	head: () => ({ meta: [{ title: "Want to Watch — Playback" }, {
		name: "description",
		content: "Movies waiting for their premiere in your life."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$3.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$4
});
var HistoryRoute = Route$2.update({
	id: "/history",
	path: "/history",
	getParentRoute: () => Route$4
});
var LeaderboardRoute = Route$1.update({
	id: "/leaderboard",
	path: "/leaderboard",
	getParentRoute: () => Route$4
});
var MovieIdRoute = Route$5.update({
	id: "/movie/$id",
	path: "/movie/$id",
	getParentRoute: () => Route$4
});
var WatchlistIndexRoute = Route.update({
	id: "/watchlist/",
	path: "/watchlist/",
	getParentRoute: () => Route$4
});
var rootRouteChildren = {
	IndexRoute,
	HistoryRoute,
	LeaderboardRoute,
	MovieIdRoute,
	WatchlistIdRoute: Route$6.update({
		id: "/watchlist_/$id",
		path: "/watchlist/$id",
		getParentRoute: () => Route$4
	}),
	WatchlistIndexRoute
};
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
