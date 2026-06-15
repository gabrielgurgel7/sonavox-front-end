<script lang="ts">
import { defineComponent } from "vue";
import { OrderRest } from "@/services/rest/order.rest";
import type { IOrderResponse } from "@/types/api.types";

export default defineComponent({
  data() {
    return {
      orders: [] as IOrderResponse[],
      rest: new OrderRest(),
      loading: false,
    };
  },
  methods: {
    async getMyOrders() {
      this.loading = true;
      this.rest
        .getMyOrders()
        .then((res) => {
          console.log(JSON.stringify(res, null, 2));
          this.orders = res as IOrderResponse[];
        })
        .catch((err) => console.error(err))
        .finally(() => (this.loading = false));
    },
    formatCurrency(value: number) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    },
    formatDate(date: string) {
      if (!date) return "-";
      const d = new Date(date);
      if (isNaN(d.getTime())) return "-";
      return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(d);
    },
    statusLabel(status: string) {
      const map: Record<string, string> = {
        PENDING: "Pendente",
        PROCESSING: "Processando",
        COMPLETED: "Concluído",
        CANCELLED: "Cancelado",
      };
      return map[status] ?? status;
    },
    statusClass(status: string) {
      const map: Record<string, string> = {
        PENDING: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
        PROCESSING: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
        COMPLETED: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
        CANCELLED: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
      };
      return map[status] ?? "";
    },
  },
  mounted() {
    this.getMyOrders();
  },
});
</script>

<template>
  <section class="px-4 md:px-12 py-8 max-w-5xl mx-auto">
    <h1 class="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Meus pedidos</h1>

    <div v-if="loading" class="text-sm text-gray-400 text-center py-12">Carregando...</div>

    <div v-else-if="orders.length === 0" class="text-sm text-gray-400 text-center py-12">
      Você ainda não fez nenhum pedido.
    </div>

    <div v-else class="flex flex-col gap-4">
      <div
        v-for="order in orders"
        :key="order.id"
        class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col gap-4"
      >
        <!-- Header do pedido -->
        <div class="flex items-center justify-between flex-wrap gap-2">
          <div class="flex flex-col gap-0.5">
            <p class="text-xs text-gray-400">
              Pedido realizado em {{ formatDate(order.createdAt) }}
            </p>
            <p class="text-xs text-gray-400 font-mono">{{ order.id }}</p>
          </div>
          <span :class="['px-3 py-1 rounded-full text-xs font-medium', statusClass(order.status)]">
            {{ statusLabel(order.status) }}
          </span>
        </div>

        <!-- Itens -->
        <div class="flex flex-col gap-3">
          <div v-for="item in order.items" :key="item.id" class="flex items-center gap-3">
            <img
              :src="item.productImage"
              :alt="item.productName"
              class="w-14 h-14 rounded-xl object-cover"
            />
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-800 dark:text-white">
                {{ item.productName }}
              </p>
              <p class="text-xs text-gray-400">
                {{ item.quantity }}x {{ formatCurrency(item.unitPrice) }}
              </p>
            </div>
            <span class="text-sm font-medium text-gray-800 dark:text-white">
              {{ formatCurrency(item.totalPrice) }}
            </span>
          </div>
        </div>

        <!-- Totais -->
        <div class="border-t border-gray-200 dark:border-gray-700 pt-4 flex flex-col gap-1">
          <div class="flex justify-between text-sm text-gray-500">
            <span>Subtotal</span>
            <span>{{ formatCurrency(order.subtotal) }}</span>
          </div>
          <div class="flex justify-between text-sm text-gray-500">
            <span>Frete</span>
            <span :class="order.shipping === 0 ? 'text-green-500' : ''">
              {{ order.shipping === 0 ? "Grátis" : formatCurrency(order.shipping) }}
            </span>
          </div>
          <div
            class="flex justify-between text-base font-bold text-gray-800 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700"
          >
            <span>Total</span>
            <span>{{ formatCurrency(order.total) }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
