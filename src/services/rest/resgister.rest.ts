// import { HttpClient, type IHttp } from "../config/config";
// export class RegisterRest {
//   constructor(private httpClient: IHttp = new HttpClient()) {}

//   registerUser(body: { name: string; email: string; password: string }): Promise<unknown> {
//     const path = "/auth/register";
//     return this.httpClient.post(path, body);
//   }
// }

export class RegisterRest {
  registerUser(body: unknown): Promise<unknown> {
    return Promise.resolve({
      data: { message: "Usuário registrado com sucesso", body },
    });
  }
}
