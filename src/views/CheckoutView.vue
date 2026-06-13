<script lang="ts">
import { Order } from "@/models/order.model";
import { defineComponent } from "vue";
import CheckoutItems from "@/components/checkout/CheckoutItems.vue";
import Address from "@/components/checkout/CheckoutAddress.vue";

export default defineComponent({
  data() {
    return {
      form: {
        order: new Order(),
      },
      view: 1,
    };
  },
  components: { CheckoutItems, CheckoutAddress: Address },
  methods: {
    goTo(view: number) {
      this.view = view;
    },
  },
});
</script>

<template>
  <div class="card flex justify-center">
    <PrimeStepper value="1">
      <PrimeStepList>
        <PrimeStep value="1">Itens</PrimeStep>
        <PrimeStep value="2">Endereço</PrimeStep>
      </PrimeStepList>
      <PrimeStepPanels>
        <PrimeStepPanel value="1" v-slot="{ activateCallback }">
          <CheckoutItems :next="activateCallback" />
        </PrimeStepPanel>
        <PrimeStepPanel value="2" v-slot="{ activateCallback }">
          <CheckoutAddress :next="activateCallback" />
        </PrimeStepPanel>
      </PrimeStepPanels>
    </PrimeStepper>
  </div>
</template>
