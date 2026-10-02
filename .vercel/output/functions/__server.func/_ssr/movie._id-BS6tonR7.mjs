import { _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/movie._id-BS6tonR7.js
var $$splitComponentImporter = () => import("./movie._id-C8blTCOT.mjs");
var Route = createFileRoute("/movie/$id")({
	head: () => ({ meta: [{ title: "Ticket — Playback" }, {
		name: "description",
		content: "A logged screening in your archive."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
