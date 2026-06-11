<script lang="ts">
import { Product } from "@/models/product.model";
import { defineComponent } from "vue";
import productsData from "@/data/productsData.json";
import ProductCard from "@/components/ProductCard.vue";

export default defineComponent({
  data() {
    return {
      productId: null as Product | null,
    };
  },
  components: { ProductCard },
  methods: {
    getProduct() {
      const id = Number(this.$route.params.id);
      console.log("id da rota:", id);
      const found = productsData.find((p) => p.id === id);
      console.log("produto encontrado:", found);
      if (!found) return;

      this.productId = new Product(
        found.categoryId,
        found.compareAtPrice,
        found.createdAt,
        found.description,
        found.discount,
        found.id,
        found.images,
        found.isActive,
        found.name,
        found.price,
        found.shipment,
        found.sku,
        found.slug,
        found.stock,
        found.stripePriceId,
        found.stripeProductId,
        found.updatedAt,
      );
    },
  },
  mounted() {
    this.getProduct();
  },
});
</script>
<template>
  <div v-if="productId">
    <ProductCard :product="productId" />
  </div>
  <div v-else class="flex items-center justify-center w-screen h-screen">
    <h1 class="text-3xl text-black">Produto não encontrado</h1>
  </div>
</template>
