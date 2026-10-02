import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { o as useWatchlistActions, r as useMovieActions } from "./store-BzXj58nY.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { l as LoaderCircle, o as Search, t as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AddMovieDialog-CwwBbsxX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TMDB_KEY = "8878e57ea040834ea01a5c21ba642d36";
var BASE = "https://api.tmdb.org/3";
var POSTER = (p, size = "w500") => p ? `https://image.tmdb.org/t/p/${size}${p}` : "";
var genreCache = null;
async function getGenreMap() {
	if (genreCache) return genreCache;
	const res = await fetch(`${BASE}/genre/movie/list?api_key=${TMDB_KEY}`);
	if (!res.ok) throw new Error("Failed to load genres");
	const data = await res.json();
	genreCache = Object.fromEntries((data.genres || []).map((g) => [g.id, g.name]));
	return genreCache;
}
async function searchMovies(query) {
	if (!query.trim()) return [];
	const res = await fetch(`${BASE}/search/movie?api_key=${TMDB_KEY}&query=${encodeURIComponent(query)}&include_adult=false`);
	if (!res.ok) throw new Error("TMDB search failed");
	const data = await res.json();
	const map = await getGenreMap();
	return (data.results || []).slice(0, 8).map((r) => ({
		tmdbId: r.id,
		title: r.title,
		year: r.release_date ? r.release_date.slice(0, 4) : "",
		posterUrl: POSTER(r.poster_path, "w342"),
		posterPath: r.poster_path,
		summary: r.overview || "",
		genres: (r.genre_ids || []).map((id) => map[id]).filter(Boolean)
	}));
}
async function getMovieDetails(id) {
	const res = await fetch(`${BASE}/movie/${id}?api_key=${TMDB_KEY}&append_to_response=credits`);
	if (!res.ok) throw new Error("TMDB details failed");
	const d = await res.json();
	const director = (d.credits?.crew || []).find((c) => c.job === "Director")?.name || "";
	const cast = (d.credits?.cast || []).slice(0, 5).map((c) => c.name);
	return {
		tmdbId: d.id,
		title: d.title,
		posterUrl: d.poster_path ? POSTER(d.poster_path, "w500") : "",
		backdropUrl: d.backdrop_path ? POSTER(d.backdrop_path, "w1280") : "",
		summary: d.overview || "",
		genres: (d.genres || []).map((g) => g.name),
		runtime: d.runtime || 0,
		director,
		year: d.release_date ? d.release_date.slice(0, 4) : "",
		releaseDate: d.release_date || "",
		voteAverage: d.vote_average || 0,
		cast
	};
}
function AddMovieDialog({ open, onOpenChange, initial, mode = "archive", onSuccess }) {
	const [step, setStep] = (0, import_react.useState)("search");
	const [logType, setLogType] = (0, import_react.useState)("past");
	const [q, setQ] = (0, import_react.useState)("");
	const [results, setResults] = (0, import_react.useState)([]);
	const [searching, setSearching] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [picked, setPicked] = (0, import_react.useState)(null);
	const [rating, setRating] = (0, import_react.useState)(7);
	const [watchDate, setWatchDate] = (0, import_react.useState)(() => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const [watchTime, setWatchTime] = (0, import_react.useState)("");
	const [rewatchCount, setRewatchCount] = (0, import_react.useState)(0);
	const [notes, setNotes] = (0, import_react.useState)("");
	const [location, setLocation] = (0, import_react.useState)("");
	const [isSaving, setIsSaving] = (0, import_react.useState)(false);
	const timer = (0, import_react.useRef)();
	const { add } = useMovieActions();
	const { add: addToWatchlist } = useWatchlistActions();
	(0, import_react.useEffect)(() => {
		if (open) if (initial) {
			setPicked(initial);
			setStep("details");
			setNotes(initial.notes || initial.summary || "");
		} else {
			setStep("search");
			setPicked(null);
			setNotes("");
		}
		else {
			setStep("search");
			setQ("");
			setResults([]);
			setPicked(null);
			setRating(7);
			setWatchDate((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
			setRewatchCount(0);
			setNotes("");
			setLocation("");
			setWatchTime("");
			setError("");
		}
	}, [open, initial]);
	(0, import_react.useEffect)(() => {
		clearTimeout(timer.current);
		if (!q.trim()) {
			setResults([]);
			return;
		}
		timer.current = setTimeout(async () => {
			setSearching(true);
			setError("");
			try {
				const r = await searchMovies(q);
				setResults(r);
				if (r.length === 0) setError("No films found in the reels.");
			} catch (e) {
				setError("Could not reach the archive. Check your connection or TMDB key.");
			} finally {
				setSearching(false);
			}
		}, 300);
		return () => clearTimeout(timer.current);
	}, [q]);
	const choose = async (r) => {
		setNotes(r.summary || "");
		try {
			const details = await getMovieDetails(r.tmdbId);
			if (mode === "watchlist") {
				await addToWatchlist({
					tmdbId: details.tmdbId,
					title: details.title,
					posterUrl: details.posterUrl,
					backdropUrl: details.backdropUrl,
					summary: details.summary,
					genres: details.genres,
					runtime: details.runtime,
					director: details.director,
					year: details.year,
					releaseDate: details.releaseDate,
					voteAverage: details.voteAverage,
					cast: details.cast
				});
				toast.success("Ticket printed. Added to Want to Watch.");
				onOpenChange(false);
			} else {
				setPicked(details);
				if (details.releaseDate) setWatchDate(details.releaseDate);
				setStep("details");
			}
		} catch {
			const fallback = {
				tmdbId: r.tmdbId,
				title: r.title,
				posterUrl: r.posterUrl,
				summary: r.summary,
				genres: r.genres,
				runtime: 0,
				director: "",
				year: r.year,
				releaseDate: "",
				voteAverage: 0,
				cast: []
			};
			if (mode === "watchlist") {
				await addToWatchlist(fallback);
				toast.success("Ticket printed. Added to Want to Watch.");
				onOpenChange(false);
			} else {
				setPicked(fallback);
				setStep("details");
			}
		}
	};
	const save = async () => {
		if (!picked || isSaving) return;
		setIsSaving(true);
		try {
			await add({
				title: picked.title,
				posterUrl: picked.posterUrl,
				summary: picked.summary,
				genres: picked.genres,
				tmdbId: picked.tmdbId,
				director: picked.director,
				runtime: picked.runtime,
				myRating: Number(rating),
				watchDate: watchDate || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				watchTime: logType === "past" ? "" : watchTime,
				rewatchCount: Number(rewatchCount),
				watchLocation: logType === "past" ? location || "Past Screening (Vault)" : location,
				notes
			});
			toast.success(logType === "past" ? "Movie rated & archived in Past Vault!" : "Ticket printed. Filed in the archive.");
			if (onSuccess) onSuccess(picked);
			onOpenChange(false);
		} catch (err) {
			toast.error(err.message || "Failed to save. Please try again.");
		} finally {
			setIsSaving(false);
		}
	};
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm",
		onClick: () => onOpenChange(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "paper-texture relative w-full max-w-2xl max-h-[90vh] overflow-auto rounded-sm border-2 border-[color:var(--color-walnut)]/30 shadow-2xl",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "wood-texture flex items-center justify-between px-5 py-3 text-[color:var(--color-parchment)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-xl text-[color:var(--color-brass)]",
						children: step === "search" ? logType === "past" ? "Quick Rate Previously Watched Film" : "Log a New Screening" : logType === "past" ? "Rate Past Screening" : "Ticket Details"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-type text-[10px] uppercase tracking-[0.25em] opacity-70",
						children: logType === "past" ? "Vault Entry" : "Admit One"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => onOpenChange(false),
						className: "text-[color:var(--color-parchment)]/70 hover:text-[color:var(--color-brass)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
					})]
				}),
				mode === "archive" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex border-b border-[color:var(--color-faded)]/30 bg-[color:var(--color-parchment-2)]/60 text-xs font-type uppercase tracking-wider",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setLogType("past"),
						className: `flex-1 py-2.5 px-4 text-center border-r border-[color:var(--color-faded)]/30 transition-colors ${logType === "past" ? "bg-[color:var(--color-parchment)] font-bold text-[color:var(--color-cinema)] border-b-2 border-b-[color:var(--color-cinema)]" : "text-[color:var(--color-faded)] hover:text-[color:var(--color-ink)]"}`,
						children: "🕰️ Quick Rate (Past Film)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setLogType("detailed"),
						className: `flex-1 py-2.5 px-4 text-center transition-colors ${logType === "detailed" ? "bg-[color:var(--color-parchment)] font-bold text-[color:var(--color-cinema)] border-b-2 border-b-[color:var(--color-cinema)]" : "text-[color:var(--color-faded)] hover:text-[color:var(--color-ink)]"}`,
						children: "🎟️ Full Cinema Ticket"
					})]
				}),
				step === "search" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-type text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-faded)] mb-2",
								children: logType === "past" ? "Search a movie you've watched in the past" : "Search the reels"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 border-b-2 border-[color:var(--color-walnut)]/50 pb-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-5 w-5 text-[color:var(--color-faded)]" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										autoFocus: true,
										value: q,
										onChange: (e) => setQ(e.target.value),
										placeholder: "Type a movie title...",
										className: "flex-1 bg-transparent font-serif text-xl outline-none placeholder:text-[color:var(--color-faded)]/60"
									}),
									searching && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin text-[color:var(--color-faded)]" })
								]
							})]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-type text-sm text-[color:var(--color-cinema)]",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2",
							children: results.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => choose(r),
								className: "w-full flex items-center gap-3 p-2 hover:bg-[color:var(--color-parchment-2)] rounded-sm text-left border border-transparent hover:border-[color:var(--color-faded)]/30",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-20 w-14 shrink-0 bg-[color:var(--color-walnut)] rounded-[2px] overflow-hidden",
									children: r.posterUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: r.posterUrl,
										alt: "",
										className: "h-full w-full object-cover"
									}) : null
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-movie text-lg tracking-wide truncate",
										children: r.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-type text-[11px] uppercase tracking-widest text-[color:var(--color-faded)]",
										children: [
											r.year,
											" ",
											r.genres.length ? ` · ${r.genres.slice(0, 2).join(", ")}` : ""
										]
									})]
								})]
							}, r.tmdbId))
						})
					]
				}),
				step === "details" && picked && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 sm:p-6 grid gap-5 md:grid-cols-[160px_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "max-w-[160px] mx-auto md:mx-0 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "aspect-[2/3] bg-[color:var(--color-walnut)] rounded-[2px] overflow-hidden border border-black/30 shadow-md",
							children: picked.posterUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: picked.posterUrl,
								alt: "",
								className: "h-full w-full object-cover"
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-movie text-2xl tracking-wide",
								children: picked.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-type text-[11px] uppercase tracking-widest text-[color:var(--color-faded)]",
								children: picked.genres.join(" · ")
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "My Rating",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "range",
											min: "1",
											max: "10",
											step: "0.5",
											value: rating,
											onChange: (e) => setRating(e.target.value),
											className: "w-full accent-[color:var(--color-cinema)] cursor-pointer"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-type text-base font-bold text-[color:var(--color-cinema)] shrink-0 ml-3",
											children: [
												"★ ",
												rating,
												"/10"
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between font-type text-[9px] text-[color:var(--color-faded)]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "1 (Poor)" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "5 (Average)" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "10 (Masterpiece)" })
										]
									})]
								})
							}),
							logType === "past" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Date/Year Watched",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "date",
										value: watchDate,
										onChange: (e) => setWatchDate(e.target.value),
										className: "w-full bg-transparent border-b border-[color:var(--color-faded)]/50 py-1 font-type text-sm outline-none focus:border-[color:var(--color-cinema)]"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Where Watched (Optional)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: location,
										onChange: (e) => setLocation(e.target.value),
										placeholder: "e.g. TV / Theater / Netflix",
										className: "w-full bg-transparent border-b border-[color:var(--color-faded)]/50 py-1 font-type text-sm outline-none focus:border-[color:var(--color-cinema)]"
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Quick Thoughts / Review (Optional)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: notes,
									onChange: (e) => setNotes(e.target.value),
									rows: 3,
									placeholder: "Memory of watching this film...",
									className: "w-full bg-[color:var(--color-parchment-2)] border border-[color:var(--color-faded)]/40 p-2 font-serif text-base outline-none focus:border-[color:var(--color-cinema)] placeholder:text-[color:var(--color-faded)]/60"
								})
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Watch Date",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "date",
											value: watchDate,
											onChange: (e) => setWatchDate(e.target.value),
											className: "w-full bg-transparent border-b border-[color:var(--color-faded)]/50 py-1 font-type text-sm outline-none focus:border-[color:var(--color-cinema)]"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Showtime",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "time",
											value: watchTime,
											onChange: (e) => setWatchTime(e.target.value),
											className: "w-full bg-transparent border-b border-[color:var(--color-faded)]/50 py-1 font-type text-sm outline-none focus:border-[color:var(--color-cinema)]"
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Rewatch Count",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											min: "0",
											value: rewatchCount,
											onChange: (e) => setRewatchCount(e.target.value),
											className: "w-full bg-transparent border-b border-[color:var(--color-faded)]/50 py-1 font-type text-sm outline-none focus:border-[color:var(--color-cinema)]"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Where I Watched",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: location,
											onChange: (e) => setLocation(e.target.value),
											placeholder: "Home Theatre",
											className: "w-full bg-transparent border-b border-[color:var(--color-faded)]/50 py-1 font-type text-sm outline-none focus:border-[color:var(--color-cinema)]"
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Notes",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										value: notes,
										onChange: (e) => setNotes(e.target.value),
										rows: 4,
										placeholder: "Write your thoughts about this movie...",
										className: "w-full bg-[color:var(--color-parchment-2)] border border-[color:var(--color-faded)]/40 p-2 font-serif text-base outline-none focus:border-[color:var(--color-cinema)] placeholder:text-[color:var(--color-faded)]/60"
									})
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setStep("search"),
									className: "font-type text-xs uppercase tracking-widest px-4 py-2 border border-[color:var(--color-faded)]/50 hover:bg-[color:var(--color-parchment-2)]",
									children: "← Back"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: save,
									disabled: isSaving,
									className: "ticket-edge flex-1 bg-[color:var(--color-cinema)] hover:bg-[color:var(--color-cinema-dark)] py-3 font-movie text-lg tracking-widest text-[color:var(--color-parchment)] disabled:opacity-70 disabled:cursor-not-allowed",
									children: isSaving ? "SAVING..." : logType === "past" ? "LOG TO PAST VAULT" : "PRINT TICKET"
								})]
							})
						]
					})]
				})
			]
		})
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-type text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-faded)] mb-1",
			children: label
		}), children]
	});
}
//#endregion
export { AddMovieDialog as t };
