<script lang="ts">
import { defineComponent } from "vue";
import { Mail } from "@lucide/vue";

export default defineComponent({
  components: { Mail },
});
</script>

<template>
  <footer class="bg-neutral-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
    <!-- Bloco principal -->
    <div class="px-12 py-12 grid grid-cols-4 gap-8">
      <!-- Coluna 1: Marca + redes sociais -->
      <div class="flex flex-col gap-4">
        <figure class="m-0 select-none">
          <RouterLink to="/">
            <img
              src="@/assets/imgs/logo_sonavox_header.svg"
              alt="Logo Sonavox"
              draggable="false"
              class="dark:brightness-0 dark:invert"
            />
          </RouterLink>
        </figure>
        <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          Sua loja de instrumentos e acessórios musicais com os melhores preços.
        </p>
        <div class="flex gap-3"></div>
      </div>

      <!-- Coluna 2: Categorias -->
      <div class="flex flex-col gap-3">
        <p class="text-sm font-semibold text-gray-800 dark:text-white">Categorias</p>
        <RouterLink
          to="/products?category=instrumentos"
          class="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-400 transition-colors no-underline"
          >Instrumentos</RouterLink
        >
        <RouterLink
          to="/products?category=acessorios"
          class="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-400 transition-colors no-underline"
          >Acessórios</RouterLink
        >
        <RouterLink
          to="/products?category=encordoamentos"
          class="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-400 transition-colors no-underline"
          >Encordoamentos</RouterLink
        >
        <RouterLink
          to="/products?category=audio"
          class="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-400 transition-colors no-underline"
          >Áudio</RouterLink
        >
      </div>

      <!-- Coluna 3: Institucional -->
      <div class="flex flex-col gap-3">
        <p class="text-sm font-semibold text-gray-800 dark:text-white">Institucional</p>
        <RouterLink
          to="/about"
          class="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-400 transition-colors no-underline"
          >Sobre nós</RouterLink
        >
        <RouterLink
          to="/contact"
          class="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-400 transition-colors no-underline"
          >Contato</RouterLink
        >
        <RouterLink
          to="/faq"
          class="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-400 transition-colors no-underline"
          >Dúvidas frequentes</RouterLink
        >
        <RouterLink
          to="/privacy"
          class="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-400 transition-colors no-underline"
          >Política de privacidade</RouterLink
        >
        <RouterLink
          to="/terms"
          class="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-400 transition-colors no-underline"
          >Termos de uso</RouterLink
        >
      </div>

      <!-- Coluna 4: Newsletter -->
      <div class="flex flex-col gap-3">
        <p class="text-sm font-semibold text-gray-800 dark:text-white">Newsletter</p>
        <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          Receba ofertas exclusivas e novidades direto no seu e-mail.
        </p>
        <div class="flex flex-col gap-2">
          <div
            class="flex items-center border border-gray-300 dark:border-gray-700 rounded-xl focus-within:border-indigo-400 transition-colors bg-transparent"
          >
            <Mail :size="16" class="ml-3 text-gray-400 shrink-0" />
            <input
              type="email"
              placeholder="seu@email.com"
              class="h-9 px-3 rounded-full text-sm text-black dark:text-white outline-none bg-transparent w-full placeholder:text-gray-400"
            />
          </div>
          <button
            class="h-9 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors cursor-pointer border-none"
          >
            Inscrever-se
          </button>
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div class="border-t border-gray-200 dark:border-gray-700 mx-12" />

    <!-- Rodapé inferior: pagamento + selos + copyright -->
    <div class="px-12 py-6 flex items-center justify-between gap-4 flex-wrap">
      <!-- Copyright -->
      <p class="text-xs text-gray-400 m-0">
        © {{ new Date().getFullYear() }} Sonavox. Todos os direitos reservados.
      </p>

      <!-- Formas de pagamento -->
      <div class="flex items-center gap-2">
        <span class="text-xs text-gray-400 mr-1">Pagamentos:</span>
        <span
          v-for="method in ['Visa', 'Master', 'Pix', 'Boleto']"
          :key="method"
          class="h-7 px-2.5 rounded border border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 flex items-center bg-white dark:bg-gray-800"
        >
          {{ method }}
        </span>
      </div>

      <!-- Selos de segurança -->
      <div class="flex items-center gap-3">
        <span class="text-xs text-gray-400 mr-1">Segurança:</span>
        <span
          v-for="seal in ['SSL', 'Site Blindado', 'E-bit']"
          :key="seal"
          class="h-7 px-2.5 rounded border border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 flex items-center bg-white dark:bg-gray-800"
        >
          🔒 {{ seal }}
        </span>
      </div>
    </div>
  </footer>
</template>
