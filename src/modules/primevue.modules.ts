import type { App } from "vue";
import PrimeVue from "primevue/config";
import Lara from "@primeuix/themes/lara";
import { Button, AutoComplete, Drawer, DataTable, Column } from "primevue";

export function setPrimeVue(app: App): void {
  app.use(PrimeVue, {
    theme: {
      preset: Lara,
    },
  });

  app.component("PrimeButton", Button);
  app.component("PrimeAutoComplete", AutoComplete);
  app.component("PrimeDrawer", Drawer);
  app.component("PrimeDataTable", DataTable);
  app.component("PrimeColumn", Column);
}
