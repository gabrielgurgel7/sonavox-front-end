import { createRouter, createWebHistory } from "vue-router";
// Layouts
import CustomerLayout from "@/layouts/CustomerLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
// Views
import HomeView from "@/views/HomeView.vue";
import ProductsView from "@/views/ProductsView.vue";
import ProductDetailView from "@/views/ProductDetailView.vue";
import DashboardView from "@/views/admin/DashboardView.vue";
import OrdersView from "@/views/admin/OrdersView.vue";
import CheckoutView from "@/views/CheckoutView.vue";

// Guards
import { authorizedGuard } from "./guards/authorized.guard";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: CustomerLayout,
      children: [
        {
          path: "",
          component: HomeView,
        },
        {
          path: "products",
          component: ProductsView,
        },
        {
          path: "product/:id",
          component: ProductDetailView,
        },
        {
          path: "checkout",
          component: CheckoutView,
          meta: {
            auth: true,
          },
        },
      ],
    },
    {
      path: "/admin",
      meta: { auth: true, role: "admin" },
      component: AdminLayout,
      children: [
        {
          path: "dashboard",
          component: DashboardView,
        },
        {
          path: "orders",
          component: OrdersView,
        },
        {
          path: "products",
          component: ProductsView,
        },
      ],
    },
  ],
});

authorizedGuard(router);

export default router;
