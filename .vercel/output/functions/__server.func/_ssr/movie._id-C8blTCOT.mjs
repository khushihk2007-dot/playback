import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { i as useMovies, n as useDocTitle, r as useMovieActions } from "./store-BzXj58nY.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { S as ArrowLeft, b as Check, c as PenLine, r as Trash2, s as Repeat } from "../_libs/lucide-react.mjs";
import { t as Route } from "./movie._id-BS6tonR7.mjs";
import { t as PunchedRating } from "./Rating-DU8yCDqG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/movie._id-C8blTCOT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MovieDetail() {
	const { id } = Route.useParams();
	const movies = useMovies();
	const { update, remove, logRewatch } = useMovieActions();
	const nav = useNavigate();
	const movie = movies.find((m) => m.id === id);
	useDocTitle(movie ? movie.title : "Ticket");
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)(movie);
	if (!movie) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-10 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-serif text-lg",
			children: "This ticket has been lost to the archives."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "mt-4 inline-block font-type text-xs uppercase tracking-widest text-[color:var(--color-cinema)] underline",
			children: "Return home"
		})]
	});
	const current = editing ? draft : movie;
	const save = () => {
		update(movie.id, {
			title: draft.title,
			myRating: Number(draft.myRating),
			watchDate: draft.watchDate,
			notes: draft.notes,
			watchLocation: draft.watchLocation,
			summary: draft.summary
		});
		setEditing(false);
		toast.success("Ticket updated.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 py-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "font-type text-xs uppercase tracking-widest text-[color:var(--color-faded)] hover:text-[color:var(--color-cinema)] flex items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to archive"]
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
						editing ? "Cancel" : "Edit"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						if (confirm("Burn this ticket from the archive?")) {
							remove(movie.id);
							nav({ to: "/" });
						}
					},
					className: "font-type text-xs uppercase tracking-widest px-3 py-1.5 border border-[color:var(--color-cinema)]/50 text-[color:var(--color-cinema)] hover:bg-[color:var(--color-cinema)]/10 flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), " Delete"]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "paper-texture relative rounded-sm border border-[color:var(--color-faded)]/40 shadow-xl overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid md:grid-cols-2 relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 md:p-10 border-b md:border-b-0 md:border-r border-[color:var(--color-faded)]/30",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-full max-w-[280px] mx-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tape",
								style: {
									top: -10,
									left: "50%",
									transform: "translateX(-50%) rotate(-3deg)",
									width: 70,
									height: 20
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "aspect-[2/3] bg-[color:var(--color-walnut)] rounded-[2px] overflow-hidden border-2 border-black/30 shadow-lg",
								children: current.posterUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: current.posterUrl,
									alt: current.title,
									className: "h-full w-full object-cover",
									style: { filter: "sepia(0.15)" }
								}) : null
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -top-3 -right-3 h-8 w-3 bg-[color:var(--color-brass)] shadow-md",
								style: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)" }
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-type text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-faded)]",
								children: "My Rating"
							}), editing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-type text-sm font-semibold text-[color:var(--color-cinema)]",
								children: [
									"★ ",
									draft.myRating || 0,
									" / 10"
								]
							})]
						}), editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: "1",
								max: "10",
								step: "0.5",
								value: draft.myRating || 5,
								onChange: (e) => setDraft({
									...draft,
									myRating: Number(e.target.value)
								}),
								className: "w-full accent-[color:var(--color-cinema)] cursor-pointer"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between font-type text-[9px] text-[color:var(--color-faded)]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "1 (Poor)" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "5 (Average)" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "10 (Masterpiece)" })
								]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PunchedRating, {
							value: current.myRating,
							size: 14
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 md:p-10 relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-4",
							children: [editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: draft.title,
								onChange: (e) => setDraft({
									...draft,
									title: e.target.value
								}),
								className: "font-movie text-3xl md:text-4xl bg-transparent border-b border-[color:var(--color-faded)]/50 outline-none w-full"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-movie text-3xl md:text-4xl tracking-wide uppercase",
								children: current.title
							}), current.rewatchCount > 0 && !editing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ink-stamp text-xs shrink-0",
								children: ["Rewatched x", current.rewatchCount]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-6 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Genre",
									children: (current.genres || []).join(", ") || "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Runtime",
									children: current.runtime ? `${current.runtime} min` : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Watched On",
									children: editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "date",
										value: draft.watchDate,
										onChange: (e) => setDraft({
											...draft,
											watchDate: e.target.value
										}),
										className: "bg-transparent border-b border-[color:var(--color-faded)]/50 font-type text-sm outline-none"
									}) : (/* @__PURE__ */ new Date(current.watchDate + "T00:00:00")).toLocaleDateString("en-US", {
										day: "2-digit",
										month: "long",
										year: "numeric"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Where I Watched",
									children: editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: draft.watchLocation || "",
										onChange: (e) => setDraft({
											...draft,
											watchLocation: e.target.value
										}),
										className: "bg-transparent border-b border-[color:var(--color-faded)]/50 font-type text-sm outline-none w-full"
									}) : current.watchLocation || "—"
								})
							]
						}),
						current.summary && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-type text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-faded)] mb-1",
								children: "Summary"
							}), editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: draft.summary,
								onChange: (e) => setDraft({
									...draft,
									summary: e.target.value
								}),
								rows: 3,
								className: "w-full bg-[color:var(--color-parchment-2)] border border-[color:var(--color-faded)]/40 p-2 font-serif outline-none"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-serif text-base leading-relaxed",
								children: current.summary
							})]
						}),
						editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: save,
							className: "ticket-edge mt-8 w-full bg-[color:var(--color-cinema)] py-3 font-movie text-lg tracking-widest text-[color:var(--color-parchment)]",
							children: "SAVE CHANGES"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								logRewatch(movie.id);
								toast.success("Encore screening logged.");
							},
							className: "mt-8 w-full flex items-center justify-center gap-2 bg-[color:var(--color-brass)] hover:bg-[color:var(--color-brass-dark)] text-[color:var(--color-walnut)] py-3 font-movie text-lg tracking-widest border-2 border-[color:var(--color-walnut)]/30",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Repeat, { className: "h-4 w-4" }), " LOG A REWATCH"]
						})
					]
				})]
			})
		})]
	});
}
function Row({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-[110px_1fr] items-start gap-3 border-b border-dotted border-[color:var(--color-faded)]/40 pb-2",
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
export { MovieDetail as component };
