import type { App } from "vue";

import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Lara from "@primeuix/themes/lara";

import {
  AutoComplete,
  Button,
  Card,
  Carousel,
  Column,
  DataTable,
  Drawer,
  InputText,
  Menu,
  Password,
  Toast,
  Stepper,
  StepPanel,
  StepPanels,
  StepList,
  Step,
} from "primevue";

export function setPrimeVue(app: App): void {
  app.use(PrimeVue, {
    theme: {
      preset: Lara,
      darkModeSelector: ".dark",
    },
  });
  app.use(ToastService);

  app.component("PrimeAutoComplete", AutoComplete);
  app.component("PrimeButton", Button);
  app.component("PrimeCard", Card);
  app.component("PrimeCarousel", Carousel);
  app.component("PrimeColumn", Column);
  app.component("PrimeDataTable", DataTable);
  app.component("PrimeDrawer", Drawer);
  app.component("PrimeInputText", InputText);
  app.component("PrimeMenu", Menu);
  app.component("PrimePassword", Password);
  app.component("PrimeToast", Toast);
  app.component("PrimeStepper", Stepper);
  app.component("PrimeStepList", StepList);
  app.component("PrimeStepPanel", StepPanel);
  app.component("PrimeStepPanels", StepPanels);
  app.component("PrimeStep", Step);
}
