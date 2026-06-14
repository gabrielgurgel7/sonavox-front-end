<script lang="ts">
import { ShippingAddress } from "@/models/shippingAddress.model";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { defineComponent } from "vue";
import AppError from "@/components/common/AppError.vue";
export default defineComponent({
  data() {
    return {
      shippingAddress: new ShippingAddress(),
      inputClass:
        "h-10 w-full px-3 rounded-xl border border-gray-200 text-sm text-gray-800 outline-none focus:border-indigo-400 transition-colors bg-white",
    };
  },
  props: {
    next: {
      type: Function,
      required: true,
    },
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      shippingAddress: {
        city: { required },
        street: { required },
        number: { required },
        neighborhood: { required },
        country: { required },
        zipCode: { required },
        complement: { required },
      },
    };
  },
  methods: {
    submitAddress() {
      this.v$.$validate();
      if (this.v$.$invalid) return;
      this.$emit("onNext", this.shippingAddress);
      this.next("2");
    },
  },
  components: { AppError },
});
</script>
<template>
  <div class="flex flex-col gap-4 p-8">
    <div>
      <h2 class="text-2xl font-medium text-indigo-600 m-0">Endereço de entrega</h2>
      <p class="text-sm text-gray-400 mt-1">Informe onde deseja receber seu pedido</p>
    </div>

    <form @submit.prevent="submitAddress" class="flex flex-col gap-4">
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-gray-600">CEP</label>
          <PrimeInputText
            v-model="shippingAddress.zipCode"
            unstyled
            :pt="{ root: inputClass }"
            placeholder="00000-000"
          />
          <AppError :field="v$.shippingAddress.zipCode" />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-gray-600">País</label>
          <PrimeInputText
            v-model="shippingAddress.country"
            unstyled
            :pt="{ root: inputClass }"
            placeholder="BR"
          />
          <AppError :field="v$.shippingAddress.country" />
        </div>

        <div class="flex flex-col gap-1.5 col-span-2">
          <label class="text-sm font-medium text-gray-600">Rua</label>
          <PrimeInputText
            v-model="shippingAddress.street"
            unstyled
            :pt="{ root: inputClass }"
            placeholder="Nome da rua"
          />
          <AppError :field="v$.shippingAddress.street" />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-gray-600">Número</label>
          <PrimeInputText
            v-model="shippingAddress.number"
            unstyled
            :pt="{ root: inputClass }"
            placeholder="123"
          />
          <AppError :field="v$.shippingAddress.number" />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-gray-600">Complemento</label>
          <PrimeInputText
            v-model="shippingAddress.complement"
            unstyled
            :pt="{ root: inputClass }"
            placeholder="Apto, bloco..."
          />
          <AppError :field="v$.shippingAddress.complement" />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-gray-600">Bairro</label>
          <PrimeInputText
            v-model="shippingAddress.neighborhood"
            unstyled
            :pt="{ root: inputClass }"
            placeholder="Nome do bairro"
          />
          <AppError :field="v$.shippingAddress.neighborhood" />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-gray-600">Cidade</label>
          <PrimeInputText
            v-model="shippingAddress.city"
            unstyled
            :pt="{ root: inputClass }"
            placeholder="Nome da cidade"
          />
          <AppError :field="v$.shippingAddress.city" />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-gray-600">Estado</label>
          <PrimeInputText
            v-model="shippingAddress.state"
            unstyled
            :pt="{ root: inputClass }"
            placeholder="SP"
          />
          <AppError :field="v$.shippingAddress.state" />
        </div>
      </div>

      <PrimeButton
        unstyled
        type="submit"
        class="h-10 w-full rounded-xl bg-indigo-600 text-white text-sm font-medium cursor-pointer hover:bg-indigo-500 transition-colors mt-2"
        label="Confirmar endereço"
      />
    </form>
  </div>
</template>
