<script lang="ts">
import ProductCard from "@/components/product/ProductCard.vue";
import { Product } from "@/models/product.model";
import { QueryParams } from "@/models/queryParams";
import { ProductRest } from "@/services/rest/product.rest";
import { defineComponent } from "vue";
import { CategoryRest } from "@/services/rest/category.rest";
export default defineComponent({
  data() {
    return {
      rest: new ProductRest(),
      categoryRest: new CategoryRest(),
      params: new QueryParams(),
      products: [] as Product[],
      loading: { products: false },
    };
  },
  methods: {
    async resolveCategory(slug: string): Promise<string | undefined> {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = (await this.categoryRest.getAll()) as any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const category = res.data?.find((c: any) => c.slug === slug);
      return category?.id;
    },
    async getAllProducts() {
      this.loading.products = true;
      const slug = this.$route.query.category as string;
      if (slug) {
        this.params.categoryId = await this.resolveCategory(slug);
      } else {
        this.params.categoryId = undefined;
      }
      this.rest
        .getAll(this.params)
        .then((res) => {
          this.products = res.data
            .map(Product.fromResponse)
            .filter((p: Product) => p.isActive);
        })
        .finally(() => (this.loading.products = false));
    },
  },
  mounted() {
    this.getAllProducts();
  },
  watch: {
    "$route.query.category"() {
      this.getAllProducts();
    },
  },
  components: { ProductCard },
});
</script>
<template>
  <section class="px-4 py-6 sm:px-8 md:px-12">
    <!-- Título -->
    <h1 class="text-xl font-semibold text-gray-800 dark:text-white mb-6">
      {{ $route.query.category ? $route.query.category : "Todos os produtos" }}
    </h1>

    <!-- Loading -->
    <div
      v-if="loading.products"
      class="text-sm text-gray-400 text-center py-12"
    >
      Carregando...
    </div>

    <!-- Vazio -->
    <div
      v-else-if="products.length === 0"
      class="text-sm text-gray-400 text-center py-12"
    >
      Nenhum produto encontrado.
    </div>

    <!-- Grid -->
    <div
      v-else
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4"
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @view-product="$router.push(`/product/${product.id}`)"
      />
    </div>
  </section>
</template>
