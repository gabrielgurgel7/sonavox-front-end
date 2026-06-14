<script lang="ts">
import { defineComponent, ref } from "vue";
import { Product } from "@/models/product.model";
import {
  MenuIcon,
  ShoppingBag,
  SearchIcon,
  X,
  Settings,
  LogOut,
  UserStar,
  Moon,
  Sun,
} from "@lucide/vue";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import CartSummary from "@/components/cart/CartSummary.vue";
import UserMenu from "@/components/usermenu/AppUserMenu.vue";
import PromoBar from "@/components/promo/PromoBar.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import { useTheme } from "@/composables/useTheme";

export default defineComponent({
  data() {
    return {};
  },
  setup() {
    const authStore = useAuthStore();
    const cartStore = useCartStore();
    const categoriesRef = ref<HTMLElement | null>(null);
    const mobileMenuOpen = ref(false);
    const { isDark, toggleDark } = useTheme();

    function onCategoryScroll(e: WheelEvent) {
      if (categoriesRef.value) {
        categoriesRef.value.scrollLeft += e.deltaY;
      }
    }

    return {
      authStore,
      cartStore,
      categoriesRef,
      onCategoryScroll,
      mobileMenuOpen,
      isDark,
      toggleDark,
    };
  },
  methods: {
    incrementItem(product: Product) {
      this.cartStore.incrementItem(product);
    },
    decrementItem(product: Product) {
      this.cartStore.decrementItem(product);
    },
    removeItem(product: Product) {
      this.cartStore.removeItem(product);
    },
    logout() {
      this.authStore.logout();
      this.$router.push("/login");
      this.mobileMenuOpen = false;
    },
  },
  components: {
    MenuIcon,
    ShoppingBag,
    SearchIcon,
    X,
    Settings,
    LogOut,
    UserStar,
    Moon,
    Sun,
    CartSummary,
    UserMenu,
    PromoBar,
    AppFooter,
  },
});
</script>

<template>
  <div class="flex flex-col min-h-screen bg-neutral-50 dark:bg-gray-950 overflow-clip">
    <!-- Header -->
    <header
      class="relative h-16 md:h-20 flex flex-row items-center justify-between px-4 md:px-12 bg-neutral-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
    >
      <slot name="menu-sanduich">
        <PrimeButton
          unstyled
          class="h-9 w-9 rounded-full bg-transparent flex items-center justify-center hover:bg-indigo-50 dark:hover:bg-gray-800 transition-colors shrink-0"
          @click="mobileMenuOpen = !mobileMenuOpen"
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
              class="dark:brightness-0 dark:invert h-6 md:h-8"
            />
          </RouterLink>
        </figure>
      </slot>

      <div class="flex items-center gap-2 md:gap-4">
        <slot name="actions">
          <!-- Desktop: login/register -->
          <template v-if="!authStore.isAuth">
            <RouterLink
              class="hidden sm:block text-gray-400 font-semibold hover:text-indigo-600 transition-colors"
              to="/login"
            >
              <small>Login</small>
            </RouterLink>
            <small class="hidden sm:block">
              <p class="text-gray-400 font-semibold">/</p>
            </small>
            <RouterLink
              class="hidden sm:block text-gray-400 font-semibold hover:text-indigo-600 transition-colors"
              to="/register"
            >
              <small>Registrar-se</small>
            </RouterLink>
          </template>

          <!-- Desktop: user menu -->
          <UserMenu v-else class="hidden md:flex" />

          <!-- Carrinho -->
          <PrimeButton
            unstyled
            class="h-9 w-9 rounded-full bg-transparent flex items-center justify-center cursor-pointer hover:bg-indigo-50 dark:hover:bg-gray-800 transition-colors shrink-0"
            @click="cartStore.cartOpen = true"
          >
            <ShoppingBag class="text-indigo-600" />
          </PrimeButton>
        </slot>
      </div>
    </header>

    <!-- Menu mobile -->
    <Transition name="slide-down">
      <div
        v-if="mobileMenuOpen"
        class="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-4 flex flex-col gap-1"
      >
        <!-- Usuário logado -->
        <template v-if="authStore.isAuth">
          <p class="text-xs font-medium text-gray-400 px-2 mb-1 uppercase tracking-widest">
            Olá, {{ authStore.getUser?.name?.split(" ")[0] }}
          </p>

          <!-- Admin — só aparece se for ADMIN -->
          <button
            v-if="authStore.getRole === 'ADMIN'"
            class="flex items-center gap-2 px-2 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer border-none bg-transparent w-full"
            @click="
              () => {
                $router.push('/admin');
                mobileMenuOpen = false;
              }
            "
          >
            <UserStar :size="14" class="text-gray-400" />
            Admin
          </button>

          <button
            class="flex items-center gap-2 px-2 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer border-none bg-transparent w-full"
          >
            <Settings :size="14" class="text-gray-400" />
            Configurações
          </button>

          <!-- Toggle tema -->
          <button
            class="flex items-center gap-2 px-2 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer border-none bg-transparent w-full"
            @click="toggleDark"
          >
            <Moon v-if="!isDark" :size="14" class="text-gray-400" />
            <Sun v-else :size="14" class="text-gray-400" />
            {{ isDark ? "Modo claro" : "Modo escuro" }}
          </button>

          <button
            class="flex items-center gap-2 px-2 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg cursor-pointer border-none bg-transparent w-full"
            @click="logout"
          >
            <LogOut :size="14" />
            Sair
          </button>
        </template>

        <!-- Usuário não logado -->
        <template v-else>
          <RouterLink
            to="/login"
            class="px-2 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-lg"
            @click="mobileMenuOpen = false"
          >
            Login
          </RouterLink>
          <RouterLink
            to="/register"
            class="px-2 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-lg"
            @click="mobileMenuOpen = false"
          >
            Registrar-se
          </RouterLink>
        </template>
      </div>
    </Transition>

    <!-- Nav -->
    <nav class="p-2 bg-neutral-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <slot name="nav">
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between gap-2 px-4 md:px-12"
        >
          <!-- Busca -->
          <div
            class="flex flex-row items-center border border-gray-300 dark:border-gray-700 bg-transparent rounded-full focus-within:border-indigo-400 transition-colors w-full md:w-auto"
          >
            <slot name="search">
              <label for="search" class="sr-only">Pesquisar produtos</label>
              <input
                id="search"
                class="h-9 px-3 rounded-full text-sm text-black dark:text-white outline-none placeholder:text-gray-400 bg-transparent w-full"
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

          <!-- PromoBar — esconde no mobile -->
          <div class="hidden md:block flex-1 px-4">
            <PromoBar />
          </div>

          <!-- Categorias com scroll e gradientes -->
          <div class="relative">
            <div
              class="absolute left-0 top-0 h-full w-6 bg-linear-to-r from-neutral-50 dark:from-gray-900 to-transparent z-10 pointer-events-none"
            ></div>
            <div
              class="absolute right-0 top-0 h-full w-6 bg-linear-to-l from-neutral-50 dark:from-gray-900 to-transparent z-10 pointer-events-none"
            ></div>
            <div
              ref="categoriesRef"
              class="flex flex-row gap-1 overflow-x-auto scrollbar-hide"
              @wheel.prevent="onCategoryScroll"
            >
              <RouterLink
                to="/products?category=instrumentos"
                class="h-9 rounded-full border border-gray-300 dark:border-gray-700 bg-transparent text-sm text-black dark:text-white px-4 flex items-center hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors whitespace-nowrap"
                >Instrumentos</RouterLink
              >
              <RouterLink
                to="/products?category=acessorios"
                class="h-9 rounded-full border border-gray-300 dark:border-gray-700 bg-transparent text-sm text-black dark:text-white px-4 flex items-center hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors whitespace-nowrap"
                >Acessórios</RouterLink
              >
              <RouterLink
                to="/products?category=encordoamentos"
                class="h-9 rounded-full border border-gray-300 dark:border-gray-700 bg-transparent text-sm text-black dark:text-white px-4 flex items-center hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors whitespace-nowrap"
                >Encordoamentos</RouterLink
              >
              <RouterLink
                to="/products?category=audio"
                class="h-9 rounded-full border border-gray-300 dark:border-gray-700 bg-transparent text-sm text-black dark:text-white px-4 flex items-center hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors whitespace-nowrap"
                >Áudio</RouterLink
              >
            </div>
          </div>
        </div>
      </slot>
    </nav>

    <main class="flex-1">
      <RouterView />
    </main>

    <!-- Drawer carrinho -->
    <PrimeDrawer
      v-model:visible="cartStore.cartOpen"
      position="right"
      :pt="{
        root: 'bg-white dark:bg-gray-900 w-full sm:w-96',
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
      <CartSummary />
    </PrimeDrawer>

    <AppFooter />
  </div>
</template>

<style>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.2s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
