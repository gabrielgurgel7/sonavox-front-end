import { Category } from "./category.model";

export enum Shipment {
  FREE = "Grátis",
  CORREIOS = "Correios",
  PAC = "PAC",
}

export class Product {
  constructor(
    public id: number,
    public img: string,
    public name: string,
    public description: string,
    public price: number,
    public category: Category,
    public discount: number,
    public isActived: boolean,
    public shipment: Shipment,
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
