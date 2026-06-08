<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { Shipment, type Product } from "@/models/product.model";

export default defineComponent({
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
});
</script>

<template>
  <article class="flex flex-col w-full border border-gray-300 rounded-3xl overflow-hidden">
    <!-- Imagem do produto -->
    <figure class="m-0" @click="$emit('view-product', product)">
      <img class="w-full aspect-square object-cover" :src="product?.img" :alt="product?.name" />
    </figure>

    <!-- Corpo do card -->
    <section class="flex flex-col gap-1 p-3 flex-1">
      <slot name="header">
        <h3 class="text-sm font-medium m-0 text-black">{{ product?.name }}</h3>
      </slot>

      <slot name="price">
        <strong class="text-base text-black font-semibold mt-1">{{
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
          class="h-9 rounded-xl bg-indigo-400 text-white text-sm font-medium cursor-pointer hover:bg-indigo-300 transition-colors"
          @click="$emit('add-to-cart', product)"
        >
          <template #default>Comprar</template>
        </PrimeButton>
        <!-- Botão add ao carrinho -->
        <PrimeButton
          unstyled
          class="h-9 rounded-xl border border-gray-300 bg-transparent text-sm text-black cursor-pointer hover:bg-indigo-50 transition-colors"
          @click="$emit('add-to-cart', product)"
        >
          <template #default>Adicionar ao carrinho</template>
        </PrimeButton>
      </slot>
    </footer>
  </article>
</template>
