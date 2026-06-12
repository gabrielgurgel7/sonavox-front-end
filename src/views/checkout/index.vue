<script>
import Order from "@/models/order.model"
import { defineComponent } from "vue";
import Items from "./Items.vue"
import Address from "./Address.vue"
export default defineComponent({
  data() {
    return {
      form: {
        order: new Order(),
      },
      view: 1,
    }
  },
  components: { Items, Address },
  methods: {
    goTo(view: number) {
      this.view = view
    }
  }
})
</script>
<template>
  <div>
    <template>
      <div class="card flex justify-center">
        <PrimeStepper value="1" class="basis-200">
          <StepList>
            <Step value="1">Header I</Step>
            <Step value="2">Header II</Step>
          </StepList>
          <StepPanels>
            <StepPanel v-slot="{ activateCallback }" value="1"> </StepPanel>
            <StepPanel v-slot="{ activateCallback }" value="2"> </StepPanel>
          </StepPanels>
        </PrimeStepper>
      </div>
    </template>
  </div>
</template>
