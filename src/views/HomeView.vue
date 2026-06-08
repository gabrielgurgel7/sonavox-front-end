<script lang="ts">
import { Category } from "@/models/category.model";
import { Product, Shipment } from "@/models/product.model";
import ProductCard from "@/components/ProductCard.vue";
import AppHomeBanner from "@/components/AppHomeBanner.vue";
import productsData from "@/data/productsData.json";

export default {
  components: { AppHomeBanner, ProductCard },
  data() {
    return {
      products: productsData.map(
        (p) =>
          new Product(
            p.id ?? 0,
            p.img,
            p.name,
            p.description,
            p.price,
            new Category(p.category),
            p.discount,
            p.isActived,
            p.shipment as Shipment,
          ),
      ),
    };
  },
  methods: {
    goToProduct(product: Product) {
      this.$router.push(`/product/${product.id}`);
    },
  },
};
</script>

<template>
  <section>
    <AppHomeBanner />
  </section>
  <section
    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 px-12 py-4 w-full"
  >
    <ProductCard
      :product="product"
      @add-to-cart="
        (product: Product) => {
          console.log('emit do ProductCard:', product.name);
          $emit('add-to-cart', product);
        }
      "
      @view-product="goToProduct"
      v-for="product in products"
      :key="product.name"
    />
  </section>
</template>
