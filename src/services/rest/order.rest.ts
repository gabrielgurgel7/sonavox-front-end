import { HttpClient, type IHttp } from "../config/config";
import type { IOrderResponse } from "@/types/api.types";

export class OrderRest {
  constructor(private httpClient: IHttp = new HttpClient()) {}

  create(body: unknown): Promise<unknown> {
    return this.httpClient.post("/orders/checkout", body);
  }

  getMyOrders(): Promise<IOrderResponse[]> {
    return this.httpClient.get("/orders/my") as Promise<IOrderResponse[]>;
  }
}
