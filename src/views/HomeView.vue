<script lang="ts">
import { Product } from "@/models/product.model";
import ProductCard from "@/components/ProductCard.vue";
import AppHomeBanner from "@/components/AppHomeBanner.vue";
import { Image } from "@/models/image.model";
import { ProductRest } from "@/services/rest/product.rest";
import type { IProductResponse } from "@/types/api.types";
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
      this.rest.getAll({}).then((res) => {
        this.products = res.data.map((product: IProductResponse) => {
          return new Product(
            product.categoryId,
            product.compareAtPrice,
            product.createdAt,
            product.description,
            product.discount ?? 0,
            product.id,
            product.images.map(
              (img) => new Image(img.id, img.url, img.publicId ?? "", img.isMain ?? true),
            ),
            product.isActive,
            product.name,
            product.price,
            product.shipment ?? "Correios",
            product.sku,
            product.slug,
            product.stock,
            product.stripePriceId ?? "",
            product.stripeProductId ?? "",
            product.updatedAt,
          );
        });
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
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </section>
</template>
