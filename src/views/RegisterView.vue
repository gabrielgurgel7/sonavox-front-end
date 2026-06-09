<script lang="ts">
import { defineComponent } from "vue";
import RegisterForm from "@/models/register.model";
import useVuelidate, { type Validation, type ValidationArgs } from "@vuelidate/core";
import { email, maxLength, minLength, required, sameAs } from "@vuelidate/validators";
import { RegisterRest } from "@/services/rest/resgister.rest";
import AppError from "@/components/AppError.vue";
export default defineComponent({
  components: { AppError },
  data() {
    return {
      form: new RegisterForm(),
      rest: new RegisterRest(),
      loading: false,
    };
  },
  setup(): { v$: Validation<ValidationArgs, unknown> } {
    return {
      v$: useVuelidate() as unknown as Validation<ValidationArgs, unknown>,
    };
  },
  validations() {
    return {
      form: {
        name: { required, minLength: minLength(2), maxLength: maxLength(100) },
        email: { required, email },
        password: { required, minLength: minLength(8), maxLength: maxLength(72) },
        confirmPassword: { required, sameAs: sameAs(this.form.password) },
      },
    };
  },
  methods: {
    register() {
      (this.v$ as unknown as Validation<ValidationArgs, unknown>).$validate();
      if ((this.v$ as unknown as Validation<ValidationArgs, unknown>).$invalid) return;
      const body = {
        name: this.form.name,
        email: this.form.email,
        password: this.form.password,
      };
      this.rest
        .registerUser(body)
        .then((res) => {
          console.log(res, "Resposta");
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
  <main class="flex items-center justify-center w-screen h-screen bg-neutral-50">
    <form
      class="flex flex-col gap-4 w-1/2 p-8 rounded-3xl border border-gray-300"
      @submit.prevent="register"
    >
      <header class="text-2xl text-indigo-400 font-bold">{{ "Faça seu registro" }}</header>
      <label class="flex flex-col text-black gap-1">
        Nome completo:
        <PrimeInputText
          v-model="form.name"
          unstyled
          :pt="{
            root: 'h-9 w-full px-3 rounded-xl border border-gray-300 text-sm text-indigo-400 outline-none focus:border-indigo-400 transition-colors',
          }"
        />
        <AppError :value="v$.form" field="name" />
      </label>
      <label class="flex flex-col text-black gap-1">
        Email:
        <PrimeInputText
          v-model="form.email"
          unstyled
          :pt="{
            root: 'h-9 w-full px-3 rounded-xl border border-gray-300 text-sm text-indigo-400 outline-none focus:border-indigo-400 transition-colors ',
          }"
        />
        <AppError :value="v$.form" field="email" />
      </label>
      <label class="flex flex-col text-black gap-1">
        Senha:
        <PrimePassword
          v-model="form.password"
          :feedback="false"
          toggleMask
          unstyled
          :pt="{
            root: 'w-full flex items-center h-9 rounded-xl border border-gray-300  text-indigo-400 overflow-hidden focus-within:border-indigo-400 transition-colors',
            input: 'flex-1 h-full px-3 text-sm  outline-none bg-transparent text-black',
          }"
        />
        <AppError :value="v$.form" field="password" />
      </label>
      <label class="flex flex-col text-black gap-1">
        Confirme sua senha:
        <PrimePassword
          v-model="form.confirmPassword"
          unstyled
          :feedback="false"
          toggleMask
          :pt="{
            root: 'w-full flex items-center h-9 rounded-xl border border-gray-300  text-indigo-400 overflow-hidden focus-within:border-indigo-400 transition-colors',
            input: 'flex-1 h-full px-3 text-sm  outline-none bg-transparent text-black',
          }"
        />
        <AppError :value="v$.form" field="confirmPassword" />
      </label>
      <div class="flex flex-row w-full gap-2">
        <PrimeButton
          unstyled
          class="w-full h-9 rounded-xl border border-gray-300 bg-transparent text-sm text-black cursor-pointer hover:bg-indigo-50 transition-colors"
          :label="'Cancelar'"
        />
        <PrimeButton
          unstyled
          class="w-full h-9 rounded-xl bg-indigo-600 text-white text-sm font-medium cursor-pointer hover:bg-indigo-500 transition-colors"
          type="submit"
          :label="'Registrar'"
          :loading="loading"
        />
      </div>
    </form>
  </main>
</template>
