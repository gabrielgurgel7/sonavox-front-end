import type { Router } from "vue-router";
import { useAuthStore } from "@/stores/auth";

export function authorizedGuard(router: Router) {
  router.beforeEach((to) => {
    if (to.meta.auth) {
      const authStore = useAuthStore();

      if (!authStore.isAuth) {
        return { path: "/login", query: { redirect: to.fullPath } };
      }

      if (to.meta.role && !(to.meta.role as string[]).includes(authStore.getRole ?? "")) {
        return "/";
      }
    }
  });
}
