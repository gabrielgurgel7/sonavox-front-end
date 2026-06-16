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
  <main>
    <h1 class="text-black">Produtos</h1>
    <div v-if="loading.products">Carregando...</div>
    <div v-else>
      <div v-for="product in products" :key="product.id">
        <ProductCard :product="product" />
      </div>
    </div>
  </main>
</template>
