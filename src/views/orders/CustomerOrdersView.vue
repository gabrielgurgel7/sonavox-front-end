<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return { orders: [] };
  },
});
</script>

<template>
  <div class="flex items-center justify-center w-screen h-screen">
    <h1 class="text-3xl text-black dark:text-neutral-50">Meus pedidos</h1>
  </div>
</template>
