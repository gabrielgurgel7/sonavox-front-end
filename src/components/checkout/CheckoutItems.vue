<script lang="ts">
import { defineComponent } from "vue";
import { useCartStore } from "@/stores/cart";
import type { Product } from "@/models/product.model";
import CartItemCard from "../cart/CartItemCard.vue";

export default defineComponent({
  components: { CartItemCard },
  props: {
    next: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
  methods: {
    addToCart(product: Product) {
      this.cartStore.incrementItem(product);
    },
    removeToCart(product: Product) {
      this.cartStore.decrementItem(product);
    },
    removeToCartTotal(product: Product) {
      this.cartStore.removeItem(product);
    },
  },
});
</script>

<template>
  <div class="p-4">
    <CartItemCard
      v-for="item in cartStore.listProduct"
      :key="item.product.id"
      :item="item"
      @increment="cartStore.incrementItem"
      @decrement="cartStore.decrementItem"
      @remove="cartStore.removeItem"
    />

    <p class="text-base text-black dark:text-white font-bold pt-4">
      Total: {{ cartStore.formatedTotal }}
    </p>

    <button
      class="w-full h-10 rounded-xl bg-indigo-600 text-white text-sm font-medium flex items-center justify-center hover:bg-indigo-500 transition-colors mt-4 cursor-pointer border-none"
      @click="next('2')"
    >
      Continuar para endereço
    </button>
  </div>
</template>
