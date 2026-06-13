<script lang="ts">
import { ShippingAddress } from "@/models/shippingAddress.model";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      shippingAddress: new ShippingAddress(),
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
  components: { Error },
});
</script>
<template>
  <form @submit.prevent="submitAddress" class="grid grid-cols-3 gap-4">
    <label>
      Cidade:
      <InputText v-model="shippingAddress.city" />
      <Error :value="v$.shippingAddress" field="city" />
    </label>
    <label>
      Rua:
      <InputText v-model="shippingAddress.street" />
      <Error :value="v$.shippingAddress" field="street" />
    </label>
    <label>
      Complemento:
      <InputText v-model="shippingAddress.complement" />
      <Error :value="v$.shippingAddress" field="complement" />
    </label>
    <label>
      País:
      <InputText v-model="shippingAddress.country" />
      <Error :value="v$.shippingAddress" field="country" />
    </label>
    <label>
      Bairro:
      <InputText v-model="shippingAddress.neighborhood" />
      <Error :value="v$.shippingAddress" field="neighborhood" />
    </label>
    <label>
      Número:
      <InputText v-model="shippingAddress.number" />
      <Error :value="v$.shippingAddress" field="number" />
    </label>
    <label>
      Estado:
      <InputText v-model="shippingAddress.state" />
      <Error :value="v$.shippingAddress" field="state" />
    </label>
    <label>
      CEP:
      <InputText v-model="shippingAddress.zipCode" />
      <Error :value="v$.shippingAddress" field="zipCode" />
    </label>
    <Button type="submit" :label="'Próximo'" class="col-start-1 col-end-3 mt-20" />
  </form>
</template>
