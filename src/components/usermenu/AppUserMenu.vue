<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { ChevronDown, Settings, LogOut } from "@lucide/vue";

export default defineComponent({
  components: { ChevronDown, Settings, LogOut },
  setup() {
    const authStore = useAuthStore();
    const menu = ref();
    const router = useRouter();

    const toggle = (event: Event) => {
      menu.value.toggle(event);
    };

    const items = [
      {
        label: "Configurações",
        command: () => {},
      },
      {
        label: "Sair",
        command: () => {
          authStore.logout();
          router.push("/login");
        },
      },
    ];

    return { authStore, menu, toggle, items };
  },
});
</script>

<template>
  <div>
    <button
      class="flex items-center gap-2 cursor-pointer border-none bg-transparent"
      @click="toggle"
    >
      <span class="text-sm font-medium text-gray-700">Olá, {{ authStore.getUser?.name }}</span>
      <ChevronDown :size="14" class="text-gray-400" />
    </button>

    <PrimeMenu
      ref="menu"
      :model="items"
      popup
      unstyled
      :pt="{
        root: 'bg-white border border-gray-200 rounded-xl shadow-sm py-1 min-w-[160px]',
        list: 'flex flex-col',
        item: 'px-1',
        itemContent: 'w-full',
      }"
    >
      <template #item="{ item, props }">
        <a
          v-bind="props.action"
          class="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-indigo-50 rounded-lg cursor-pointer transition-colors"
        >
          <Settings v-if="item.label === 'Configurações'" :size="14" class="text-gray-400" />
          <LogOut v-if="item.label === 'Sair'" :size="14" class="text-gray-400" />
          {{ item.label }}
        </a>
      </template>
    </PrimeMenu>
  </div>
</template>
