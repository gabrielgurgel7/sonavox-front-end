<script lang="ts">
import { Product } from "@/models/product.model";
import { ProductRest } from "@/services/rest/product.rest";
import { defineComponent } from "vue";
import ProductCard from "@/components/product/ProductCard.vue";
import type { IProductResponse } from "@/types/api.types";

export default defineComponent({
  components: { ProductCard },
  data() {
    return {
      productId: null as Product | null,
      loading: true,
      rest: new ProductRest(),
    };
  },
  methods: {
    getProduct() {
      const id = this.$route.params.id as string;
      this.loading = true;

      if (!id) {
        this.loading = false;
        return;
      }

      this.rest
        .getById(id)
        .then((res) => {
          this.productId = Product.fromResponse(res.data as IProductResponse);
        })
        .catch(() => {
          this.productId = null;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.getProduct();
  },
});
</script>

<template>
  <div
    v-if="loading"
    class="flex items-center justify-center w-screen h-screen"
  >
    <p class="text-gray-400 text-sm">Carregando...</p>
  </div>

  <div v-else-if="productId">
    <ProductCard :product="productId" />
  </div>

  <div v-else class="flex items-center justify-center w-screen h-screen">
    <div class="flex flex-col items-center gap-3 text-gray-400">
      <p class="text-6xl">🎸</p>
      <h1 class="text-2xl font-semibold text-gray-800 dark:text-white">
        Produto não encontrado
      </h1>
      <p class="text-sm">
        O produto que você procura não existe ou foi removido.
      </p>
      <RouterLink
        to="/products"
        class="mt-2 h-9 px-4 rounded-xl bg-indigo-600 text-white text-sm font-medium flex items-center hover:bg-indigo-500 transition-colors"
      >
        Ver todos os produtos
      </RouterLink>
    </div>
  </div>
</template>
