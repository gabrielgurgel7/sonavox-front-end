import "./assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { setPrimeVue } from "./modules/primevue.modules.ts";

const savedTheme = localStorage.getItem("theme");
if (
  savedTheme === "dark" ||
  (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
}

const app = createApp(App);

setPrimeVue(app);

app.use(createPinia());
app.use(router);

app.mount("#app");
