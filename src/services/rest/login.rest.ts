import { HttpClient, type IHttp } from "../config/config";

export class LoginRest {
  constructor(private httpClient: IHttp = new HttpClient()) {}

  async loginUser(body: { email: string; password: string }): Promise<unknown> {
    return await this.httpClient.post("/auth/login", body);
  }
}
