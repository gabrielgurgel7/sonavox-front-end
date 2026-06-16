import { HttpClient, type IHttp } from "../config/config";
import type { IProductResponse } from "@/types/api.types";

export class ProductRest {
  constructor(private httpClient: IHttp = new HttpClient()) {}

  getAll(_params: unknown): Promise<{ data: IProductResponse[] }> {
    return this.httpClient.get("/products") as Promise<{ data: IProductResponse[] }>;
  }

  getById(id: string): Promise<{ data: IProductResponse }> {
    return this.httpClient.get(`/products/${id}`) as Promise<{ data: IProductResponse }>;
  }

  create(body: unknown): Promise<unknown> {
    return this.httpClient.post("/products", body);
  }

  uploadImage(productId: string, file: File): Promise<unknown> {
    const formData = new FormData();
    formData.append("image", file);
    return this.httpClient.post(`/products/${productId}/images`, formData);
  }

  delete(id: string): Promise<unknown> {
    return this.httpClient.delete(`/products/${id}`);
  }

  update(id: string, body: unknown): Promise<unknown> {
    return this.httpClient.put(`/products/${id}`, body);
  }
}
