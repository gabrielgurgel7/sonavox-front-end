<script lang="ts">
import { Order } from "@/models/order.model";
import { defineComponent } from "vue";
import CheckoutItems from "@/components/checkout/CheckoutItems.vue";
import CheckoutAddress from "@/components/checkout/CheckoutAddress.vue";
import CheckoutPayment from "@/components/checkout/CheckoutPayment.vue";
import CheckoutReview from "@/components/checkout/CheckoutReview.vue";
import CheckoutSummary from "@/components/checkout/CheckoutSummary.vue";
import { useCartStore } from "@/stores/cart";
import { useRouter } from "vue-router";
import { CheckOutService } from "@/services/checkout.service";
import { ShippingAddress } from "@/models/shippingAddress.model";

export default defineComponent({
  components: { CheckoutItems, CheckoutAddress, CheckoutPayment, CheckoutReview, CheckoutSummary },
  data() {
    return {
      form: {
        order: new Order(),
      },
      rest: new CheckOutService(),
      address: new ShippingAddress(),
      service: new CheckOutService(),
    };
  },
  setup() {
    const cartStore = useCartStore();
    const router = useRouter();
    return { cartStore, router };
  },
  methods: {
    setAddress(address: ShippingAddress) {
      this.form.order.shippingAddress = address;
    },
    async submitOrder() {
      try {
        const res = await this.rest.createOrder(
          this.cartStore.listProduct,
          this.form.order.shippingAddress,
        );
        console.log("res:", res);
        window.location.href = res.checkoutUrl;
      } catch (err) {
        console.error("Erro no submitOrder:", err);
      }
    },
  },
});
</script>

<template>
  <section class="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-10 md:px-12">
    <div class="max-w-5xl mx-auto flex flex-col gap-8">
      <PrimeStepper value="1" class="w-full">
        <PrimeStepList>
          <PrimeStep value="1">Itens</PrimeStep>
          <PrimeStep value="2">Endereço</PrimeStep>
          <PrimeStep value="3">Pagamento</PrimeStep>
          <PrimeStep value="4">Revisão</PrimeStep>
        </PrimeStepList>

        <PrimeStepPanels>
          <PrimeStepPanel value="1" v-slot="{ activateCallback }">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div
                class="md:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6"
              >
                <CheckoutItems :next="activateCallback" />
              </div>
              <div
                class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sticky top-6 self-start"
              >
                <CheckoutSummary />
              </div>
            </div>
          </PrimeStepPanel>

          <PrimeStepPanel value="2" v-slot="{ activateCallback }">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div
                class="md:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6"
              >
                <CheckoutAddress :next="activateCallback" @onNext="setAddress" />
              </div>
              <div
                class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sticky top-6 self-start"
              >
                <CheckoutSummary />
              </div>
            </div>
          </PrimeStepPanel>

          <PrimeStepPanel value="3" v-slot="{ activateCallback }">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div
                class="md:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6"
              >
                <CheckoutPayment :next="activateCallback" />
              </div>
              <div
                class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sticky top-6 self-start"
              >
                <CheckoutSummary />
              </div>
            </div>
          </PrimeStepPanel>

          <PrimeStepPanel value="4" v-slot="{ activateCallback }">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div
                class="md:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6"
              >
                <CheckoutReview :next="activateCallback" @onFinish="submitOrder" />
              </div>
              <div
                class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sticky top-6 self-start"
              >
                <CheckoutSummary />
              </div>
            </div>
          </PrimeStepPanel>
        </PrimeStepPanels>
      </PrimeStepper>
    </div>
  </section>
</template>

<style>
.p-steppanel {
  background: transparent !important;
}
</style>
