import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { i as useMovies, n as useDocTitle } from "./store-BzXj58nY.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Trophy, o as Search } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/leaderboard-DHSfN4JZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function tier(r) {
	if (r >= 9) return {
		label: "MASTERPIECE",
		color: "var(--color-cinema)"
	};
	if (r >= 7) return {
		label: "HIGHLY RATED",
		color: "var(--color-brass)"
	};
	if (r >= 5) return {
		label: "SOLID SCREENING",
		color: "#4a6741"
	};
	return {
		label: "FORGETTABLE",
		color: "var(--color-faded)"
	};
}
function Leaderboard() {
	const movies = useMovies();
	useDocTitle("Leaderboard");
	const [q, setQ] = (0, import_react.useState)("");
	const [selectedGenre, setSelectedGenre] = (0, import_react.useState)("All Genres");
	const genres = (0, import_react.useMemo)(() => {
		const s = /* @__PURE__ */ new Set();
		movies.forEach((m) => {
			if (Array.isArray(m.genres)) m.genres.forEach((g) => {
				if (g && typeof g === "string") s.add(g.trim());
			});
		});
		return Array.from(s).sort((a, b) => a.localeCompare(b));
	}, [movies]);
	const ranked = (0, import_react.useMemo)(() => {
		let list = [...movies].sort((a, b) => b.myRating - a.myRating);
		if (selectedGenre !== "All Genres") list = list.filter((m) => (m.genres || []).includes(selectedGenre));
		if (q) list = list.filter((m) => m.title.toLowerCase().includes(q.toLowerCase()));
		return list;
	}, [
		movies,
		q,
		selectedGenre
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 sm:px-6 lg:px-10 py-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "paper-texture rounded-sm p-6 md:p-8 border border-[color:var(--color-faded)]/40 mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-7 w-7 text-[color:var(--color-brass)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl md:text-4xl text-[color:var(--color-cinema)]",
						children: "Personal Leaderboard"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-serif text-lg text-[color:var(--color-faded)] mt-1",
					children: "Your ultimate ranked list, from masterpiece to flop"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ink-stamp text-xs font-type",
					children: [
						"LOGGED: ",
						ranked.length,
						" ",
						ranked.length === 1 ? "MOVIE" : "MOVIES"
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 min-w-[200px] flex items-center gap-2 bg-[color:var(--color-parchment-2)] border border-[color:var(--color-faded)]/40 rounded-full px-4 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 text-[color:var(--color-faded)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Find in leaderboard...",
						className: "w-full bg-transparent font-serif outline-none placeholder:text-[color:var(--color-faded)]"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "font-type text-[10px] uppercase tracking-widest text-[color:var(--color-faded)] flex items-center gap-2",
					children: ["Genre:", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: selectedGenre,
						onChange: (e) => setSelectedGenre(e.target.value),
						className: "bg-[color:var(--color-parchment)] border border-[color:var(--color-faded)]/40 rounded-sm px-2 py-1 font-type text-[11px] outline-none focus:border-[color:var(--color-cinema)] cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "All Genres",
							children: "All Genres"
						}), genres.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: g,
							children: g
						}, g))]
					})]
				})]
			})]
		}), ranked.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "paper-texture rounded-sm p-12 text-center border-2 border-dashed border-[color:var(--color-faded)]/50 relative overflow-hidden flex flex-col items-center justify-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 pointer-events-none grain opacity-10" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "ticket-edge bg-[color:var(--color-parchment-2)] border border-[color:var(--color-faded)]/50 px-6 py-3 text-center rotate-[-3deg] mb-5 shadow-sm max-w-max",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-sm text-[color:var(--color-cinema)]",
						children: "ADMIT ONE"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-serif text-xl text-[color:var(--color-ink)] mt-2",
					children: movies.length === 0 ? "No screenings ranked yet." : selectedGenre !== "All Genres" ? `Your archive doesn't contain any ${selectedGenre} films yet.` : "No movies match your search."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-type text-xs text-[color:var(--color-faded)] mt-2 uppercase tracking-widest",
					children: movies.length === 0 ? "Log your first movie to begin ranking." : "Try choosing a different genre or query."
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "space-y-3",
			children: ranked.map((m, i) => {
				const t = tier(m.myRating);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/movie/$id",
					params: { id: m.id },
					className: "paper-texture group relative flex items-center gap-4 rounded-sm border border-[color:var(--color-faded)]/40 p-3 hover:-translate-y-0.5 transition-transform shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-16 w-16 shrink-0 place-items-center rounded-sm text-[color:var(--color-parchment)] font-display text-2xl border-2",
							style: {
								background: t.color,
								borderColor: "rgba(0,0,0,0.25)"
							},
							children: String(i + 1).padStart(2, "0")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-20 w-14 shrink-0 bg-[color:var(--color-walnut)] rounded-[2px] overflow-hidden border border-black/30",
							children: m.posterUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: m.posterUrl,
								alt: "",
								className: "h-full w-full object-cover"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 flex-wrap",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-movie text-xl tracking-wide truncate",
										children: m.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-type text-[9px] uppercase tracking-widest px-2 py-0.5 border",
										style: {
											borderColor: t.color,
											color: t.color
										},
										children: t.label
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-type text-[11px] uppercase tracking-widest text-[color:var(--color-faded)]",
									children: (m.genres || []).slice(0, 2).join(" · ")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-type text-[11px] uppercase tracking-widest text-[color:var(--color-faded)] mt-0.5",
									children: [
										m.watchDate,
										" · ",
										m.myRating,
										"/10 ",
										m.rewatchCount > 0 ? `· x${m.rewatchCount}` : ""
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ink-stamp shrink-0 text-lg font-display",
							style: {
								color: t.color,
								borderColor: t.color
							},
							children: [m.myRating, "/10"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden md:block font-type text-[9px] uppercase tracking-widest text-[color:var(--color-faded)]",
							style: {
								writingMode: "vertical-rl",
								transform: "rotate(180deg)"
							},
							children: ["NO. ", m.serial || "—"]
						})
					]
				}) }, m.id);
			})
		})]
	});
}
//#endregion
export { Leaderboard as component };
