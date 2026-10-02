import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as useWatchlist, n as useDocTitle, o as useWatchlistActions } from "./store-BzXj58nY.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as CircleAlert, b as Check, o as Search } from "../_libs/lucide-react.mjs";
import { t as AddMovieDialog } from "./AddMovieDialog-CwwBbsxX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/watchlist.index-IeKXAUoR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Watchlist() {
	const watchlist = useWatchlist();
	const { remove } = useWatchlistActions();
	useDocTitle("Want to Watch");
	const [addOpen, setAddOpen] = (0, import_react.useState)(false);
	const [q, setQ] = (0, import_react.useState)("");
	const [selectedGenre, setSelectedGenre] = (0, import_react.useState)("All");
	const [selectedYear, setSelectedYear] = (0, import_react.useState)("All");
	const [selectedRuntime, setSelectedRuntime] = (0, import_react.useState)("All");
	const [selectedRating, setSelectedRating] = (0, import_react.useState)("All");
	const [sort, setSort] = (0, import_react.useState)("added_desc");
	const [archiveTarget, setArchiveTarget] = (0, import_react.useState)(null);
	const [archiveConfirmOpen, setArchiveConfirmOpen] = (0, import_react.useState)(false);
	const [loggingTarget, setLoggingTarget] = (0, import_react.useState)(null);
	const [logDialogOpen, setLogDialogOpen] = (0, import_react.useState)(false);
	const [animatingId, setAnimatingId] = (0, import_react.useState)(null);
	const genres = (0, import_react.useMemo)(() => {
		const s = /* @__PURE__ */ new Set();
		watchlist.forEach((m) => (m.genres || []).forEach((g) => s.add(g)));
		return ["All", ...Array.from(s).sort()];
	}, [watchlist]);
	const years = (0, import_react.useMemo)(() => {
		const s = /* @__PURE__ */ new Set();
		watchlist.forEach((m) => {
			if (m.year) s.add(m.year);
		});
		return ["All", ...Array.from(s).sort((a, b) => b.localeCompare(a))];
	}, [watchlist]);
	const filtered = (0, import_react.useMemo)(() => {
		let list = watchlist.filter((m) => m.title.toLowerCase().includes(q.toLowerCase()));
		if (selectedGenre !== "All") list = list.filter((m) => (m.genres || []).includes(selectedGenre));
		if (selectedYear !== "All") list = list.filter((m) => m.year === selectedYear);
		if (selectedRating !== "All") {
			const minRating = Number(selectedRating);
			list = list.filter((m) => m.voteAverage >= minRating);
		}
		if (selectedRuntime !== "All") {
			if (selectedRuntime === "short") list = list.filter((m) => m.runtime > 0 && m.runtime < 90);
			else if (selectedRuntime === "medium") list = list.filter((m) => m.runtime >= 90 && m.runtime <= 130);
			else if (selectedRuntime === "long") list = list.filter((m) => m.runtime > 130);
		}
		const arr = [...list];
		switch (sort) {
			case "added_asc":
				arr.reverse();
				break;
			case "alphabetical":
				arr.sort((a, b) => a.title.localeCompare(b.title));
				break;
			case "release_desc":
				arr.sort((a, b) => (b.releaseDate || "").localeCompare(a.releaseDate || ""));
				break;
			case "release_asc":
				arr.sort((a, b) => (a.releaseDate || "").localeCompare(b.releaseDate || ""));
				break;
			case "rating_desc":
				arr.sort((a, b) => b.voteAverage - a.voteAverage);
				break;
			case "runtime_desc":
				arr.sort((a, b) => b.runtime - a.runtime);
				break;
			case "runtime_asc":
				arr.sort((a, b) => a.runtime - b.runtime);
				break;
			default: break;
		}
		return arr;
	}, [
		watchlist,
		q,
		selectedGenre,
		selectedYear,
		selectedRuntime,
		selectedRating,
		sort
	]);
	const handleWatchedClick = (movie) => {
		setArchiveTarget(movie);
		setArchiveConfirmOpen(true);
	};
	const handleArchiveConfirm = () => {
		if (!archiveTarget) return;
		setArchiveConfirmOpen(false);
		setAnimatingId(archiveTarget.id);
		setTimeout(() => {
			setLoggingTarget(archiveTarget);
			setLogDialogOpen(true);
			setAnimatingId(null);
			setArchiveTarget(null);
		}, 1200);
	};
	const handleLogSuccess = (movieData) => {
		if (loggingTarget) {
			remove(loggingTarget.id);
			setLoggingTarget(null);
		}
	};
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
							transform: "rotate(4deg)"
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-type text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-faded)] mb-1",
								children: "Coming Soon"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-3xl md:text-5xl text-[color:var(--color-cinema)] leading-tight",
								children: "Want to Watch"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-serif text-lg text-[color:var(--color-faded)] mt-1",
								children: "Movies waiting for their premiere in your life."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setAddOpen(true),
							className: "ticket-edge bg-[color:var(--color-cinema)] hover:bg-[color:var(--color-cinema-dark)] transition-colors px-6 py-3 font-movie text-base tracking-widest text-[color:var(--color-parchment)] shadow-md",
							children: "+ ADD MOVIE"
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
									placeholder: "Search future screenings...",
									className: "w-full bg-transparent font-serif text-lg outline-none placeholder:text-[color:var(--color-faded)]"
								})]
							})
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "paper-texture rounded-sm border border-[color:var(--color-faded)]/30 p-4 mb-6 text-[11px] font-type uppercase tracking-wider text-[color:var(--color-faded)] space-y-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 cursor-pointer",
							children: ["Genre:", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: selectedGenre,
								onChange: (e) => setSelectedGenre(e.target.value),
								className: "bg-[color:var(--color-parchment)] border border-[color:var(--color-faded)]/40 rounded-sm px-2 py-1 outline-none font-type text-[11px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "All",
									children: "All Genres"
								}), genres.filter((g) => g !== "All").map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: g,
									children: g
								}, g))]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 cursor-pointer",
							children: ["Year:", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: selectedYear,
								onChange: (e) => setSelectedYear(e.target.value),
								className: "bg-[color:var(--color-parchment)] border border-[color:var(--color-faded)]/40 rounded-sm px-2 py-1 outline-none font-type text-[11px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "All",
									children: "All Years"
								}), years.filter((y) => y !== "All").map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: y,
									children: y
								}, y))]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 cursor-pointer",
							children: ["Length:", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: selectedRuntime,
								onChange: (e) => setSelectedRuntime(e.target.value),
								className: "bg-[color:var(--color-parchment)] border border-[color:var(--color-faded)]/40 rounded-sm px-2 py-1 outline-none font-type text-[11px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "All",
										children: "Any Duration"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "short",
										children: "Short (< 90m)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "medium",
										children: "Standard (90m - 130m)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "long",
										children: "Epic (> 130m)"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 cursor-pointer",
							children: ["Min Rating:", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: selectedRating,
								onChange: (e) => setSelectedRating(e.target.value),
								className: "bg-[color:var(--color-parchment)] border border-[color:var(--color-faded)]/40 rounded-sm px-2 py-1 outline-none font-type text-[11px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "All",
										children: "Any Rating"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "8",
										children: "8.0+ Masterpieces"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "7",
										children: "7.0+ Recommended"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "6",
										children: "6.0+ Decent"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-2 cursor-pointer",
							children: ["Sort by:", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: sort,
								onChange: (e) => setSort(e.target.value),
								className: "bg-[color:var(--color-parchment)] border border-[color:var(--color-faded)]/40 rounded-sm px-2 py-1 outline-none font-type text-[11px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "added_desc",
										children: "Recently Added"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "added_asc",
										children: "Oldest Added"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "alphabetical",
										children: "Alphabetical (A–Z)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "release_desc",
										children: "Release Date (Newest)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "release_asc",
										children: "Release Date (Oldest)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "rating_desc",
										children: "Highest TMDB Rating"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "runtime_desc",
										children: "Runtime (Longest)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "runtime_asc",
										children: "Runtime (Shortest)"
									})
								]
							})]
						})
					]
				})
			}),
			filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyWatchlist, {
				onAdd: () => setAddOpen(true),
				isFiltered: watchlist.length > 0
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6",
				children: filtered.map((movie) => {
					const isAnimating = animatingId === movie.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `relative group transition-all duration-1000 ${isAnimating ? "stamp-archived pointer-events-none scale-0 -translate-y-96 -translate-x-96 rotate-[-12deg] opacity-0" : "hover:-translate-y-1 hover:rotate-[0.5deg]"}`,
						style: { transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "paper-texture relative rounded-sm border border-[color:var(--color-faded)]/40 shadow-md p-4 flex flex-col h-full bg-[color:var(--color-parchment)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute top-2 right-2 font-type text-[8px] uppercase tracking-wider bg-[color:var(--color-brass)]/20 text-[color:var(--color-brass-dark)] border border-[color:var(--color-brass)]/50 px-2 py-0.5 rounded-[2px]",
									children: "COMING SOON"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tape opacity-60",
									style: {
										top: -8,
										left: "50%",
										transform: "translateX(-50%) rotate(2deg)",
										width: 50,
										height: 15
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/watchlist/$id",
									params: { id: movie.id },
									className: "block aspect-[2/3] w-full overflow-hidden bg-[color:var(--color-walnut)] rounded-[2px] border border-black/30 shadow-inner relative",
									children: movie.posterUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: movie.posterUrl,
										alt: movie.title,
										loading: "lazy",
										className: "h-full w-full object-cover",
										style: { filter: "sepia(0.12) contrast(1.02)" }
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-full items-center justify-center font-movie text-2xl text-[color:var(--color-brass)]/50",
										children: "NO REEL"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex-1 flex flex-col justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-movie text-lg tracking-wide text-[color:var(--color-ink)] leading-tight uppercase line-clamp-2",
											children: movie.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-type text-[9px] uppercase tracking-[0.15em] text-[color:var(--color-faded)] mt-1 truncate",
											children: (movie.genres || []).slice(0, 2).join(" · ")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-center mt-2 font-type text-[9px] text-[color:var(--color-faded)] uppercase tracking-wider",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: movie.year || "—" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: movie.runtime ? `${movie.runtime}m` : "—" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-0.5 text-[color:var(--color-brass-dark)] font-semibold",
													children: ["★ ", movie.voteAverage ? movie.voteAverage.toFixed(1) : "—"]
												})
											]
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 pt-3 border-t border-dotted border-[color:var(--color-faded)]/30 flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/watchlist/$id",
											params: { id: movie.id },
											className: "flex-1 text-center font-type text-[9px] uppercase tracking-widest py-2 border border-[color:var(--color-faded)]/40 hover:bg-[color:var(--color-parchment-2)] transition-colors rounded-[2px]",
											children: "Details"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => handleWatchedClick(movie),
											className: "flex-1 bg-[color:var(--color-cinema)] hover:bg-[color:var(--color-cinema-dark)] transition-colors text-[color:var(--color-parchment)] font-type text-[9px] uppercase tracking-widest py-2 rounded-[2px] flex items-center justify-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" }), " Watched"]
										})]
									})]
								})
							]
						}), isAnimating && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 z-50 flex items-center justify-center pointer-events-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "ink-stamp border-4 border-dashed border-red-700 text-red-700 font-display text-4xl px-4 py-2 rotate-[-18deg] bg-[color:var(--color-parchment)]/90 shadow-2xl animate-ping duration-1000",
								children: "ARCHIVED"
							})
						})]
					}, movie.id);
				})
			}),
			archiveConfirmOpen && archiveTarget && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
									children: archiveTarget.title
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
				open: addOpen,
				onOpenChange: setAddOpen,
				mode: "watchlist"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddMovieDialog, {
				open: logDialogOpen,
				onOpenChange: setLogDialogOpen,
				initial: loggingTarget,
				onSuccess: handleLogSuccess
			})
		]
	});
}
function EmptyWatchlist({ onAdd, isFiltered }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "paper-texture relative rounded-sm border-2 border-dashed border-[color:var(--color-faded)]/50 p-12 md:p-20 text-center bg-[color:var(--color-parchment)]/30",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				className: "mx-auto h-20 w-20 text-[color:var(--color-brass)]/70 mb-4",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "12",
					cy: "12",
					r: "10"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 2v20M2 12h20M12 12l5 5M12 12l-5 5M12 12l5-5M12 12l-5-5" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-2xl mt-4 text-[color:var(--color-ink)]",
				children: isFiltered ? "No films match your filter criteria" : "No future screenings planned."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-serif text-lg text-[color:var(--color-faded)] mt-2 max-w-md mx-auto",
				children: isFiltered ? "Try adjusting your genres, years, duration, or search query." : "Add your first movie to begin your watchlist."
			}),
			!isFiltered && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onAdd,
				className: "ticket-edge mt-6 inline-block bg-[color:var(--color-cinema)] px-8 py-3 font-movie text-lg tracking-widest text-[color:var(--color-parchment)] shadow-md",
				children: "+ ADD YOUR FIRST MOVIE"
			})
		]
	});
}
//#endregion
export { Watchlist as component };
