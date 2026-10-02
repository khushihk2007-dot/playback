import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { i as useMovies, n as useDocTitle } from "./store-BzXj58nY.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Ticket, o as Search } from "../_libs/lucide-react.mjs";
import { t as AddMovieDialog } from "./AddMovieDialog-CwwBbsxX.mjs";
import { t as PunchedRating } from "./Rating-DU8yCDqG.mjs";
import { n as useAuth } from "./AuthContext-C9eGYkF4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-HhU-I9F5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TicketCard({ movie }) {
	const dateStr = movie.watchDate ? (/* @__PURE__ */ new Date(movie.watchDate + "T00:00:00")).toLocaleDateString("en-US", {
		day: "2-digit",
		month: "short",
		year: "numeric"
	}).toUpperCase() : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/movie/$id",
		params: { id: movie.id },
		className: "group relative block transition-transform duration-300 hover:-translate-y-1 hover:rotate-[0.4deg]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "paper-texture relative rounded-sm border border-[color:var(--color-faded)]/40 shadow-[0_4px_10px_rgba(43,26,26,0.15),0_1px_2px_rgba(43,26,26,0.1)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tape",
					style: {
						top: -8,
						left: "50%",
						transform: "translateX(-50%) rotate(-4deg)",
						width: 60,
						height: 18
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute left-1 top-3 font-type text-[9px] uppercase tracking-widest text-[color:var(--color-faded)]",
					style: {
						writingMode: "vertical-rl",
						transform: "rotate(180deg)"
					},
					children: ["NO. ", movie.serial || "000000"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pl-6 pr-4 pt-5 pb-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-[2/3] w-full overflow-hidden bg-[color:var(--color-walnut)] rounded-[2px] border border-black/40 shadow-inner",
							children: [movie.posterUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: movie.posterUrl,
								alt: movie.title,
								loading: "lazy",
								className: "h-full w-full object-cover",
								style: { filter: "sepia(0.15) contrast(1.05)" }
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-full items-center justify-center font-movie text-2xl text-[color:var(--color-brass)]/50",
								children: "NO REEL"
							}), movie.rewatchCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute -top-2 -right-2 ink-stamp text-[10px] rotate-[8deg]",
								style: { transform: "rotate(8deg)" },
								children: ["Rewatch x", movie.rewatchCount]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "my-3 border-t border-dashed border-[color:var(--color-faded)]/50 relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -left-3 -top-1.5 h-3 w-3 rounded-full bg-[color:var(--color-paper)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -right-3 -top-1.5 h-3 w-3 rounded-full bg-[color:var(--color-paper)]" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-movie text-xl tracking-wide text-[color:var(--color-ink)] leading-tight uppercase truncate",
							children: movie.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-type text-[10px] uppercase tracking-[0.15em] text-[color:var(--color-faded)] mt-1 truncate",
							children: (movie.genres || []).slice(0, 2).join(" · ")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-type text-[10px] uppercase tracking-[0.15em] text-[color:var(--color-faded)] mt-1",
							children: [
								dateStr,
								" ",
								movie.watchTime ? `· ${movie.watchTime}` : ""
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PunchedRating, { value: movie.myRating })
						})
					]
				})
			]
		})
	});
}
function greeting(name) {
	if (!name) return {
		line1: "Welcome to your archive",
		line2: "Ready for another screening?"
	};
	const h = (/* @__PURE__ */ new Date()).getHours();
	return {
		line1: `${h < 5 ? "Late show" : h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : h < 21 ? "Good evening" : "Good night"}, ${name}.`,
		line2: "Your archive awaits."
	};
}
var SORTS = [
	{
		id: "newest",
		label: "Newest Watched"
	},
	{
		id: "oldest",
		label: "Oldest Watched"
	},
	{
		id: "rating_desc",
		label: "Rating: High → Low"
	},
	{
		id: "rating_asc",
		label: "Rating: Low → High"
	},
	{
		id: "title",
		label: "Title (A–Z)"
	},
	{
		id: "added",
		label: "Recently Added"
	}
];
function Home() {
	const movies = useMovies();
	const { displayName } = useAuth();
	useDocTitle();
	const g = greeting(displayName || "");
	const [q, setQ] = (0, import_react.useState)("");
	const [genre, setGenre] = (0, import_react.useState)("All");
	const [sort, setSort] = (0, import_react.useState)("newest");
	const [addOpen, setAddOpen] = (0, import_react.useState)(false);
	const genres = (0, import_react.useMemo)(() => {
		const s = /* @__PURE__ */ new Set();
		movies.forEach((m) => (m.genres || []).forEach((g) => s.add(g)));
		return ["All", ...Array.from(s)];
	}, [movies]);
	const filtered = (0, import_react.useMemo)(() => {
		let list = movies.filter((m) => m.title.toLowerCase().includes(q.toLowerCase()));
		if (genre !== "All") list = list.filter((m) => (m.genres || []).includes(genre));
		const arr = [...list];
		switch (sort) {
			case "oldest":
				arr.sort((a, b) => a.watchDate.localeCompare(b.watchDate));
				break;
			case "rating_desc":
				arr.sort((a, b) => b.myRating - a.myRating);
				break;
			case "rating_asc":
				arr.sort((a, b) => a.myRating - b.myRating);
				break;
			case "title":
				arr.sort((a, b) => a.title.localeCompare(b.title));
				break;
			case "added":
				arr.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
				break;
			default: arr.sort((a, b) => b.watchDate.localeCompare(a.watchDate));
		}
		return arr;
	}, [
		movies,
		q,
		genre,
		sort
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "paper-texture relative rounded-sm border border-[color:var(--color-faded)]/40 p-6 md:p-8 mb-8 shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tape hidden sm:block",
						style: {
							top: -10,
							right: 30,
							width: 80,
							height: 22,
							transform: "rotate(6deg)"
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 md:flex md:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-type text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-faded)] mb-1",
									children: g.line1
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "font-display text-3xl md:text-5xl text-[color:var(--color-cinema)] leading-tight",
									children: "Playback"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-serif text-lg text-[color:var(--color-faded)] mt-1",
									children: g.line2
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setAddOpen(true),
								className: "ticket-edge bg-[color:var(--color-cinema)] hover:bg-[color:var(--color-cinema-dark)] transition-colors px-6 py-3 font-movie text-base tracking-widest text-[color:var(--color-parchment)] shadow-md cursor-pointer",
								children: "+ LOG MOVIE"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 relative",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "wood-texture rounded-full p-1 border-2 border-black/40",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 bg-[color:var(--color-parchment)] rounded-full px-5 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-5 w-5 text-[color:var(--color-faded)] shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: q,
									onChange: (e) => setQ(e.target.value),
									placeholder: "Search your archive...",
									className: "w-full bg-transparent font-serif text-lg outline-none placeholder:text-[color:var(--color-faded)]"
								})]
							})
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-3 mb-4 overflow-x-auto pb-2 -mx-1 px-1",
				children: genres.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setGenre(g),
					className: `shrink-0 rounded-full px-4 py-1.5 font-type text-[11px] uppercase tracking-[0.15em] border-2 transition-all ${genre === g ? "bg-[color:var(--color-cinema)] text-[color:var(--color-parchment)] border-[color:var(--color-cinema)] shadow-[0_2px_0_rgba(0,0,0,0.15)]" : "border-[color:var(--color-faded)]/50 text-[color:var(--color-faded)] hover:border-[color:var(--color-cinema)]/60"}`,
					children: g
				}, g))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-[color:var(--color-ink)]",
					children: "The Archive"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-2 font-type text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-faded)]",
					children: ["Sort by", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: sort,
						onChange: (e) => setSort(e.target.value),
						className: "bg-[color:var(--color-parchment)] border border-[color:var(--color-faded)]/40 rounded-sm px-2 py-1 font-type text-[11px]",
						children: SORTS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s.id,
							children: s.label
						}, s.id))
					})]
				})]
			}),
			filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				onAdd: () => setAddOpen(true),
				hasMovies: movies.length > 0,
				name: displayName
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5",
				children: filtered.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketCard, { movie: m }, m.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddMovieDialog, {
				open: addOpen,
				onOpenChange: setAddOpen
			})
		]
	});
}
function EmptyState({ onAdd, hasMovies, name }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "paper-texture relative rounded-sm border-2 border-dashed border-[color:var(--color-faded)]/50 p-10 md:p-16 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "mx-auto h-12 w-12 text-[color:var(--color-brass)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-2xl mt-3",
				children: hasMovies ? "No films match that search" : `${name || "You"} hasn't archived any films yet`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-serif text-lg text-[color:var(--color-faded)] mt-2 max-w-md mx-auto",
				children: hasMovies ? "Try a different title or genre." : "Log your first movie to begin your cinematic journey."
			}),
			!hasMovies && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onAdd,
				className: "ticket-edge mt-6 inline-block bg-[color:var(--color-cinema)] px-8 py-3 font-movie text-lg tracking-widest text-[color:var(--color-parchment)]",
				children: "+ LOG YOUR FIRST MOVIE"
			})
		]
	});
}
//#endregion
export { Home as component };
