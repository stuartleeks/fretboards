import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import FretTest from "../views/FretTest.vue";
import MajorKeyNotes from "../views/MajorKeyNotes.vue"
import AllNotes from "../views/AllNotes.vue"

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/major-key",
		name: "MajorKeyNotes", 
		component: MajorKeyNotes
	},
	{
		path: "/all-notes",
		name: "AllNote", 
		component: AllNotes
	},
	{
		path: "/frettest",
		name: "FretTest", 
		component: FretTest
	},
	// {
	// 	path: "/about",
	// 	name: "About",
	// 	// route level code-splitting
	// 	// this generates a separate chunk (about.[hash].js) for this route
	// 	// which is lazy-loaded when the route is visited.
	// 	component: () =>
	// 		import(/* webpackChunkName: "about" */ "../views/About.vue"),
	// },
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
