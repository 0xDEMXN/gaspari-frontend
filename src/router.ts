import { createRouter, createWebHistory } from "vue-router";
import EditProfile from "./views/EditProfile.vue";
import AddProfile from "./views/AddProfile.vue";
import Home from "./views/Home.vue";

const routes = [
  { path: "/", component: Home, name: "Home" },
  { path: "/edit/:id", component: EditProfile, name: "EditProfile" },
  { path: "/add", component: AddProfile, name: "AddProfile" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
