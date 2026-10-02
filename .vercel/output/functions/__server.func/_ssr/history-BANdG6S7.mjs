import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { i as useMovies, n as useDocTitle } from "./store-BzXj58nY.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Ticket, u as List, v as ChevronRight, x as Calendar, y as ChevronLeft } from "../_libs/lucide-react.mjs";
import { t as AddMovieDialog } from "./AddMovieDialog-CwwBbsxX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/history-BANdG6S7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function History() {
	const movies = useMovies();
	useDocTitle("Watch History");
	const [view, setView] = (0, import_react.useState)("calendar");
	const [month, setMonth] = (0, import_react.useState)(() => {
		const d = /* @__PURE__ */ new Date();
		return {
			y: d.getFullYear(),
			m: d.getMonth()
		};
	});
	const [addOpen, setAddOpen] = (0, import_react.useState)(false);
	const byDay = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		movies.forEach((mv) => {
			const key = mv.watchDate;
			if (!key) return;
			if (!map.has(key)) map.set(key, []);
			map.get(key).push(mv);
		});
		return map;
	}, [movies]);
	const first = new Date(month.y, month.m, 1);
	const startDay = first.getDay();
	const daysInMonth = new Date(month.y, month.m + 1, 0).getDate();
	const monthLabel = first.toLocaleDateString("en-US", {
		month: "long",
		year: "numeric"
	});
	const cells = [];
	for (let i = 0; i < startDay; i++) cells.push(null);
	for (let d = 1; d <= daysInMonth; d++) cells.push(d);
	const nav = (delta) => {
		let y = month.y, m = month.m + delta;
		if (m < 0) {
			m = 11;
			y--;
		} else if (m > 11) {
			m = 0;
			y++;
		}
		setMonth({
			y,
			m
		});
	};
	const chronological = (0, import_react.useMemo)(() => [...movies].sort((a, b) => b.watchDate.localeCompare(a.watchDate)), [movies]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "paper-texture rounded-sm p-6 md:p-8 border border-[color:var(--color-faded)]/40 mb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-7 w-7 text-[color:var(--color-brass)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl md:text-4xl text-[color:var(--color-cinema)]",
							children: "Watch History"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-serif text-lg text-[color:var(--color-faded)]",
							children: "Chronological screening schedule"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "wood-texture rounded-full p-1 flex gap-1 border-2 border-black/40",
						children: [[
							"calendar",
							Calendar,
							"Calendar"
						], [
							"list",
							List,
							"List View"
						]].map(([id, Icon, lbl]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setView(id),
							className: `px-4 py-1.5 rounded-full font-type text-[11px] uppercase tracking-widest flex items-center gap-2 ${view === id ? "bg-[color:var(--color-cinema)] text-[color:var(--color-parchment)]" : "text-[color:var(--color-parchment)]/70"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" }),
								" ",
								lbl
							]
						}, id))
					})]
				})
			}),
			view === "calendar" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "paper-texture rounded-sm p-4 md:p-6 border border-[color:var(--color-faded)]/40 relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden md:flex absolute left-2 top-6 bottom-6 flex-col justify-around",
						children: Array.from({ length: 10 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-3 rounded-full bg-[color:var(--color-paper)] border border-[color:var(--color-faded)]/40" }, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:pl-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => nav(-1),
									className: "p-2 border border-[color:var(--color-faded)]/40 hover:bg-[color:var(--color-parchment-2)]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl uppercase tracking-wider",
									children: monthLabel
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => nav(1),
									className: "p-2 border border-[color:var(--color-faded)]/40 hover:bg-[color:var(--color-parchment-2)]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-7 gap-1 md:gap-2",
							children: [[
								"SUN",
								"MON",
								"TUE",
								"WED",
								"THU",
								"FRI",
								"SAT"
							].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-type text-[10px] uppercase tracking-widest text-[color:var(--color-faded)] text-center py-1 border-b border-[color:var(--color-faded)]/30",
								children: d
							}, d)), cells.map((d, i) => {
								if (d === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-[80px]" }, i);
								const key = `${month.y}-${String(month.m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
								const items = byDay.get(key) || [];
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-h-[80px] md:min-h-[110px] border border-[color:var(--color-faded)]/25 p-1.5 md:p-2 relative bg-[color:var(--color-parchment)]/40",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-type text-[10px] text-[color:var(--color-faded)]",
										children: d
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 space-y-1",
										children: [items.slice(0, 2).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/movie/$id",
											params: { id: m.id },
											className: "block bg-[color:var(--color-parchment-2)] border border-[color:var(--color-faded)]/50 px-1.5 py-1 shadow-sm rotate-[-1deg] hover:rotate-0 transition-transform",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-movie text-[10px] md:text-[11px] leading-tight truncate",
												children: m.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex gap-[2px] mt-0.5",
												children: Array.from({ length: 5 }).map((_, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1.5 w-1.5 rounded-full ${k < Math.round(m.myRating / 2) ? "bg-[color:var(--color-cinema)]" : "border border-[color:var(--color-faded)]/60"}` }, k))
											})]
										}, m.id)), items.length > 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "font-type text-[9px] text-[color:var(--color-faded)]",
											children: [
												"+",
												items.length - 2,
												" more"
											]
										})]
									})]
								}, i);
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setAddOpen(true),
						className: "ticket-edge absolute bottom-4 right-4 bg-[color:var(--color-cinema)] px-5 py-2 font-movie text-sm tracking-widest text-[color:var(--color-parchment)] shadow-lg hidden md:block",
						children: "+ LOG MOVIE"
					})
				]
			}) : chronological.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "paper-texture rounded-sm p-10 text-center border-2 border-dashed border-[color:var(--color-faded)]/50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "mx-auto h-10 w-10 text-[color:var(--color-brass)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-serif text-lg text-[color:var(--color-faded)] mt-2",
					children: "No screenings on the schedule yet."
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: chronological.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/movie/$id",
					params: { id: m.id },
					className: "paper-texture flex items-center gap-4 p-3 border border-[color:var(--color-faded)]/40 rounded-sm hover:-translate-y-0.5 transition-transform",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-type text-[10px] uppercase tracking-widest text-[color:var(--color-faded)] w-24 shrink-0",
							children: (/* @__PURE__ */ new Date(m.watchDate + "T00:00:00")).toLocaleDateString("en-US", {
								day: "2-digit",
								month: "short",
								year: "numeric"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-14 w-10 bg-[color:var(--color-walnut)] rounded-[2px] overflow-hidden",
							children: m.posterUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: m.posterUrl,
								className: "h-full w-full object-cover",
								alt: ""
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-movie text-lg truncate",
								children: m.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-type text-[10px] uppercase tracking-widest text-[color:var(--color-faded)]",
								children: (m.genres || []).join(" · ")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-type text-sm",
							children: [m.myRating, "/10"]
						})
					]
				}) }, m.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddMovieDialog, {
				open: addOpen,
				onOpenChange: setAddOpen
			})
		]
	});
}
//#endregion
export { History as component };
