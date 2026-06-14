<script lang="ts">
import { defineComponent } from "vue";
import { useCartStore } from "@/stores/cart";

export default defineComponent({
  emits: ["onFinish"],
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
  methods: {
    finish() {
      this.$emit("onFinish");
    },
  },
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <h2 class="text-2xl font-medium text-indigo-600 m-0">Revisão do pedido</h2>
    <p class="text-sm text-gray-400">Confira seus dados antes de finalizar.</p>
    <button
      @click="finish"
      class="w-full h-10 rounded-xl bg-indigo-600 text-white text-sm font-medium cursor-pointer border-none hover:bg-indigo-500 transition-colors"
    >
      Finalizar compra
    </button>
  </div>
</template>
