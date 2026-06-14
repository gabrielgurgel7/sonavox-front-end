<script lang="ts">
import { defineComponent } from "vue";
import { useCartStore } from "@/stores/cart";

export default defineComponent({
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <h3 class="text-base font-semibold text-gray-800 dark:text-white m-0">Resumo do pedido</h3>

    <div class="flex flex-col gap-3">
      <div
        v-for="item in cartStore.listProduct"
        :key="item.product.id"
        class="flex items-center gap-3"
      >
        <img
          :src="item.product.images[0]?.url"
          :alt="item.product.name"
          class="w-12 h-12 rounded-lg object-cover"
        />
        <div class="flex-1 min-w-0">
          <p class="text-sm text-gray-800 dark:text-white truncate m-0">{{ item.product.name }}</p>
          <p class="text-xs text-gray-400 m-0">{{ item.quantity }}x</p>
        </div>
        <span class="text-sm text-gray-800 dark:text-white font-medium shrink-0">
          {{ item.product.formatedPrice }}
        </span>
      </div>
    </div>

    <div class="border-t border-gray-200 dark:border-gray-700 pt-4 flex flex-col gap-2">
      <div class="flex justify-between text-sm text-gray-500">
        <span>Subtotal</span>
        <span>{{ cartStore.formatedTotal }}</span>
      </div>
      <div class="flex justify-between text-sm text-gray-500">
        <span>Frete</span>
        <span class="text-green-500">Grátis</span>
      </div>
      <div
        class="flex justify-between text-base font-bold text-gray-800 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700"
      >
        <span>Total</span>
        <span>{{ cartStore.formatedTotal }}</span>
      </div>
    </div>
  </div>
</template>
