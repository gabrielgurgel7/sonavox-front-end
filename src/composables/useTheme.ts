import { ref, watchEffect } from "vue";

const isDark = ref(document.documentElement.classList.contains("dark"));

// Observa mudanças externas na classe dark
watchEffect(() => {
  isDark.value = document.documentElement.classList.contains("dark");
});

export function useTheme() {
  const toggleDark = () => {
    isDark.value = !isDark.value;
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark.value ? "dark" : "light");
  };

  return { isDark, toggleDark };
}
