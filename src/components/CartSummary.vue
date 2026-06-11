<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { useCartStore } from "@/stores/cart";
import { Plus, Minus, Trash } from "@lucide/vue";

type CartStore = ReturnType<typeof useCartStore>;

export default defineComponent({
  props: {
    cart: {
      type: Object as PropType<CartStore>,
    },
  },
  components: { Plus, Minus, Trash },
});
</script>

<template>
  <div class="p-4">
    <div
      v-if="cart?.listProduct.length === 0"
      class="text-sm text-gray-400 dark:text-gray-500 py-4 text-center"
    >
      Seu carrinho está vazio.
    </div>

    <div
      class="flex items-center gap-3 py-3 border-b border-gray-200 dark:border-gray-700"
      v-for="item in cart?.listProduct"
      :key="item.product.name"
    >
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
          <!-- Controles de quantidade -->
          <div class="flex items-center gap-2 bg-indigo-50 dark:bg-gray-800 rounded-full h-6">
            <button
              class="h-6 w-6 flex items-center justify-center rounded-full text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 hover:bg-green-200 dark:hover:bg-green-900 transition-colors cursor-pointer border-none shrink-0"
              @click="$emit('add-to-cart', item.product)"
            >
              <Plus :size="20" />
            </button>
            <span class="text-xs text-gray-500 dark:text-gray-400 font-medium min-w-4 text-center">
              {{ item.quantity }}
            </span>
            <button
              class="h-6 w-6 flex items-center justify-center rounded-full text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 hover:bg-orange-200 dark:hover:bg-orange-900 transition-colors cursor-pointer border-none shrink-0"
              @click="$emit('remove-to-cart', item.product)"
            >
              <Minus :size="20" />
            </button>
          </div>

          <!-- Botão remover total -->
          <button
            class="h-6 w-6 flex items-center justify-center rounded-full bg-transparent cursor-pointer border-none shrink-0"
            @click="$emit('remove-to-cart-total', item.product)"
          >
            <Trash :size="20" class="text-red-400" />
          </button>
        </div>
      </div>
    </div>

    <p class="text-base text-black dark:text-white font-bold pt-4">
      Total: {{ cart?.formatedTotal }}
    </p>

    <RouterLink
      to="/checkout"
      class="w-full h-10 rounded-xl bg-indigo-600 text-white text-sm font-medium flex items-center justify-center hover:bg-indigo-500 transition-colors mt-4"
    >
      Finalizar compra
    </RouterLink>
  </div>
</template>
