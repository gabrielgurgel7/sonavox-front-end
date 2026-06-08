import CustomerLayout from "@/layouts/CustomerLayout.vue";
import HomeView from "@/views/HomeView.vue";
import ProductsView from "@/views/ProductsView.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import { createRouter, createWebHistory } from "vue-router";

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
          component: ProductDetail,
        },
      ],
    },
  ],
});

export default router;
