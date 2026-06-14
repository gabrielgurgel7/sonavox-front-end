<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { Plus, Minus, Trash } from "@lucide/vue";
import type { Product } from "@/models/product.model";

interface CartItem {
  product: Product;
  quantity: number;
  price: number;
}

export default defineComponent({
  components: { Plus, Minus, Trash },
  props: {
    item: {
      type: Object as PropType<CartItem>,
      required: true,
    },
    silent: { type: Boolean, default: false },
  },
  emits: ["increment", "decrement", "remove"],
});
</script>

<template>
  <div class="flex items-center gap-3 py-3 border-b border-gray-200 dark:border-gray-700">
    <img
      class="w-24 h-24 rounded-xl object-cover"
      :src="item.product.images[0]?.url"
      :alt="item.product.name"
    />
    <div class="flex-1">
      <h3 class="text-sm text-black dark:text-white font-medium mb-0.5">
        {{ item.product.name }}
      </h3>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">
        {{ item.product.formatedPrice }}
      </p>
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-2 bg-indigo-50 dark:bg-gray-800 rounded-full h-6">
          <button
            class="h-6 w-6 flex items-center justify-center rounded-full text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 hover:bg-green-200 dark:hover:bg-green-900 transition-colors cursor-pointer border-none shrink-0"
            @click="$emit('increment', item.product, silent)"
          >
            <Plus :size="20" />
          </button>
          <span class="text-xs text-gray-500 dark:text-gray-400 font-medium min-w-4 text-center">
            {{ item.quantity }}
          </span>
          <button
            class="h-6 w-6 flex items-center justify-center rounded-full text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 hover:bg-orange-200 dark:hover:bg-orange-900 transition-colors cursor-pointer border-none shrink-0"
            @click="$emit('decrement', item.product)"
          >
            <Minus :size="20" />
          </button>
        </div>
        <button
          class="h-6 w-6 flex items-center justify-center rounded-full bg-transparent cursor-pointer border-none shrink-0"
          @click="$emit('remove', item.product)"
        >
          <Trash :size="20" class="text-red-400" />
        </button>
      </div>
    </div>
  </div>
</template>
