<script lang="ts">
import { defineComponent } from "vue";
import RegisterForm from "@/models/register.model";
import useVuelidate, { type Validation, type ValidationArgs } from "@vuelidate/core";
import { msg } from "@/utils/messages";
import { RegisterRest } from "@/services/rest/resgister.rest";
import AppError from "@/components/common/AppError.vue";
import { useAuthStore } from "@/stores/auth";
import { Eye, EyeOff } from "@lucide/vue";
import { useToast } from "primevue/usetoast";
import type { ToastServiceMethods } from "primevue/toastservice";
export default defineComponent({
  components: { AppError, Eye, EyeOff },
  data() {
    return {
      form: new RegisterForm(),
      rest: new RegisterRest(),
      loading: false,
      showPassword: false,
      showConfirmPassword: false,
      inputClass:
        "h-10 w-full px-3 rounded-xl border border-gray-200 text-sm text-gray-800 outline-none focus:border-indigo-400 transition-colors bg-white",
    };
  },
  setup(): {
    v$: Validation<ValidationArgs, unknown>;
    authStore: ReturnType<typeof useAuthStore>;
    toast: ToastServiceMethods;
  } {
    const authStore = useAuthStore();
    const toast = useToast();
    return {
      toast,
      authStore,
      v$: useVuelidate() as unknown as Validation<ValidationArgs, unknown>,
    };
  },
  validations() {
    return {
      form: {
        name: {
          required: msg.required("Nome"),
          minLength: msg.minLength("Nome", 2),
          maxLength: msg.maxLength("Nome", 100),
        },
        email: {
          required: msg.required("E-mail"),
          email: msg.email,
        },
        password: {
          required: msg.required("Senha"),
          minLength: msg.minLength("Senha", 8),
          maxLength: msg.maxLength("Senha", 72),
        },
        confirmPassword: {
          required: msg.required("Confirmação de senha"),
          sameAs: msg.sameAs("As senhas não coincidem", this.form.password),
        },
      },
    };
  },
  methods: {
    // reset() {
    //   this.form = new RegisterForm();
    //   (this.v$ as unknown as Validation<ValidationArgs, unknown>).$reset();
    // },
    register() {
      (this.v$ as unknown as Validation<ValidationArgs, unknown>).$validate();
      if ((this.v$ as unknown as Validation<ValidationArgs, unknown>).$invalid) return;

      this.loading = true;

      setTimeout(() => {
        const body = {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password,
        };

        this.rest
          .registerUser(body)
          .then((res) => {
            this.authStore.setUser(res.user);
            this.authStore.setAccessToken(res.tokens.accessToken);
            this.authStore.setRefreshToken(res.tokens.refreshToken);

            this.toast.add({
              severity: "success",
              summary: "Conta criada!",
              detail: `Bem-vindo, ${res.user.name}!`,
              life: 3000,
            });

            this.$router.push("/");
          })
          .catch((err: { response?: { status: number } }) => {
            const message =
              err.response?.status === 409 ? "E-mail já cadastrado" : "Erro ao criar conta";

            this.toast.add({
              severity: "error",
              summary: "Erro",
              detail: message,
              life: 3000,
            });
          })
          .finally(() => {
            this.loading = false;
          });
      }, 1000);
    },
  },
});
</script>
<template>
  <main class="flex items-center justify-center w-screen min-h-screen px-4 py-8">
    <PrimeCard
      unstyled
      :pt="{
        root: 'w-full max-w-md',
        body: 'flex flex-col gap-4 p-8 rounded-3xl border border-gray-200 bg-white shadow-sm',
        content: 'flex flex-col gap-4 p-0',
      }"
    >
      <template #title>
        <h1 class="text-2xl font-medium text-indigo-600 m-0">Crie sua conta</h1>
        <p class="text-sm text-gray-400 mt-1">Preencha os dados abaixo para se registrar</p>
      </template>

      <template #content>
        <form @submit.prevent="register" class="flex flex-col gap-2">
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-600">Nome completo</label>
            <PrimeInputText
              v-model="form.name"
              unstyled
              :pt="{ root: inputClass }"
              placeholder="Gabriel Gurgel"
            />
            <AppError :field="v$.form.name" />
          </div>

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
            <label class="text-sm font-medium text-gray-600">Senha</label>
            <div class="relative w-full">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                class="h-10 w-full px-3 pr-10 rounded-xl border border-gray-200 text-sm text-gray-800 outline-none focus:border-indigo-400 transition-colors bg-white"
                placeholder="Mínimo 8 caracteres"
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

          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-600">Confirmar senha</label>
            <div class="relative w-full">
              <input
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                class="h-10 w-full px-3 pr-10 rounded-xl border border-gray-200 text-sm text-gray-800 outline-none focus:border-indigo-400 transition-colors bg-white"
                placeholder="Repita a senha"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 border-none bg-transparent cursor-pointer"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                <EyeOff v-if="showConfirmPassword" :size="16" />
                <Eye v-else :size="16" />
              </button>
            </div>
            <AppError :field="v$.form.confirmPassword" />
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
              :label="'Registrar'"
              :loading="loading"
            />
          </div>

          <div class="flex items-center gap-2">
            <div class="flex-1 h-px bg-gray-100"></div>
            <span class="text-xs text-gray-400">ou</span>
            <div class="flex-1 h-px bg-gray-100"></div>
          </div>

          <p class="text-center text-sm text-gray-500 m-0">
            Já tem uma conta?
            <RouterLink to="/login" class="text-indigo-500 font-medium hover:text-indigo-600">
              Faça login
            </RouterLink>
          </p>
        </form>
      </template>
    </PrimeCard>
  </main>
</template>
