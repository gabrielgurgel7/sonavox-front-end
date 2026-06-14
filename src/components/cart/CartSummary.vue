<script lang="ts">
import { defineComponent, nextTick } from "vue";
import { useCartStore } from "@/stores/cart";
import { useRouter } from "vue-router";
import CartItemCard from "./CartItemCard.vue";

export default defineComponent({
  components: { CartItemCard },
  setup() {
    const cartStore = useCartStore();
    const router = useRouter();

    async function goToCheckout() {
      cartStore.cartOpen = false;
      await nextTick();
      router.push("/checkout");
    }

    return { cartStore, goToCheckout };
  },
});
</script>

<template>
  <div class="p-4">
    <div
      v-if="cartStore.listProduct.length === 0"
      class="text-sm text-gray-400 dark:text-gray-500 py-4 text-center"
    >
      Seu carrinho está vazio. <br />Vamos comprar?
    </div>

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
      v-if="cartStore.listProduct.length > 0"
      @click="goToCheckout"
      class="w-full h-10 rounded-xl bg-indigo-600 text-white text-sm font-medium flex items-center justify-center hover:bg-indigo-500 transition-colors mt-4 cursor-pointer border-none"
    >
      Finalizar compra
    </button>
  </div>
</template>
