import { ref, computed } from "vue";
import { defineStore } from "pinia";

// Composition API
export const useCounterStore = defineStore("counter", () => {
  // Estados - states
  const count = ref(0);
  // Métodos computados - Getters
  const doubleCount = computed(() => count.value * 2);
  // Métodos que alteram estados
  function increment() {
    count.value++;
  }

  return { count, doubleCount, increment };
});
