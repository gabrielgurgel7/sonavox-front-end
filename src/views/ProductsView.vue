<script lang="ts">
import ProductCard from "@/components/ProductCard.vue";
import { Product } from "@/models/product.model";
import { QueryParams } from "@/models/queryParams";
import { ProductRest } from "@/services/rest/product.rest";
import { defineComponent } from "vue";
import type { IApiList, IProductResponse } from "@/types/api.types";
import { Image } from "@/models/image.model";
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
          const data: IApiList<IProductResponse> = res.data;
          this.products = data.data.map(
            (product: IProductResponse) =>
              new Product(
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
              ),
          );
          this.params.page = data.page;
          this.params.limit = data.limit;
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
