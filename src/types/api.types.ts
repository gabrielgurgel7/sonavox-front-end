// src/types/api.types.ts

import type { Shipment } from "@/models/product.model";
import { ShippingAddress } from "@/models/shippingAddress.model";

export interface IImage {
  id: string;
  url: string;
  publicId: string;
  isMain: boolean;
}

export interface IProductResponse {
  categoryId: number;
  compareAtPrice: number;
  createdAt: string;
  description: string;
  discount: number;
  id: string;
  images: IImage[];
  isActive: boolean;
  name: string;
  price: number;
  shipment: Shipment;
  sku: string;
  slug: string;
  stock: number;
  stripePriceId: string;
  stripeProductId: string;
  updatedAt: string;
}

export interface IApiList<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "CUSTOMER";
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthResponse {
  user: IUser;
  tokens: ITokens;
}

export interface IOrderItemResponse {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface IOrderResponse {
  id: string;
  userId: string;
  items: IOrderItemResponse[];
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED";
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  shippingAddress: ShippingAddress;
  stripeSessionId: string;
  stripePaymentIntentId: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
