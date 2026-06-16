<script lang="ts">
import { Product } from "@/models/product.model";
import ProductCard from "@/components/product/ProductCard.vue";
import AppHomeBanner from "@/components/layout/AppHomeBanner.vue";
import { ProductRest } from "@/services/rest/product.rest";
import { QueryParams } from "@/models/queryParams";

export default {
  components: { AppHomeBanner, ProductCard },
  data() {
    return {
      products: [] as Product[],
    };
  },
  computed: {
    rest(): ProductRest {
      return new ProductRest();
    },
  },
  methods: {
    goToProduct(product: Product) {
      this.$router.push(`/product/${product.id}`);
    },
    getProducts() {
      this.rest.getAll(new QueryParams()).then((res) => {
        console.log(res.data);
        this.products = res.data.map(Product.fromResponse);
      });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>

<template>
  <section>
    <AppHomeBanner />
  </section>
  <section
    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 px-4 py-4 sm:px-8 sm:py-6 md:px-12 md:py-8 w-full"
  >
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </section>
</template>
