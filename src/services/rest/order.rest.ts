import { HttpClient, type IHttp } from "../config/config";

export class OrderRest {
  constructor(private httpClient: IHttp = new HttpClient()) {}

  create(body: unknown): Promise<{ data: { url: string } }> {
    return this.httpClient.post("/orders", body) as Promise<{ data: { url: string } }>;
  }
}
