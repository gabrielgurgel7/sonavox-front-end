import type { App } from "vue";
import PrimeVue from "primevue/config";
import Lara from "@primeuix/themes/lara";
import {
  Button,
  AutoComplete,
  Drawer,
  DataTable,
  Column,
  InputText,
  Password,
  Menu,
} from "primevue";

export function setPrimeVue(app: App): void {
  app.use(PrimeVue, {
    theme: {
      preset: Lara,
      darkModeSelector: false,
    },
  });

  app.component("PrimeButton", Button);
  app.component("PrimeAutoComplete", AutoComplete);
  app.component("PrimeDrawer", Drawer);
  app.component("PrimeDataTable", DataTable);
  app.component("PrimeColumn", Column);
  app.component("PrimeInputText", InputText);
  app.component("PrimePassword", Password);
  app.component("PrimeMenu", Menu);
}
