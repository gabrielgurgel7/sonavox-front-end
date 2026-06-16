<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { Shipment, type Product } from "@/models/product.model";
import { useCartStore } from "@/stores/cart";

export default defineComponent({
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
  data() {
    return {
      Shipment,
    };
  },
  props: {
    product: {
      type: Object as PropType<Product>,
    },
  },
  computed: {
    mainImage(): string {
      return this.product?.images.find((i) => i.isMain)?.url ?? this.product?.images[0]?.url ?? "";
    },
  },
});
</script>

<template>
  <article
    class="flex flex-col w-full border border-gray-300 dark:border-gray-700 rounded-3xl overflow-hidden"
  >
    <!-- Imagem do produto -->
    <figure class="m-0 bg-gray-50 dark:bg-neutral-50" @click="$emit('view-product', product)">
      <img class="w-full aspect-square object-contain" :src="mainImage" :alt="product?.name" />
    </figure>

    <!-- Corpo do card -->
    <section class="flex flex-col gap-1 p-3 flex-1">
      <slot name="header">
        <h3 class="text-sm font-medium m-0 text-black dark:text-white">{{ product?.name }}</h3>
      </slot>

      <slot name="price">
        <strong class="text-base text-black dark:text-white font-semibold mt-1">{{
          product?.formatedPrice
        }}</strong>
      </slot>

      <slot name="meta">
        <div class="flex items-center gap-2 mt-0.5">
          <span
            v-if="(product?.discount ?? 0) > 0"
            class="text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full"
          >
            {{ product?.displayDiscount() }}% off
          </span>
          <span
            :class="{
              'bg-amber-100 text-amber-700': product?.shipment === Shipment.CORREIOS,
              'bg-green-100 text-green-700': product?.shipment === Shipment.FREE,
              'bg-orange-100 text-orange-700': product?.shipment === Shipment.PAC,
            }"
            class="text-xs px-2 py-0.5 rounded-full"
            >Frete: {{ product?.shipment }}</span
          >
        </div>
      </slot>
    </section>

    <!-- Ações do card -->
    <footer class="flex flex-col gap-2 p-3">
      <slot name="actions">
        <!-- Botão comprar -->
        <PrimeButton
          unstyled
          class="h-9 rounded-xl bg-indigo-600 text-white text-sm font-medium cursor-pointer hover:bg-indigo-500 transition-colors"
          @click="cartStore.incrementItem(product!)"
        >
          <template #default>Comprar</template>
        </PrimeButton>
        <!-- Botão add ao carrinho -->
        <PrimeButton
          unstyled
          class="h-9 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent text-sm text-black dark:text-white cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors"
          @click="cartStore.incrementItem(product!)"
        >
          <template #default>Adicionar ao carrinho</template>
        </PrimeButton>
      </slot>
    </footer>
  </article>
</template>
