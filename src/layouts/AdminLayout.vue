<script lang="ts">
import { defineComponent } from "vue";
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut } from "@lucide/vue";

export default defineComponent({
  components: { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut },
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
      <nav class="flex flex-col gap-1 p-4 flex-1">
        <p class="text-xs text-gray-500 uppercase tracking-widest px-3 mb-2">Menu</p>

        <RouterLink
          to="/admin"
          class="flex items-center gap-3 px-3 h-10 rounded-xl text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          active-class="bg-indigo-600 text-white hover:bg-indigo-500"
        >
          <LayoutDashboard :size="18" />
          Dashboard
        </RouterLink>

        <RouterLink
          to="/admin/products"
          class="flex items-center gap-3 px-3 h-10 rounded-xl text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          active-class="bg-indigo-600 text-white hover:bg-indigo-500"
        >
          <Package :size="18" />
          Produtos
        </RouterLink>

        <RouterLink
          to="/admin/orders"
          class="flex items-center gap-3 px-3 h-10 rounded-xl text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          active-class="bg-indigo-600 text-white hover:bg-indigo-500"
        >
          <ShoppingCart :size="18" />
          Pedidos
        </RouterLink>

        <RouterLink
          to="/admin/users"
          class="flex items-center gap-3 px-3 h-10 rounded-xl text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          active-class="bg-indigo-600 text-white hover:bg-indigo-500"
        >
          <Users :size="18" />
          Usuários
        </RouterLink>

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
        <div class="flex items-center gap-3">
          <div class="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center">
            <span class="text-sm font-medium text-indigo-600">G</span>
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
