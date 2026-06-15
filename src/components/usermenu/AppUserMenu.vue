<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { ChevronDown, Settings, LogOut, UserStar, Moon, Sun } from "@lucide/vue";
import { useTheme } from "@/composables/useTheme";

export default defineComponent({
  components: { ChevronDown, Settings, LogOut, UserStar, Moon, Sun },
  setup() {
    const authStore = useAuthStore();
    const menu = ref();
    const router = useRouter();
    const { isDark, toggleDark } = useTheme();

    const toggle = (event: Event) => {
      menu.value.toggle(event);
    };

    const firstName = computed(() => authStore.getUser?.name?.split(" ")[0] ?? "");

    const allItems = [
      {
        label: "Admin",
        role: "ADMIN",
        command: () => router.push("/admin"),
      },
      {
        label: "Configurações",
        command: () => {},
      },
      {
        label: "toggle-theme",
        command: toggleDark,
      },
      {
        label: "Sair",
        command: () => {
          authStore.logout();
          router.push("/login");
        },
      },
    ];

    const items = computed(() =>
      allItems.filter((item) => !item.role || item.role === authStore.getRole),
    );

    return { authStore, menu, toggle, items, isDark, toggleDark, firstName };
  },
});
</script>

<template>
  <div>
    <button
      class="flex items-center gap-2 cursor-pointer border-none bg-transparent"
      @click="toggle"
    >
      <span class="text-sm font-medium text-gray-700 dark:text-gray-200">
        Olá, {{ firstName }}
      </span>
      <ChevronDown :size="14" class="text-gray-400 dark:text-gray-500" />
    </button>

    <PrimeMenu
      ref="menu"
      :model="items"
      popup
      unstyled
      :pt="{
        root: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm py-1 min-w-[160px]',
        list: 'flex flex-col',
        item: 'px-1',
        itemContent: 'w-full',
      }"
    >
      <template #item="{ item, props }">
        <a
          v-bind="props.action"
          class="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors"
        >
          <UserStar
            v-if="item.label === 'Admin'"
            :size="14"
            class="text-gray-400 dark:text-gray-500"
          />
          <Settings
            v-if="item.label === 'Configurações'"
            :size="14"
            class="text-gray-400 dark:text-gray-500"
          />
          <Moon
            v-if="item.label === 'toggle-theme' && !isDark"
            :size="14"
            class="text-gray-400 dark:text-gray-500"
          />
          <Sun
            v-if="item.label === 'toggle-theme' && isDark"
            :size="14"
            class="text-gray-400 dark:text-gray-500"
          />

          <LogOut
            v-if="item.label === 'Sair'"
            :size="14"
            class="text-gray-400 dark:text-gray-500"
          />
          <span v-if="item.label === 'toggle-theme'">
            {{ isDark ? "Modo claro" : "Modo escuro" }}
          </span>
          <span v-else>{{ item.label }}</span>
        </a>
      </template>
    </PrimeMenu>
  </div>
</template>
