import { HttpClient, type IHttp } from "../config/config";

export interface ICategoryResponse {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  parentId: string;
  createdAt: string;
  updatedAt: string;
}

export class CategoryRest {
  constructor(private httpClient: IHttp = new HttpClient()) {}

  getAll(): Promise<ICategoryResponse[]> {
    return this.httpClient.get("/categories") as Promise<ICategoryResponse[]>;
  }
}
