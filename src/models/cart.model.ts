import { Product } from "./product.model.js";

export interface ListProduct {
  product: Product;
  quantity: number;
  price: number;
}

export class Cart {
  // ListProduct vai ser uma lista com vários produtos
  constructor(public listProduct: ListProduct[] = []) {}
  // = [] é que incia zerada

  // Método para saber se o item já existe na lista:
  findCardItem(product: Product) {
    return this.listProduct.find((item) => item.product.name === product.name);
    // O método find retorna também o valor do item
  }

  findCardForIndex(product: Product) {
    return this.listProduct.findIndex((item) => item.product.name === product.name);
  }

  addOneItem(product: Product) {
    const existingItem = this.findCardItem(product);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.listProduct.push({
        product: product,
        quantity: 1,
        price: 0,
      });
    }
  }

  removeOneItem(product: Product) {
    const existingItem = this.findCardItem(product);
    if (!existingItem) return; // Retorna se não encontrar o item
    if (existingItem.quantity > 1) {
      existingItem.quantity--;
    } else {
      const itemIndex = this.findCardForIndex(product);
      this.listProduct.splice(itemIndex, 1);
    }
  }

  removeItem(product: Product) {
    const itemIndex = this.findCardForIndex(product);
    if (itemIndex !== -1) {
      this.listProduct.splice(itemIndex, 1);
    }
  }

  getTotal(): number {
    return this.listProduct.reduce((acc, item) => {
      return acc + item.product.priceWithDiscountApplied() * item.quantity;
    }, 0);
  }

  get formatedTotal(): string {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(this.getTotal());
  }
}
