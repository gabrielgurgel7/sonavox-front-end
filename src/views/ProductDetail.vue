<script lang="ts">
import { Product, Shipment } from "@/models/product.model";
import { Category } from "@/models/category.model";
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
        found.id ?? 0,
        found.img,
        found.name,
        found.description,
        found.price,
        new Category(found.category),
        found.discount,
        found.isActived,
        found.shipment as Shipment,
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
  <div v-else>
    <p>Produto não encontrado.</p>
  </div>
</template>
