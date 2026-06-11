import { HttpClient, type IHttp } from "../config/config";

import type { IAuthResponse } from "@/types/api.types";

export class LoginRest {
  constructor(private httpClient: IHttp = new HttpClient()) {}

  async loginUser(body: { email: string; password: string }): Promise<IAuthResponse> {
    return (await this.httpClient.post("/auth/login", body)) as IAuthResponse;
  }
}
