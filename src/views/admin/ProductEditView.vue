<script lang="ts">
import { defineComponent } from "vue";
import { ProductRest } from "@/services/rest/product.rest";
import { CategoryRest, type ICategoryResponse } from "@/services/rest/category.rest";
import AppError from "@/components/common/AppError.vue";
import useVuelidate from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";

class ProductForm {
  name = "";
  description = "";
  price = 0;
  compareAtPrice = 0;
  stock = 0;
  sku = "";
  categoryId = "";
}

export default defineComponent({
  components: { AppError },
  data() {
    return {
      form: new ProductForm(),
      categories: [] as ICategoryResponse[],
      imageFile: null as File | null,
      currentImage: "" as string,
      loading: false,
      loadingPage: true,
      productRest: new ProductRest(),
      categoryRest: new CategoryRest(),
      inputClass:
        "h-10 w-full px-3 rounded-xl border border-gray-200 text-sm text-gray-800 outline-none focus:border-indigo-400 transition-colors bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700",
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      form: {
        name: { required },
        price: { required, minValue: minValue(0.01) },
        stock: { required, minValue: minValue(0) },
        sku: { required },
        categoryId: { required },
      },
    };
  },
  methods: {
    async getCategories() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = (await this.categoryRest.getAll()) as any;

      this.categories = res.data;
    },
    async getProduct() {
      const id = this.$route.params.id as string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = (await this.productRest.getById(id)) as any;
      const product = res.data ?? res;
      this.form.name = product.name;
      this.form.description = product.description;
      this.form.price = product.price;
      this.form.compareAtPrice = product.compareAtPrice;
      this.form.stock = product.stock;
      this.form.sku = product.sku;
      this.form.categoryId = product.categoryId;
      this.currentImage =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        product.images?.find((i: any) => i.isMain)?.url ?? product.images?.[0]?.url ?? "";
      this.loadingPage = false;
    },
    onFileChange(e: Event) {
      const target = e.target as HTMLInputElement;
      this.imageFile = target.files?.[0] ?? null;
    },
    async submitProduct() {
      this.v$.$validate();
      if (this.v$.$invalid) return;

      this.loading = true;
      const id = this.$route.params.id as string;

      try {
        const payload = {
          ...this.form,
          price: Number(this.form.price),
          compareAtPrice: Number(this.form.compareAtPrice),
          stock: Number(this.form.stock),
        };

        await this.productRest.update(id, payload);

        if (this.imageFile) {
          await this.productRest.uploadImage(id, this.imageFile);
        }

        this.$router.push("/admin/products");
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.getCategories();
    this.getProduct();
  },
});
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-800 dark:text-white">Editar produto</h1>
      <p class="text-sm text-gray-400 mt-1">Atualize os dados do produto</p>
    </div>

    <div v-if="loadingPage" class="text-sm text-gray-400 text-center py-12">Carregando...</div>

    <form v-else @submit.prevent="submitProduct" class="flex flex-col gap-4">
      <div
        class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col gap-4"
      >
        <p class="text-sm font-semibold text-gray-700 dark:text-white">Informações básicas</p>

        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-gray-600 dark:text-gray-300">Nome</label>
          <PrimeInputText
            v-model="form.name"
            unstyled
            :pt="{ root: inputClass }"
            placeholder="Ex: Guitarra Fender Stratocaster"
          />
          <AppError :field="v$.form.name" />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-gray-600 dark:text-gray-300">Descrição</label>
          <textarea
            v-model="form.description"
            class="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-800 dark:text-white outline-none focus:border-indigo-400 transition-colors bg-white dark:bg-gray-800 resize-none"
            rows="3"
            placeholder="Descreva o produto..."
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-gray-600 dark:text-gray-300">Categoria</label>
          <select
            v-model="form.categoryId"
            class="h-10 w-full px-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-800 dark:text-white outline-none focus:border-indigo-400 transition-colors bg-white dark:bg-gray-800"
          >
            <option value="" disabled>Selecione uma categoria</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
          <AppError :field="v$.form.categoryId" />
        </div>
      </div>

      <div
        class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col gap-4"
      >
        <p class="text-sm font-semibold text-gray-700 dark:text-white">Preço e estoque</p>

        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-600 dark:text-gray-300">Preço (R$)</label>
            <PrimeInputText
              v-model="form.price"
              type="number"
              step="0.01"
              unstyled
              :pt="{ root: inputClass }"
              placeholder="0,00"
            />
            <AppError :field="v$.form.price" />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-600 dark:text-gray-300"
              >Preço original (R$)</label
            >
            <PrimeInputText
              v-model="form.compareAtPrice"
              type="number"
              step="0.01"
              unstyled
              :pt="{ root: inputClass }"
              placeholder="0,00"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-600 dark:text-gray-300">Estoque</label>
            <PrimeInputText
              v-model="form.stock"
              type="number"
              unstyled
              :pt="{ root: inputClass }"
              placeholder="0"
            />
            <AppError :field="v$.form.stock" />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-600 dark:text-gray-300">SKU</label>
            <PrimeInputText
              v-model="form.sku"
              unstyled
              :pt="{ root: inputClass }"
              placeholder="Ex: GTR-FENDER-001"
            />
            <AppError :field="v$.form.sku" />
          </div>
        </div>
      </div>

      <div
        class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col gap-4"
      >
        <p class="text-sm font-semibold text-gray-700 dark:text-white">Imagem do produto</p>

        <!-- Imagem atual -->
        <div v-if="currentImage" class="flex items-center gap-4">
          <img :src="currentImage" class="w-20 h-20 rounded-xl object-contain bg-gray-50" />
          <p class="text-sm text-gray-400">
            Imagem atual. Selecione um novo arquivo para substituir.
          </p>
        </div>

        <input
          type="file"
          accept="image/*"
          class="text-sm text-gray-500 dark:text-gray-400"
          @change="onFileChange"
        />
      </div>

      <div class="flex gap-3">
        <RouterLink
          to="/admin/products"
          class="flex-1 h-10 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Cancelar
        </RouterLink>
        <PrimeButton
          unstyled
          type="submit"
          :loading="loading"
          class="flex-1 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors cursor-pointer border-none"
          label="Salvar alterações"
        />
      </div>
    </form>
  </div>
</template>
