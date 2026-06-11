<script lang="ts">
import { defineComponent } from "vue";
import { Product } from "@/models/product.model";
import { MenuIcon, ShoppingBag, SearchIcon, X } from "@lucide/vue";
import CartSummary from "@/components/CartSummary.vue";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import UserMenu from "@/components/usermenu/AppUserMenu.vue";
import PromoSpam from "@/components/PromoSpam.vue";
import AppFooter from "@/components/AppFooter.vue";

export default defineComponent({
  data() {
    return {};
  },
  setup() {
    const authStore = useAuthStore();
    const cartStore = useCartStore();
    return { authStore, cartStore };
  },
  methods: {
    incrementItem(product: Product) {
      console.log("addOneItem chamado:", product.name);
      this.cartStore.incrementItem(product);
    },
    decrementItem(product: Product) {
      this.cartStore.decrementItem(product);
    },
    removeItem(product: Product) {
      this.cartStore.removeItem(product);
    },
  },
  components: { MenuIcon, ShoppingBag, SearchIcon, X, CartSummary, UserMenu, PromoSpam, AppFooter },
});
</script>

<template>
  <div class="flex flex-col min-h-screen bg-neutral-50 dark:bg-gray-950 overflow-clip">
    <header
      class="relative h-20 flex flex-row items-center justify-between px-12 bg-neutral-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
    >
      <slot name="menu-sanduich">
        <PrimeButton
          unstyled
          class="h-9 w-9 rounded-full bg-transparent flex items-center justify-center text-sm text-black dark:text-white hover:bg-indigo-50 dark:hover:bg-gray-800 transition-colors shrink-0"
        >
          <MenuIcon class="text-indigo-600" />
        </PrimeButton>
      </slot>

      <slot name="brand">
        <figure class="absolute left-1/2 -translate-x-1/2 m-0 select-none">
          <RouterLink to="/">
            <img
              src="../assets/imgs/logo_sonavox_header.svg"
              alt="Logo Sonavox"
              draggable="false"
              class="dark:brightness-0 dark:invert"
            />
          </RouterLink>
        </figure>
      </slot>

      <div class="flex items-center gap-4">
        <slot name="actions">
          <template v-if="!authStore.isAuth">
            <RouterLink
              class="text-gray-400 font-semibold hover:text-indigo-600 transition-colors"
              to="/login"
            >
              <small>Login</small>
            </RouterLink>
            <small><p class="text-gray-400 font-semibold">/</p></small>
            <RouterLink
              class="text-gray-400 font-semibold hover:text-indigo-600 transition-colors"
              to="/register"
            >
              <small>Registrar-se</small>
            </RouterLink>
          </template>

          <UserMenu v-else />

          <PrimeButton
            unstyled
            class="h-9 w-9 rounded-full bg-transparent flex items-center justify-center text-sm text-black dark:text-white cursor-pointer hover:bg-indigo-50 dark:hover:bg-gray-800 transition-colors shrink-0"
            @click="cartStore.cartOpen = true"
          >
            <ShoppingBag class="text-indigo-600" />
          </PrimeButton>
        </slot>
      </div>
    </header>

    <nav class="p-2 bg-neutral-50 dark:bg-gray-900">
      <slot name="nav">
        <div class="flex items-center justify-between gap-4 px-12">
          <div
            class="flex flex-row items-center border border-gray-300 dark:border-gray-700 bg-transparent rounded-full focus-within:border-indigo-400 transition-colors"
          >
            <slot name="search">
              <label for="search" class="sr-only">Pesquisar produtos</label>
              <input
                id="search"
                class="h-9 px-3 rounded-full text-sm text-black dark:text-white outline-none placeholder:text-gray-400 bg-transparent"
                type="search"
                placeholder="Pesquisar"
              />
              <PrimeButton
                unstyled
                class="h-9 w-9 rounded-full bg-transparent flex items-center justify-center cursor-pointer hover:bg-indigo-50 dark:hover:bg-gray-800 transition-colors shrink-0"
              >
                <SearchIcon :size="20" class="text-indigo-600" />
              </PrimeButton>
            </slot>
          </div>

          <div class="flex-1 px-4">
            <PromoSpam />
          </div>

          <div class="flex flex-row gap-1">
            <RouterLink
              to="/products?category=instrumentos"
              class="h-9 rounded-full border border-gray-300 dark:border-gray-700 bg-transparent text-sm text-black dark:text-white px-4 flex items-center hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors"
              >Instrumentos</RouterLink
            >
            <RouterLink
              to="/products?category=acessorios"
              class="h-9 rounded-full border border-gray-300 dark:border-gray-700 bg-transparent text-sm text-black dark:text-white px-4 flex items-center hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors"
              >Acessórios</RouterLink
            >
            <RouterLink
              to="/products?category=encordoamentos"
              class="h-9 rounded-full border border-gray-300 dark:border-gray-700 bg-transparent text-sm text-black dark:text-white px-4 flex items-center hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors"
              >Encordoamentos</RouterLink
            >
            <RouterLink
              to="/products?category=audio"
              class="h-9 rounded-full border border-gray-300 dark:border-gray-700 bg-transparent text-sm text-black dark:text-white px-4 flex items-center hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors"
              >Áudio</RouterLink
            >
          </div>
        </div>
      </slot>
    </nav>

    <main class="flex-1">
      <RouterView />
    </main>

    <PrimeDrawer
      v-model:visible="cartStore.cartOpen"
      position="right"
      :pt="{
        root: 'bg-white dark:bg-gray-900 w-500',
        header:
          'flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700',
        content: 'bg-white dark:bg-gray-900 p-0',
        closeButton:
          'h-9 w-9 rounded-full flex items-center justify-center hover:bg-indigo-50 dark:hover:bg-gray-800 transition-colors border-none bg-transparent cursor-pointer',
      }"
    >
      <template #header>
        <span class="text-2xl text-indigo-400 font-bold mb-4">Carrinho</span>
      </template>
      <template #closeicon>
        <X :size="18" class="text-indigo-400" />
      </template>
      <CartSummary
        :cart="cartStore"
        @add-to-cart="incrementItem"
        @remove-to-cart="decrementItem"
        @remove-to-cart-total="removeItem"
      />
    </PrimeDrawer>

    <AppFooter />
  </div>
</template>
