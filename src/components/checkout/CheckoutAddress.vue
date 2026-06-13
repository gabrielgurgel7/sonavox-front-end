<script lang="ts">
import { ShippingAddress } from "@/models/shippingAddress.model";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      shippingAdress: new ShippingAddress(),
    };
  },
  methods: {
    submitAddress() {},
  },
});
</script>

<template>
  <div class="flex items-center justify-center w-screen h-screen">
    <Items />
  </div>
</template>
