import { ShippingAddress } from "./shippingAddress.model";

export interface CheckoutItem {
  productId: string;
  quantity: number;
}

export class Order {
  constructor(
    public items: CheckoutItem[] = [],
    public shippingAddress: ShippingAddress = new ShippingAddress(),
    public successUrl: string = "",
    public cancelUrl: string = "",
    public notes?: string,
  ) {}
}
