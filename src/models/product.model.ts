import type { Image } from "./image.model";
import { Image as ImageModel } from "./image.model";
import type { IProductResponse } from "@/types/api.types";

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

  static fromResponse(product: IProductResponse): Product {
    return new Product(
      product.categoryId,
      product.compareAtPrice,
      product.createdAt,
      product.description,
      product.discount ?? 0,
      product.id,
      product.images.map(
        (img) => new ImageModel(img.id, img.url, img.publicId ?? "", img.isMain ?? true),
      ),
      product.isActive,
      product.name,
      product.price,
      product.shipment ?? "Correios",
      product.sku,
      product.slug,
      product.stock,
      product.stripePriceId ?? "",
      product.stripeProductId ?? "",
      product.updatedAt,
    );
  }

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
