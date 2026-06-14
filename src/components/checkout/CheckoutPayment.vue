<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    next: { type: Function, required: true },
  },
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <h2 class="text-2xl font-medium text-indigo-600 m-0">Pagamento</h2>
    <p class="text-sm text-gray-400">Em breve — integração com Stripe.</p>
    <button
      class="w-full h-10 rounded-xl bg-indigo-600 text-white text-sm font-medium cursor-pointer border-none hover:bg-indigo-500 transition-colors"
      @click="next('4')"
    >
      Revisar pedido
    </button>
  </div>
</template>
