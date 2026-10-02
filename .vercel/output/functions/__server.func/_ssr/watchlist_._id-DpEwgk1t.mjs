import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as useWatchlist, n as useDocTitle, o as useWatchlistActions } from "./store-BzXj58nY.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { S as ArrowLeft, _ as CircleAlert, b as Check, c as PenLine, r as Trash2 } from "../_libs/lucide-react.mjs";
import { t as AddMovieDialog } from "./AddMovieDialog-CwwBbsxX.mjs";
import { t as PunchedRating } from "./Rating-DU8yCDqG.mjs";
import { t as Route } from "./watchlist_._id-CTwfmrnq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/watchlist_._id-DpEwgk1t.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function WatchlistDetail() {
	const { id } = Route.useParams();
	const watchlist = useWatchlist();
	const { update, remove } = useWatchlistActions();
	const nav = useNavigate();
	const movie = watchlist.find((m) => m.id === id);
	useDocTitle(movie ? movie.title : "Watchlist Details");
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)(movie);
	const [archiveConfirmOpen, setArchiveConfirmOpen] = (0, import_react.useState)(false);
	const [logDialogOpen, setLogDialogOpen] = (0, import_react.useState)(false);
	if (!movie) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-10 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-serif text-lg",
			children: "This movie has been removed from the watchlist or logged."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/watchlist",
			className: "mt-4 inline-block font-type text-xs uppercase tracking-widest text-[color:var(--color-cinema)] underline",
			children: "Return to Watchlist"
		})]
	});
	const save = () => {
		update(movie.id, { expectedRating: Number(draft.expectedRating) || 0 });
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/watchlist",
					className: "font-type text-xs uppercase tracking-widest text-[color:var(--color-faded)] hover:text-[color:var(--color-cinema)] flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to Watchlist"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							setEditing(!editing);
							setDraft(movie);
						},
						className: "font-type text-xs uppercase tracking-widest px-3 py-1.5 border border-[color:var(--color-faded)]/50 hover:bg-[color:var(--color-parchment-2)] flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "h-3.5 w-3.5" }),
							" ",
							editing ? "Cancel" : "Edit Target Rating"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							if (confirm("Remove this movie from the watchlist?")) {
								remove(movie.id);
								nav({ to: "/watchlist" });
							}
						},
						className: "font-type text-xs uppercase tracking-widest px-3 py-1.5 border border-[color:var(--color-cinema)]/50 text-[color:var(--color-cinema)] hover:bg-[color:var(--color-cinema)]/10 flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), " Remove"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "paper-texture relative rounded-sm border border-[color:var(--color-faded)]/40 shadow-xl overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid md:grid-cols-2 relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6 md:p-10 border-b md:border-b-0 md:border-r border-[color:var(--color-faded)]/30 bg-[color:var(--color-parchment)]/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative w-full max-w-[260px] mx-auto",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tape",
									style: {
										top: -10,
										left: "50%",
										transform: "translateX(-50%) rotate(-2deg)",
										width: 70,
										height: 20
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "aspect-[2/3] bg-[color:var(--color-walnut)] rounded-[2px] overflow-hidden border-2 border-black/30 shadow-lg",
									children: movie.posterUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: movie.posterUrl,
										alt: movie.title,
										className: "h-full w-full object-cover",
										style: { filter: "sepia(0.1)" }
									}) : null
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute -top-3 -right-3 h-8 w-3 bg-[color:var(--color-brass)] shadow-md",
									style: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)" }
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-type text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-faded)] mb-2",
								children: "Expected Rating"
							}), editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									min: "1",
									max: "10",
									value: draft.expectedRating || 7,
									onChange: (e) => setDraft({
										...draft,
										expectedRating: Number(e.target.value)
									}),
									className: "w-full accent-[color:var(--color-cinema)]"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-type text-xs text-right font-bold text-[color:var(--color-cinema)]",
									children: [
										"Target: ",
										draft.expectedRating || 7,
										"/10"
									]
								})]
							}) : movie.expectedRating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PunchedRating, {
								value: movie.expectedRating,
								size: 12
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-serif text-sm italic text-[color:var(--color-faded)]",
								children: "No rating expectation set."
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6 md:p-10 relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "font-movie text-3xl md:text-4xl tracking-wide uppercase leading-tight",
									children: movie.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-type text-[8px] uppercase tracking-wider bg-[color:var(--color-brass)]/20 text-[color:var(--color-brass-dark)] border border-[color:var(--color-brass)]/50 px-2 py-0.5 rounded-[2px] shrink-0 mt-1",
									children: "COMING SOON"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "mt-6 space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Genre",
									children: (movie.genres || []).join(", ") || "—"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Runtime",
									children: movie.runtime ? `${movie.runtime} min` : "—"
								})]
							}),
							movie.summary && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-type text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-faded)] mb-1",
									children: "Overview"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-serif text-base leading-relaxed",
									children: movie.summary
								})]
							}),
							editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: save,
								className: "ticket-edge mt-8 w-full bg-[color:var(--color-cinema)] py-3 font-movie text-lg tracking-widest text-[color:var(--color-parchment)]",
								children: "SAVE CHANGES"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setArchiveConfirmOpen(true),
								className: "ticket-edge mt-8 w-full bg-[color:var(--color-cinema)] hover:bg-[color:var(--color-cinema-dark)] text-[color:var(--color-parchment)] py-3 font-movie text-lg tracking-widest flex items-center justify-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-5 w-5" }), " I'VE WATCHED THIS FILM"]
							})
						]
					})]
				})
			}),
			archiveConfirmOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "paper-texture relative w-full max-w-md rounded-sm border-2 border-[color:var(--color-walnut)]/30 shadow-2xl overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "wood-texture px-5 py-3 text-[color:var(--color-parchment)] flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-5 w-5 text-[color:var(--color-brass)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-lg text-[color:var(--color-brass)]",
							children: "Archive this movie?"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-serif text-lg leading-relaxed text-[color:var(--color-ink)]",
							children: [
								"Move ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "font-semibold",
									children: movie.title
								}),
								" from your watchlist into your Playback Archive?"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setArchiveConfirmOpen(false),
								className: "flex-1 font-type text-xs uppercase tracking-widest py-3 border border-[color:var(--color-faded)]/50 hover:bg-[color:var(--color-parchment-2)] rounded-[2px]",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleArchiveConfirm,
								className: "flex-1 bg-[color:var(--color-cinema)] hover:bg-[color:var(--color-cinema-dark)] text-[color:var(--color-parchment)] py-3 font-movie text-base tracking-widest rounded-[2px]",
								children: "Archive Movie"
							})]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddMovieDialog, {
				open: logDialogOpen,
				onOpenChange: setLogDialogOpen,
				initial: movie,
				onSuccess: handleLogSuccess
			})
		]
	});
}
function Row({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-[125px_1fr] items-start gap-3 border-b border-dotted border-[color:var(--color-faded)]/40 pb-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
			className: "font-type text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-faded)] flex items-center gap-1.5 pt-0.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3 text-[color:var(--color-brass-dark)]" }), label]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "font-serif text-lg text-[color:var(--color-ink)]",
			children
		})]
	});
}
//#endregion
export { WatchlistDetail as component };
