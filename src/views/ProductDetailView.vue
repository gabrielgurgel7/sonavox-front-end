<script lang="ts">
import { Product } from "@/models/product.model";
import { Image } from "@/models/image.model";
import { ProductRest } from "@/services/rest/product.rest";
import { defineComponent } from "vue";
import ProductCard from "@/components/product/ProductCard.vue";
import type { IProductResponse, IImage } from "@/types/api.types";

export default defineComponent({
  components: { ProductCard },
  data() {
    return {
      productId: null as Product | null,
      rest: new ProductRest(),
    };
  },
  methods: {
    getProduct() {
      const id = this.$route.params.id as string;
      this.rest.getById(id).then((res) => {
        const p: IProductResponse = res.data;
        this.productId = new Product(
          p.categoryId,
          p.compareAtPrice,
          p.createdAt,
          p.description,
          p.discount ?? 0,
          p.id,
          p.images.map(
            (img: IImage) => new Image(img.id, img.url, img.publicId ?? "", img.isMain ?? true),
          ),
          p.isActive,
          p.name,
          p.price,
          p.shipment ?? "Correios",
          p.sku,
          p.slug,
          p.stock,
          p.stripePriceId ?? "",
          p.stripeProductId ?? "",
          p.updatedAt,
        );
      });
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
