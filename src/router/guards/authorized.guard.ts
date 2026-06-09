import type { Router, RouteLocationNormalized } from "vue-router";

export function authorizedGuard(router: Router) {
  router.beforeEach((to: RouteLocationNormalized) => {
    if (to?.meta?.auth) {
      const token = {
        isAuth: false,
        role: "customer",
      };

      if (!token.isAuth) {
        return "/login";
      }

      if (to.meta.role && to.meta.role !== token.role) {
        return "/";
      }
    }
  });
}
