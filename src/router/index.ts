import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", redirect: "/main" },
    { path: "/login", component: () => import("@/views/login/index.vue") },
    { path: "/main", component: () => import("@/views/main/index.vue") },
    { path: "/:pathMatch(.*)", component: () => import("@/views/notFound/index.vue") }
  ]
});

export default router;