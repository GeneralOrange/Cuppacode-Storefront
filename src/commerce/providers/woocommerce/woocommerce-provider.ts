import type { CommerceProvider } from "@/commerce/core/interfaces/commerce-provider";
import { CommerceError } from "@/commerce/core/errors/commerce-error";
import type { Category, Product, ProductQuery } from "@/commerce/core/types/catalog";
import type { Cart, Checkout, CheckoutData, Order } from "@/commerce/core/types/transaction";
import { WooCommerceClient } from "./woocommerce-client";
import {
  findWooCommerceCartVariant,
  mapWooCommerceCategory,
  mapWooCommerceProduct,
} from "./woocommerce-mappers";

export class WooCommerceProvider implements CommerceProvider {
  private readonly client: WooCommerceClient;

  constructor(cartToken?: string) {
    this.client = new WooCommerceClient(cartToken);
  }

  async getProducts(options: ProductQuery = {}): Promise<Product[]> {
    const params = new URLSearchParams();
    if (options.search) params.set("search", options.search);
    if (options.category) params.set("category", options.category);
    if (options.page) params.set("page", String(options.page));
    if (options.limit) params.set("per_page", String(options.limit));
    if (options.minPrice !== undefined) params.set("min_price", String(options.minPrice));
    if (options.maxPrice !== undefined) params.set("max_price", String(options.maxPrice));
    if (options.inStock) params.set("stock_status", "instock");

    const products = await this.client.getProducts(
      params.size ? `?${params.toString()}` : "",
    );
    return Promise.all(
      products.map(async (product) =>
        mapWooCommerceProduct(
          product,
          product.variations?.length
            ? await this.client.getVariations(String(product.id))
            : [],
        ),
      ),
    );
  }

  searchProducts(query: string): Promise<Product[]> {
    return this.getProducts({ search: query });
  }

  async getProduct(identifier: string): Promise<Product | null> {
    try {
      const product = await this.client.getProduct(identifier);
      const variations = product.variations?.length
        ? await this.client.getVariations(String(product.id))
        : [];
      return mapWooCommerceProduct(product, variations);
    } catch (error) {
      if (error instanceof CommerceError && error.code === "NOT_FOUND") return null;
      throw error;
    }
  }

  async getCategories(): Promise<Category[]> {
    const categories = await this.client.getCategories();
    return categories.map(mapWooCommerceCategory);
  }

  async getCategory(slug: string): Promise<Category | null> {
    const categories = await this.getCategories();
    return categories.find((category) => category.slug === slug) ?? null;
  }

  async getCart(): Promise<Cart> {
    const cart = await this.client.getCart();
    const currency = cart.totals?.currency_code ?? "USD";
    const minorUnit = cart.totals?.currency_minor_unit ?? 2;
    const items = await Promise.all((cart.items ?? []).map(async (item) => {
      const product = await this.getProduct(String(item.id));
      if (!product) return null;
      const variant = findWooCommerceCartVariant(
        product,
        item.variation_id,
        item.variation,
      );
      const unitPrice = Number(item.prices?.price ?? 0) / 10 ** (item.prices?.currency_minor_unit ?? minorUnit);
      const subtotal = Number(item.totals?.line_subtotal ?? 0) / 10 ** (item.totals?.currency_minor_unit ?? minorUnit);
      return {
        id: item.key,
        product,
        variant,
        quantity: item.quantity,
        unitPrice: { amount: unitPrice, currency: item.prices?.currency_code ?? currency },
        subtotal: { amount: subtotal, currency: item.totals?.currency_code ?? currency },
      };
    }));
    const toMoney = (value: string | undefined) => ({ amount: Number(value ?? 0) / 10 ** minorUnit, currency });
    return {
      items: items.filter((item): item is NonNullable<typeof item> => item !== null),
      itemCount: cart.items?.reduce((count, item) => count + item.quantity, 0) ?? 0,
      totals: {
        subtotal: toMoney(cart.totals?.total_items),
        shipping: toMoney(cart.totals?.total_shipping),
        discount: toMoney(cart.totals?.total_discount),
        total: toMoney(cart.totals?.total_price),
      },
    };
  }

  async addToCart(productId: string, quantity: number, variationId?: string): Promise<Cart> {
    await this.client.addToCart(productId, quantity, variationId);
    return this.getCart();
  }

  async updateCartItem(itemId: string, quantity: number): Promise<Cart> {
    await this.client.updateCartItem(itemId, quantity);
    return this.getCart();
  }

  async removeFromCart(itemId: string): Promise<Cart> {
    await this.client.removeCartItem(itemId);
    return this.getCart();
  }

  async getCheckout(): Promise<Checkout> {
    return { cart: await this.getCart() };
  }

  async createOrder(data: CheckoutData): Promise<Order> {
    const response = await this.client.checkout({
      billing_address: {
        first_name: data.billingAddress.firstName,
        last_name: data.billingAddress.lastName,
        company: data.billingAddress.company ?? "",
        address_1: data.billingAddress.address1,
        address_2: data.billingAddress.address2 ?? "",
        city: data.billingAddress.city,
        state: data.billingAddress.state ?? "",
        postcode: data.billingAddress.postalCode,
        country: data.billingAddress.country,
        phone: data.billingAddress.phone ?? "",
        email: data.email,
      },
      shipping_address: data.shippingAddress ? {
        first_name: data.shippingAddress.firstName,
        last_name: data.shippingAddress.lastName,
        address_1: data.shippingAddress.address1,
        address_2: data.shippingAddress.address2 ?? "",
        city: data.shippingAddress.city,
        state: data.shippingAddress.state ?? "",
        postcode: data.shippingAddress.postalCode,
        country: data.shippingAddress.country,
      } : undefined,
      customer_note: data.notes,
      payment_method: data.paymentMethodId,
    });
    const currency = response.totals?.currency_code ?? "USD";
    const minorUnit = response.totals?.currency_minor_unit ?? 2;
    const money = (value: string | undefined) => ({ amount: Number(value ?? 0) / 10 ** minorUnit, currency });
    return {
      id: String(response.order_id),
      number: String(response.order_id),
      status: response.status,
      totals: {
        subtotal: money(response.totals?.total_items),
        shipping: money(response.totals?.total_shipping),
        discount: money(response.totals?.total_discount),
        total: money(response.totals?.total_price),
      },
    };
  }
}
