<script lang="ts">
import { defineComponent } from "vue";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Tags,
  Ticket,
  BarChart3,
  Warehouse,
  Star,
  Image,
  Bell,
  Search,
  ChevronDown,
} from "@lucide/vue";

export default defineComponent({
  components: {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Settings,
    LogOut,
    Tags,
    Ticket,
    BarChart3,
    Warehouse,
    Star,
    Image,
    Bell,
    Search,
    ChevronDown,
  },

  data() {
    return {
      notifications: 3,
      profileOpen: false,
    };
  },
});
</script>

<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-900 flex flex-col">
      <!-- Logo -->
      <div class="h-20 flex items-center px-6 border-b border-gray-700">
        <figure class="m-0 select-none">
          <RouterLink to="/">
            <img
              src="../assets/imgs/logo_sonavox_header.svg"
              alt="Logo Sonavox"
              draggable="false"
              class="brightness-0 invert"
            />
          </RouterLink>
        </figure>
      </div>

      <!-- Nav -->
      <nav class="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
        <!-- Geral -->
        <p class="text-xs text-gray-500 uppercase tracking-widest px-3 mb-2">Geral</p>

        <RouterLink
          to="/admin"
          class="flex items-center gap-3 px-3 h-10 rounded-xl text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          active-class="bg-indigo-600 text-white hover:bg-indigo-500"
        >
          <LayoutDashboard :size="18" />
          Dashboard
        </RouterLink>

        <RouterLink
          to="/admin/reports"
          class="flex items-center gap-3 px-3 h-10 rounded-xl text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          active-class="bg-indigo-600 text-white hover:bg-indigo-500"
        >
          <BarChart3 :size="18" />
          Relatórios
        </RouterLink>

        <!-- Catálogo -->
        <p class="text-xs text-gray-500 uppercase tracking-widest px-3 mb-2 mt-4">Catálogo</p>

        <RouterLink
          to="/admin/products"
          class="flex items-center gap-3 px-3 h-10 rounded-xl text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          active-class="bg-indigo-600 text-white hover:bg-indigo-500"
        >
          <Package :size="18" />
          Produtos
        </RouterLink>

        <RouterLink
          to="/admin/categories"
          class="flex items-center gap-3 px-3 h-10 rounded-xl text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          active-class="bg-indigo-600 text-white hover:bg-indigo-500"
        >
          <Tags :size="18" />
          Categorias
        </RouterLink>

        <RouterLink
          to="/admin/inventory"
          class="flex items-center gap-3 px-3 h-10 rounded-xl text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          active-class="bg-indigo-600 text-white hover:bg-indigo-500"
        >
          <Warehouse :size="18" />
          Estoque
        </RouterLink>

        <RouterLink
          to="/admin/reviews"
          class="flex items-center gap-3 px-3 h-10 rounded-xl text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          active-class="bg-indigo-600 text-white hover:bg-indigo-500"
        >
          <Star :size="18" />
          Avaliações
        </RouterLink>

        <!-- Vendas -->
        <p class="text-xs text-gray-500 uppercase tracking-widest px-3 mb-2 mt-4">Vendas</p>

        <RouterLink
          to="/admin/orders"
          class="flex items-center gap-3 px-3 h-10 rounded-xl text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          active-class="bg-indigo-600 text-white hover:bg-indigo-500"
        >
          <ShoppingCart :size="18" />
          Pedidos
        </RouterLink>

        <RouterLink
          to="/admin/coupons"
          class="flex items-center gap-3 px-3 h-10 rounded-xl text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          active-class="bg-indigo-600 text-white hover:bg-indigo-500"
        >
          <Ticket :size="18" />
          Cupons
        </RouterLink>

        <RouterLink
          to="/admin/banners"
          class="flex items-center gap-3 px-3 h-10 rounded-xl text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          active-class="bg-indigo-600 text-white hover:bg-indigo-500"
        >
          <Image :size="18" />
          Banners
        </RouterLink>

        <!-- Pessoas -->
        <p class="text-xs text-gray-500 uppercase tracking-widest px-3 mb-2 mt-4">Pessoas</p>

        <RouterLink
          to="/admin/users"
          class="flex items-center gap-3 px-3 h-10 rounded-xl text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          active-class="bg-indigo-600 text-white hover:bg-indigo-500"
        >
          <Users :size="18" />
          Usuários
        </RouterLink>

        <!-- Conta -->
        <div class="mt-auto flex flex-col gap-1">
          <p class="text-xs text-gray-500 uppercase tracking-widest px-3 mb-2">Conta</p>

          <RouterLink
            to="/admin/settings"
            class="flex items-center gap-3 px-3 h-10 rounded-xl text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
            active-class="bg-indigo-600 text-white hover:bg-indigo-500"
          >
            <Settings :size="18" />
            Configurações
          </RouterLink>

          <button
            class="flex items-center gap-3 px-3 h-10 rounded-xl text-sm text-gray-400 hover:bg-red-900 hover:text-red-300 transition-colors cursor-pointer border-none bg-transparent w-full"
          >
            <LogOut :size="18" />
            Sair
          </button>
        </div>
      </nav>
    </aside>

    <!-- Conteúdo -->
    <div class="flex flex-col flex-1">
      <!-- Topbar -->
      <header class="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">
        <div>
          <h1 class="text-base font-semibold text-gray-800 m-0">Painel Administrativo</h1>
          <p class="text-xs text-gray-400 m-0">Sonavox Admin</p>
        </div>

        <div class="flex items-center gap-4">
          <!-- Busca rápida -->
          <div
            class="flex items-center gap-2 h-9 px-3 rounded-full border border-gray-200 bg-gray-50 text-gray-400 text-sm"
          >
            <Search :size="16" />
            <input
              type="text"
              placeholder="Buscar..."
              class="bg-transparent outline-none border-none text-sm text-gray-700 w-40 placeholder:text-gray-400"
            />
          </div>

          <!-- Notificações -->
          <button
            class="relative h-9 w-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer border-none bg-transparent"
          >
            <Bell :size="18" class="text-gray-500" />
            <span
              v-if="notifications > 0"
              class="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-medium"
            >
              {{ notifications }}
            </span>
          </button>

          <!-- Perfil -->
          <div class="relative">
            <button
              class="flex items-center gap-2 cursor-pointer border-none bg-transparent"
              @click="profileOpen = !profileOpen"
            >
              <div class="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center">
                <span class="text-sm font-medium text-indigo-600">G</span>
              </div>
              <ChevronDown :size="14" class="text-gray-400" />
            </button>

            <!-- Dropdown -->
            <Transition name="dropdown">
              <div
                v-if="profileOpen"
                class="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-lg border border-gray-100 p-1 z-50"
              >
                <RouterLink
                  to="/admin/settings"
                  class="flex items-center gap-2 px-3 h-9 rounded-lg text-sm text-gray-600 hover:bg-gray-50 no-underline"
                >
                  <Settings :size="14" />
                  Configurações
                </RouterLink>
                <button
                  class="flex items-center gap-2 px-3 h-9 rounded-lg text-sm text-red-500 hover:bg-red-50 cursor-pointer border-none bg-transparent w-full"
                >
                  <LogOut :size="14" />
                  Sair
                </button>
              </div>
            </Transition>
          </div>
        </div>
      </header>

      <!-- Página -->
      <main class="flex-1 p-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
