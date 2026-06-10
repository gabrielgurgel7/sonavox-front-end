import { api } from ".";

export interface IHttp {
  get(path: string, params?: unknown, baseURL?: string): Promise<unknown>;
  post(path: string, body: unknown, baseURL?: string): Promise<unknown>;
  put(path: string, body: unknown, baseURL?: string): Promise<unknown>;
  delete(path: string, params?: unknown, baseURL?: string): Promise<unknown>;
}

export class HttpClient implements IHttp {
  async get(path: string, params?: unknown, baseURL?: string): Promise<unknown> {
    return api.get(path, { params, baseURL }).then((res) => res.data.data);
  }

  async post(path: string, body: unknown, baseURL?: string): Promise<unknown> {
    return api.post(path, body, { baseURL }).then((res) => res.data.data);
  }

  async put(path: string, body: unknown, baseURL?: string): Promise<unknown> {
    return api.put(path, body, { baseURL }).then((res) => res.data.data);
  }

  async delete(path: string, params?: unknown, baseURL?: string): Promise<unknown> {
    return api.delete(path, { params, baseURL }).then((res) => res.data.data);
  }
}

export const httpClient = new HttpClient();
