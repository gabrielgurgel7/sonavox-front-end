<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    field: {
      type: Object,
    },
  },
});
</script>

<template>
  <div class="h-5">
    <p v-if="field?.$errors?.length > 0" class="text-xs text-red-500">
      {{ field?.$errors[0]?.$message }}
    </p>
  </div>
</template>
