<script lang="ts">
import { defineComponent } from "vue";
import { ProductRest } from "@/services/rest/product.rest";
import { Product } from "@/models/product.model";
import { Plus, Pencil, Trash2, Package } from "@lucide/vue";
import { QueryParams } from "@/models/queryParams";

export default defineComponent({
  components: { Plus, Pencil, Trash2, Package },
  data() {
    return {
      products: [] as Product[],
      loading: false,
      rest: new ProductRest(),
    };
  },
  methods: {
    async getProducts() {
      this.loading = true;
      this.rest
        .getAll(new QueryParams())
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((res: any) => {
          this.products = (res.data ?? res).map(Product.fromResponse);
        })
        .finally(() => (this.loading = false));
    },
    async deleteProduct(id: string) {
      if (!confirm("Desativar este produto?")) return;
      try {
        await this.rest.update(id, { isActive: false });
        await this.getProducts(); // recarrega a lista
      } catch (err) {
        console.error(err);
      }
    },
  },
  mounted() {
    this.getProducts();
  },
});
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-800 dark:text-white">
          Produtos
        </h1>
        <p class="text-sm text-gray-400 mt-1">
          {{ products.length }} produtos cadastrados
        </p>
      </div>
      <RouterLink
        to="/admin/products/create"
        class="flex items-center gap-2 h-9 px-4 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors"
      >
        <Plus :size="16" />
        Novo produto
      </RouterLink>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-sm text-gray-400 text-center py-12">
      Carregando...
    </div>

    <!-- Vazio -->
    <div
      v-else-if="products.length === 0"
      class="flex flex-col items-center justify-center py-20 gap-3 text-gray-400"
    >
      <Package :size="40" class="text-gray-300" />
      <p class="text-sm">Nenhum produto cadastrado ainda.</p>
      <RouterLink
        to="/admin/products/create"
        class="text-sm text-indigo-500 hover:text-indigo-400"
        >Cadastrar primeiro produto</RouterLink
      >
    </div>

    <!-- Tabela -->
    <div
      v-else
      class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <table class="w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th
              class="text-left text-xs font-medium text-gray-400 uppercase tracking-widest px-6 py-4"
            >
              Produto
            </th>
            <th
              class="text-left text-xs font-medium text-gray-400 uppercase tracking-widest px-6 py-4"
            >
              SKU
            </th>
            <th
              class="text-left text-xs font-medium text-gray-400 uppercase tracking-widest px-6 py-4"
            >
              Preço
            </th>
            <th
              class="text-left text-xs font-medium text-gray-400 uppercase tracking-widest px-6 py-4"
            >
              Estoque
            </th>
            <th
              class="text-left text-xs font-medium text-gray-400 uppercase tracking-widest px-6 py-4"
            >
              Status
            </th>
            <th class="px-6 py-4" />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in products"
            :key="product.id"
            class="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <!-- Produto -->
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <img
                  v-if="product.images[0]?.url"
                  :src="product.images[0].url"
                  :alt="product.name"
                  class="w-10 h-10 rounded-lg object-cover"
                />
                <div
                  v-else
                  class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center"
                >
                  <Package :size="16" class="text-gray-400" />
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-800 dark:text-white">
                    {{ product.name }}
                  </p>
                  <p class="text-xs text-gray-400">{{ product.slug }}</p>
                </div>
              </div>
            </td>

            <!-- SKU -->
            <td class="px-6 py-4">
              <span
                class="text-xs font-mono text-gray-500 dark:text-gray-400"
                >{{ product.sku }}</span
              >
            </td>

            <!-- Preço -->
            <td class="px-6 py-4">
              <span class="text-sm text-gray-800 dark:text-white">{{
                product.formatedPrice
              }}</span>
            </td>

            <!-- Estoque -->
            <td class="px-6 py-4">
              <span
                :class="[
                  'text-sm font-medium',
                  product.stock > 10
                    ? 'text-green-600'
                    : product.stock > 0
                      ? 'text-yellow-600'
                      : 'text-red-500',
                ]"
              >
                {{ product.stock }}
              </span>
            </td>

            <!-- Status -->
            <td class="px-6 py-4">
              <span
                :class="[
                  'px-2.5 py-1 rounded-full text-xs font-medium',
                  product.isActive
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                    : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
                ]"
              >
                {{ product.isActive ? "Ativo" : "Inativo" }}
              </span>
            </td>

            <!-- Ações -->
            <td class="px-6 py-4">
              <div class="flex items-center gap-2 justify-end">
                <RouterLink
                  :to="`/admin/products/${product.id}/edit`"
                  class="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Pencil
                    :size="14"
                    class="text-gray-400 hover:text-indigo-500"
                  />
                </RouterLink>
                <button
                  class="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-950 transition-colors cursor-pointer border-none bg-transparent"
                  @click="deleteProduct(product.id)"
                >
                  <Trash2 :size="14" class="text-gray-400 hover:text-red-500" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
