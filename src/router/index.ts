import { localCache } from "@/utils/cache";
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

router.beforeEach((to, from) => {
  const userInfo_ = localCache.getCache("userInfo")
  if (to.path.startsWith('/main') && !userInfo_?.token) {
    return '/login'
  }
  if (to.path === '/login' && userInfo_?.token) {
    return '/main'
  }
})

export default router;