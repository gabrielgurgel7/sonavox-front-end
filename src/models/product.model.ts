import type { Image } from "./image.model";

export enum Shipment {
  FREE = "Grátis",
  CORREIOS = "Correios",
  PAC = "PAC",
}

export class Product {
  constructor(
    public categoryId: number,
    public compareAtPrice: number,
    public createdAt: string,
    public description: string,
    public discount: number,
    public id: string,
    public images: Image[] = [],
    public isActive: boolean,
    public name: string,
    public price: number,
    public shipment: Shipment,
    public sku: string,
    public slug: string,
    public stock: number,
    public stripePriceId: string,
    public stripeProductId: string,
    public updatedAt: string,
  ) {}

  displayDiscount(): number {
    return Math.round(this.discount * 100);
  }

  priceWithDiscountApplied(): number {
    if (this.discount > 0) {
      return this.price * (1 - this.discount);
    }
    return this.price; // se não tem desconto, retorna o preço normal
  }

  get formatedPrice(): string {
    const price = this.priceWithDiscountApplied();

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  }
}
