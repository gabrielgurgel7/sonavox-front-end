import { HttpClient, type IHttp } from "../config/config";

import type { IAuthResponse } from "@/types/api.types";

export class RegisterRest {
  constructor(private httpClient: IHttp = new HttpClient()) {}

  async registerUser(body: {
    name: string;
    email: string;
    password: string;
  }): Promise<IAuthResponse> {
    return (await this.httpClient.post("/auth/register", body)) as IAuthResponse;
  }
}
