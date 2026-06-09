import productsData from "@/data/productsData.json";
import { Image } from "@/models/image.model";

// export class ProductRest {
//   getAll(params: unknown) {
//     const path = "/products";
//     return httpClient.get(path, params);
//   }
// }

export class ProductRest {
  getAll(_params: unknown): Promise<unknown> {
    return Promise.resolve({
      data: {
        data: productsData.map((p) => ({
          ...p,
          images: p.images.map((url: string) => new Image(crypto.randomUUID(), url, "", true)),
        })), // ← fechamento do productsData.map
      },
    });
  }
}
