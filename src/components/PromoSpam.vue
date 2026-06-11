<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      promos: [
        { id: 1, text: "15% OFF em sua primeira compra no site" },
        { id: 2, text: "Frete grátis em compras acima de R$ 299" },
        { id: 3, text: "30% OFF extra com cupom SONA30" },
      ],
    };
  },
});
</script>

<template>
  <div
    class="w-full h-9 p-4 flex items-center justify-center rounded-full bg-indigo-400 overflow-clip"
  >
    <PrimeCarousel
      :value="promos"
      :numVisible="1"
      :numScroll="1"
      :autoplayInterval="10000"
      :showNavigators="false"
      :showIndicators="false"
      circular
      :pt="{
        root: { class: 'w-full' },
        viewport: { class: 'w-full' },
        itemList: { class: 'w-full' },
        item: { class: 'w-full' },
      }"
    >
      <template #item="{ data }">
        <span class="flex items-center justify-center">
          <p class="text-sm text-white">{{ data.text }}</p>
        </span>
      </template>
    </PrimeCarousel>
  </div>
</template>
