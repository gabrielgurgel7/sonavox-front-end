<script lang="ts">
import { defineComponent } from "vue";
import useVuelidate, { type Validation, type ValidationArgs } from "@vuelidate/core";
import { msg } from "@/utils/messages";
import AppError from "@/components/AppError.vue";
import { useAuthStore } from "@/stores/auth";
import { Eye, EyeOff } from "@lucide/vue";

class LoginForm {
  email = "";
  password = "";
}

export default defineComponent({
  components: { AppError, Eye, EyeOff },
  data() {
    return {
      form: new LoginForm(),
      loading: false,
      showPassword: false,
      inputClass:
        "h-10 w-full px-3 rounded-xl border border-gray-200 text-sm text-gray-800 outline-none focus:border-indigo-400 transition-colors bg-white",
    };
  },
  setup(): { v$: Validation<ValidationArgs, unknown>; authStore: ReturnType<typeof useAuthStore> } {
    const authStore = useAuthStore();
    return {
      authStore,
      v$: useVuelidate() as unknown as Validation<ValidationArgs, unknown>,
    };
  },
  validations() {
    return {
      form: {
        email: {
          required: msg.required("E-mail"),
          email: msg.email,
        },
        password: {
          required: msg.required("Senha"),
          minLength: msg.minLength("Senha", 8),
        },
      },
    };
  },
  methods: {
    login() {
      (this.v$ as unknown as Validation<ValidationArgs, unknown>).$validate();
      if ((this.v$ as unknown as Validation<ValidationArgs, unknown>).$invalid) return;

      this.loading = true;

      // Simula login — substituir pela chamada real quando tiver backend
      Promise.resolve({
        data: {
          user: { id: "1", name: "Gabriel", email: this.form.email, role: "CUSTOMER" },
          tokens: {
            accessToken: "fake-access-token",
            refreshToken: "fake-refresh-token",
          },
        },
      })
        .then((res: any) => {
          this.authStore.setUser(res.data.user);
          this.authStore.setAccessToken(res.data.tokens.accessToken);
          this.authStore.setRefreshToken(res.data.tokens.refreshToken);

          if (this.authStore.user.role === "CUSTOMER") {
            this.$router.push({ path: "/" });
          }
          if (this.authStore.user.role === "ADMIN") {
            this.$router.push({ path: "/admin" });
          }
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false;
        });
    },
  },
});
</script>

<template>
  <main class="flex items-center justify-center w-screen min-h-screen bg-neutral-50 px-4 py-8">
    <form
      class="flex flex-col gap-4 w-full max-w-md p-8 rounded-3xl border border-gray-200 bg-white shadow-sm"
      @submit.prevent="login"
    >
      <div>
        <h1 class="text-2xl font-medium text-indigo-600 m-0">Bem-vindo de volta!</h1>
        <p class="text-sm text-gray-400 mt-1">Entre com suas credenciais para continuar</p>
      </div>

      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-gray-600">E-mail</label>
          <PrimeInputText
            v-model="form.email"
            unstyled
            :pt="{ root: inputClass }"
            placeholder="gabriel@exemplo.com"
          />
          <AppError :field="v$.form.email" />
        </div>

        <div class="flex flex-col gap-1.5">
          <div class="flex items-center justify-between">
            <label class="text-sm font-medium text-gray-600">Senha</label>
            <a href="#" class="text-xs text-indigo-500 hover:text-indigo-600">Esqueceu a senha?</a>
          </div>
          <div class="relative w-full">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              class="h-10 w-full px-3 pr-10 rounded-xl border border-gray-200 text-sm text-gray-800 outline-none focus:border-indigo-400 transition-colors bg-white"
              placeholder="Sua senha"
            />
            <button
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 border-none bg-transparent cursor-pointer"
              @click="showPassword = !showPassword"
            >
              <EyeOff v-if="showPassword" :size="16" />
              <Eye v-else :size="16" />
            </button>
          </div>
          <AppError :field="v$.form.password" />
        </div>
      </div>

      <div class="flex gap-2 mt-1">
        <RouterLink
          to="/"
          class="flex-1 h-10 rounded-xl border border-gray-200 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-center"
        >
          Cancelar
        </RouterLink>
        <PrimeButton
          unstyled
          class="flex-1 h-10 rounded-xl bg-indigo-600 text-white text-sm font-medium cursor-pointer hover:bg-indigo-500 transition-colors"
          type="submit"
          :label="'Entrar'"
          :loading="loading"
        />
      </div>

      <div class="flex items-center gap-2">
        <div class="flex-1 h-px bg-gray-100"></div>
        <span class="text-xs text-gray-400">ou</span>
        <div class="flex-1 h-px bg-gray-100"></div>
      </div>

      <p class="text-center text-sm text-gray-500 m-0">
        Não tem uma conta?
        <RouterLink to="/register" class="text-indigo-500 font-medium hover:text-indigo-600">
          Cadastre-se
        </RouterLink>
      </p>
    </form>
  </main>
</template>
