<script lang="ts">
import { Product } from "@/models/product.model";
import ProductCard from "@/components/ProductCard.vue";
import AppHomeBanner from "@/components/AppHomeBanner.vue";

import { ProductRest } from "@/services/rest/product.rest";

export default {
  components: { AppHomeBanner, ProductCard },
  data() {
    return {
      products: [],
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
      const params = { page: 1, limit: 10 };
      this.rest.getAll(params).then((res: any) => {
        this.products = res.data.data.map((product: any) => {
          return new Product(
            product.categoryId,
            product.compareAtPrice,
            product.createdAt,
            product.description,
            product.discount,
            product.id,
            product.images,
            product.isActive,
            product.name,
            product.price,
            product.shipment,
            product.sku,
            product.slug,
            product.stock,
            product.stripePriceId,
            product.stripeProductId,
            product.updatedAt,
          );
        });
        console.log(this.products);
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
