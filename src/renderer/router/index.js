import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: "/",
			name: "main",
			redirect: { name: "clock-list", params: { day: "today" } },
			component: require("@/views/main").default,
			children: [
				{
					path: "clock-list/:day",
					name: "clock-list",
					component: require("@/views/main").default,
					props: { default: true },
				},
			],
		},
		{
			path: "chart",
			name: "chart",
			component: () => import("../views/chart/index.vue"),
		},
		{
			path: "report",
			name: "report",
			component: () => import("../views/report/index.vue"),
		},
		{
			path: "*",
			redirect: "/",
		},
	],
});
