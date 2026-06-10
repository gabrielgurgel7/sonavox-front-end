import type { Router } from "vue-router";
import { useAuthStore } from "@/stores/auth";

export function authenticatedGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    console.log(to, "to");
    if (to.meta.auth) {
      if (useAuthStore().isAuth) {
        next();
      } else {
        next("/login");
      }
    }
    next();
  });
}
