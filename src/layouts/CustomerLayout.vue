<script lang="ts">
import { defineComponent } from "vue";
import { Product } from "@/models/product.model";
import { Cart } from "@/models/cart.model";
import { MenuIcon, ShoppingBag, SearchIcon } from "@lucide/vue";
import CartSummary from "@/components/CartSummary.vue"; // ← faltava isso

export default defineComponent({
  data() {
    return {
      cartOpen: false,
      cart: new Cart(),
    };
  },
  methods: {
    addOneItem(product: Product) {
      console.log("addOneItem chamado:", product.name);
      this.cart.addOneItem(product);
      this.cartOpen = true;
    },
    removeOneItem(product: Product) {
      this.cart.removeOneItem(product);
    },
    removeItem(product: Product) {
      this.cart.removeItem(product);
    },
  },
  components: { MenuIcon, ShoppingBag, SearchIcon, CartSummary },
});
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header class="relative h-20 flex flex-row items-center justify-between px-12 bg-neutral-50">
      <slot name="menu-sanduich">
        <PrimeButton
          unstyled
          class="h-9 w-9 rounded-full bg-transparent flex items-center justify-center text-sm text-black hover:bg-indigo-50 transition-colors flex-shrink-0"
        >
          <MenuIcon class="text-indigo-400" />
        </PrimeButton>
      </slot>

      <slot name="brand">
        <figure class="absolute left-1/2 -translate-x-1/2 m-0 select-none">
          <RouterLink to="/">
            <img
              src="../assets/imgs/logo_sonavox_header.svg"
              alt="Logo Sonavox"
              draggable="false"
            />
          </RouterLink>
        </figure>
      </slot>

      <div class="flex items-center gap-4">
        <slot name="actions">
          <RouterLink class="text-black hover:text-indigo-400 transition-colors" to="/sobre"
            >Sobre</RouterLink
          >
          <RouterLink class="text-black hover:text-indigo-400 transition-colors" to="/faqs"
            >FAQs</RouterLink
          >
          <PrimeButton
            unstyled
            class="h-9 w-9 rounded-full bg-transparent flex items-center justify-center text-sm text-black cursor-pointer hover:bg-indigo-50 transition-colors flex-shrink-0"
            @click="cartOpen = true"
          >
            <ShoppingBag class="text-indigo-400" />
          </PrimeButton>
        </slot>
      </div>
    </header>

    <nav class="bg-neutral-50">
      <slot name="nav">
        <div class="flex items-center justify-between gap-4 px-12">
          <div
            class="flex flex-row items-center border border-gray-300 bg-transparent rounded-full focus-within:border-indigo-400 transition-colors"
          >
            <slot name="search">
              <label for="search" class="sr-only">Pesquisar produtos</label>
              <input
                id="search"
                class="h-9 px-3 rounded-full text-sm text-black outline-none placeholder:text-black"
                type="search"
                placeholder="Pesquisar"
              />
              <PrimeButton
                unstyled
                class="h-9 w-9 rounded-full bg-transparent flex items-center justify-center cursor-pointer hover:bg-indigo-50 transition-colors flex-shrink-0"
              >
                <SearchIcon :size="20" class="text-indigo-400" />
              </PrimeButton>
            </slot>
          </div>

          <div class="flex flex-row gap-1">
            <RouterLink
              to="/products?category=instrumentos"
              class="h-9 rounded-full border border-gray-300 bg-transparent text-sm text-black px-4 flex items-center hover:bg-indigo-50 transition-colors"
              >Instrumentos</RouterLink
            >
            <RouterLink
              to="/products?category=acessorios"
              class="h-9 rounded-full border border-gray-300 bg-transparent text-sm text-black px-4 flex items-center hover:bg-indigo-50 transition-colors"
              >Acessórios</RouterLink
            >
            <RouterLink
              to="/products?category=encordoamentos"
              class="h-9 rounded-full border border-gray-300 bg-transparent text-sm text-black px-4 flex items-center hover:bg-indigo-50 transition-colors"
              >Encordoamentos</RouterLink
            >
            <RouterLink
              to="/products?category=audio"
              class="h-9 rounded-full border border-gray-300 bg-transparent text-sm text-black px-4 flex items-center hover:bg-indigo-50 transition-colors"
              >Áudio</RouterLink
            >
          </div>
        </div>
      </slot>
    </nav>

    <main class="flex-1 bg-neutral-50">
      <RouterView @add-to-cart="addOneItem" />
    </main>

    <!-- Drawer do carrinho -->
    <PrimeDrawer
      v-model:visible="cartOpen"
      position="right"
      :pt="{
        root: 'bg-white w-500',
        content: 'bg-white',
      }"
    >
      <template #header>
        <span></span>
      </template>
      <CartSummary
        :cart="cart"
        @add-to-cart="addOneItem"
        @remove-to-cart="removeOneItem"
        @remove-to-cart-total="removeItem"
      />
    </PrimeDrawer>
  </div>
</template>
