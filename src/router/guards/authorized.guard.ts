import type { Router } from "vue-router";
import { useAuthStore } from "@/stores/auth";

export function authorizedGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    if (to.meta.auth) {
      const authStore = useAuthStore();

      if (!authStore.isAuth) {
        next("/login");
      }

      if (to.meta.role && !(to.meta.role as string[]).includes(authStore.getRole ?? "")) {
        next("/");
      }
    }
    next();
  });
}
