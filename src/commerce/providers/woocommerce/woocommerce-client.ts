import "server-only";

import { getCommerceConfig } from "@/config/commerce";
import { CommerceError } from "@/commerce/core/errors/commerce-error";
import type {
  WooCommerceCategory,
  WooCommerceProduct,
  WooCommerceVariation,
} from "./types";

export interface WooCommerceCartResponse {
  items?: Array<{
    key: string;
    id: number;
    variation_id?: number;
    quantity: number;
    name: string;
    variation?: Array<{ attribute: string; value: string }>;
    prices?: { price: string; currency_code?: string; currency_minor_unit?: number };
    totals?: { line_subtotal: string; currency_code?: string; currency_minor_unit?: number };
  }>;
  totals?: {
    total_items: string;
    total_shipping: string;
    total_discount: string;
    total_price: string;
    currency_code?: string;
    currency_minor_unit?: number;
  };
}

export interface WooCommerceCheckoutResponse {
  order_id: number;
  order_key?: string;
  status: string;
  totals?: WooCommerceCartResponse["totals"];
}

export class WooCommerceClient {
  private readonly baseUrl: string;
  private readonly headers: HeadersInit;

  constructor(private readonly cartToken?: string) {
    const config = getCommerceConfig();
    this.baseUrl = `${config.baseUrl}/wp-json/wc/store/v1`;
    this.headers = {
      Accept: "application/json",
      ...(cartToken ? { "Cart-Token": cartToken } : {}),
    };
  }

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    let response: Response;

    try {
      response = await fetch(`${this.baseUrl}${path}`, {
        ...init,
        headers: { ...this.headers, ...init?.headers },
        next: { revalidate: 60 },
      });
    } catch {
      throw new CommerceError("Unable to reach the commerce platform", "NETWORK_ERROR");
    }

    if (!response.ok) {
      throw new CommerceError(
        `Commerce API request failed with status ${response.status}`,
        response.status === 404 ? "NOT_FOUND" : "UNKNOWN_ERROR",
        response.status,
      );
    }

    return response.json() as Promise<T>;
  }

  getProducts(query = ""): Promise<WooCommerceProduct[]> {
    return this.request(`/products${query}`);
  }

  getProduct(identifier: string): Promise<WooCommerceProduct> {
    return this.request<WooCommerceProduct[]>(`/products?slug=${encodeURIComponent(identifier)}`)
      .then((products) => {
        const product = products[0];
        if (!product) {
          throw new CommerceError("Product not found", "NOT_FOUND", 404);
        }
        return product;
      });
  }

  getCategories(): Promise<WooCommerceCategory[]> {
    return this.request("/products/categories");
  }

  getVariations(productId: string): Promise<WooCommerceVariation[]> {
    return this.request(`/products/${encodeURIComponent(productId)}/variations`);
  }

  getCart(): Promise<WooCommerceCartResponse> {
    return this.request("/cart", { cache: "no-store" });
  }

  addToCart(productId: string, quantity: number, variationId?: string) {
    const params = new URLSearchParams({
      id: productId,
      quantity: String(quantity),
    });
    if (variationId) params.set("variation_id", variationId);

    return this.request<WooCommerceCartResponse>(`/cart/add-item?${params}`, {
      method: "POST",
      cache: "no-store",
    });
  }

  updateCartItem(itemKey: string, quantity: number) {
    return this.request<WooCommerceCartResponse>(`/cart/update-item`, {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: itemKey, quantity }),
    });
  }

  removeCartItem(itemKey: string) {
    return this.request<WooCommerceCartResponse>(`/cart/remove-item`, {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: itemKey }),
    });
  }

  checkout(data: unknown) {
    return this.request<WooCommerceCheckoutResponse>("/checkout", {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }
}
