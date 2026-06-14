import type { ShippingAddress } from "@/models/shippingAddress.model";
import type { ListProduct } from "@/stores/cart";
import { OrderRest } from "@/services/rest/order.rest";

export class CheckOutService {
  constructor(private orderRest: OrderRest = new OrderRest()) {}

  createOrder(items: ListProduct[], address: ShippingAddress) {
    const data = {
      shippingAddress: address,
      items: items.map((i) => ({
        productId: i.product.id,
        quantity: i.quantity,
      })),
    };
    return this.orderRest.create(data);
  }
}
