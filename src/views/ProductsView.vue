<script lang="ts">
import ProductCard from "@/components/ProductCard.vue";
import { Product } from "@/models/product.model";
import { QueryParams } from "@/models/queryParams";
import { ProductRest } from "@/services/rest/product.rest";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      rest: new ProductRest(),
      params: new QueryParams(),
      products: [] as Product[],
      loading: { products: false },
    };
  },
  methods: {
    getAllProducts() {
      this.loading.products = true;
      this.rest
        .getAll(this.params)
        .then((res) => {
          this.products = res.data.map(Product.fromResponse);
        })
        .finally(() => (this.loading.products = false));
    },
  },
  mounted() {
    this.getAllProducts();
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
