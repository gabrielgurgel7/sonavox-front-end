import { createRouter, createWebHistory } from "vue-router";
// Layouts
import CustomerLayout from "@/layouts/CustomerLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
// Views
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import HomeView from "@/views/HomeView.vue";
import ProductsView from "@/views/ProductsView.vue";
import ProductDetailView from "@/views/ProductDetailView.vue";
import DashboardView from "@/views/admin/DashboardView.vue";
import OrdersView from "@/views/admin/OrdersView.vue";
import CheckoutView from "@/views/CheckoutView.vue";

// Guards
import { authorizedGuard } from "./guards/authorized.guard";
import HistoryView from "@/views/HistoryView.vue";
import CustomerOrdersView from "@/views/CustomerOrdersView.vue";

import { useCartStore } from "@/stores/cart";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      component: LoginView,
    },
    {
      path: "/register",
      component: RegisterView,
    },
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
            role: ["CUSTOMER"],
          },
          beforeEnter: () => {
            const cartStore = useCartStore();
            if (cartStore.listProduct.length === 0) {
              return "/";
            }
          },
        },
        {
          path: "orders",
          component: CustomerOrdersView,
          meta: {
            auth: true,
            role: ["CUSTOMER"],
          },
        },
        {
          path: "history",
          component: HistoryView,
          meta: {
            auth: true,
            role: ["CUSTOMER"],
          },
        },
      ],
    },
    {
      path: "/admin",
      meta: {
        auth: true,
        role: ["ADMIN"],
      },
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
