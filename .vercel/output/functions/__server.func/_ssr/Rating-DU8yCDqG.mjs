import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Rating-DU8yCDqG.js
var import_jsx_runtime = require_jsx_runtime();
function PunchedRating({ value = 0, max = 10, size = 10 }) {
	const filled = Math.round(value);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-[3px]",
			children: Array.from({ length: max }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `rounded-full transition-colors ${i < filled ? "bg-[color:var(--color-cinema)] shadow-[inset_0_1px_1px_rgba(0,0,0,0.35)]" : "bg-transparent border border-[color:var(--color-faded)]/60"}`,
				style: {
					width: size,
					height: size
				}
			}, i))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "font-type text-xs text-[color:var(--color-ink)]",
			children: [value, "/10"]
		})]
	});
}
//#endregion
export { PunchedRating as t };
