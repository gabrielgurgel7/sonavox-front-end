import { defineStore } from "pinia";
import { Product } from "@/models/product.model";

interface ListProduct {
  product: Product;
  quantity: number;
  price: number;
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    listProduct: [] as ListProduct[],
  }),

  getters: {
    findCardItem: (state) => (product: Product) => {
      return state.listProduct.find((item) => item.product.id === product.id);
    },
    findCardForIndex: (state) => (product: Product) => {
      return state.listProduct.findIndex((item) => item.product.id === product.id);
    },
    getTotal: (state) => {
      return state.listProduct.reduce((acc, item) => {
        return acc + item.product.priceWithDiscountApplied() * item.quantity;
      }, 0);
    },
    formatedTotal: (state) => {
      const total = state.listProduct.reduce((acc, item) => {
        return acc + item.product.priceWithDiscountApplied() * item.quantity;
      }, 0);
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(total);
    },
  },

  actions: {
    incrementItem(product: Product) {
      const existingItem = this.findCardItem(product);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.listProduct.push({ product, quantity: 1, price: 0 });
      }
    },
    decrementItem(product: Product) {
      const existingItem = this.findCardItem(product);
      if (!existingItem) return;
      if (existingItem.quantity > 1) {
        existingItem.quantity--;
      } else {
        const itemIndex = this.findCardForIndex(product);
        this.listProduct.splice(itemIndex, 1);
      }
    },
    removeItem(product: Product) {
      const itemIndex = this.findCardForIndex(product);
      if (itemIndex !== -1) {
        this.listProduct.splice(itemIndex, 1);
      }
    },
  },
});
