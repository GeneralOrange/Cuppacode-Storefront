import type { CommerceProvider } from "@/commerce/core/interfaces/commerce-provider";
import { CommerceError } from "@/commerce/core/errors/commerce-error";
import type { Category, Product, ProductQuery, ProductVariant } from "@/commerce/core/types/catalog";
import type { Cart, CartItem, Checkout, CheckoutData, Order } from "@/commerce/core/types/transaction";
import data from "@/data/commerce.json";
import germatData from "@/data/germat-commerce.json";
import type { StorefrontKey } from "@/config/theme";
import { mapMockCategories, mapMockProduct, type MockCommerceData } from "./mock-mappers";

const novaMockData = data as MockCommerceData;
const germatMockData = germatData as MockCommerceData;
const carts = new Map<string, Map<string, { productId: string; variantId?: string; quantity: number }>>();
const orders = new Map<string, Order>();
let nextOrderNumber = 10001;

function round(amount: number): number {
  return Math.round(amount * 100) / 100;
}

export class MockCommerceProvider implements CommerceProvider {
  private readonly cartKey: string;
  private readonly categories: Category[];
  private readonly products: Product[];
  private readonly currency: string;

  constructor(cartToken = "anonymous", storefront: StorefrontKey = "nova") {
    this.cartKey = `${storefront}:${cartToken}`;
    const mockData = storefront === "germat" ? germatMockData : novaMockData;
    this.currency = mockData.settings.currency;
    this.categories = mapMockCategories(mockData.categories);
    this.products = mockData.products.map((product) => mapMockProduct(product, mockData.categories, mockData.settings.currency));
    if (!carts.has(this.cartKey)) carts.set(this.cartKey, new Map());
  }

  private findProduct(identifier: string): Product | undefined {
    return this.products.find((product) => product.id === identifier || product.slug === identifier);
  }

  private findVariant(product: Product, variationId?: string): ProductVariant | undefined {
    return variationId ? product.variants.find((variant) => variant.id === variationId) : undefined;
  }

  private buildCart(): Cart {
    const storedItems = carts.get(this.cartKey) ?? new Map();
    const items: CartItem[] = [];
    for (const [id, stored] of storedItems) {
      const product = this.findProduct(stored.productId);
      if (!product) continue;
      const variant = this.findVariant(product, stored.variantId);
      const unitPrice = variant?.price ?? product.price;
      items.push({
        id,
        product,
        variant,
        quantity: stored.quantity,
        unitPrice,
        subtotal: { amount: round(unitPrice.amount * stored.quantity), currency: unitPrice.currency },
      });
    }
    const subtotal = round(items.reduce((total, item) => total + item.subtotal.amount, 0));
    const money = (amount: number) => ({ amount: round(amount), currency: this.currency });
    return {
      items,
      itemCount: items.reduce((total, item) => total + item.quantity, 0),
      totals: { subtotal: money(subtotal), total: money(subtotal) },
    };
  }

  async getProducts(options: ProductQuery = {}): Promise<Product[]> {
    let products = [...this.products];
    const search = options.search?.trim().toLowerCase();
    if (search) products = products.filter((product) => [product.name, product.slug, product.description, ...product.categories.map((category) => category.name)].some((value) => value.toLowerCase().includes(search)));
    if (options.category) products = products.filter((product) => product.categories.some((category) => category.id === options.category || category.slug === options.category));
    if (options.minPrice !== undefined) products = products.filter((product) => Math.max(product.price.amount, ...product.variants.map((variant) => variant.price.amount)) >= options.minPrice!);
    if (options.maxPrice !== undefined) products = products.filter((product) => Math.min(product.price.amount, ...product.variants.map((variant) => variant.price.amount)) <= options.maxPrice!);
    if (options.inStock) products = products.filter((product) => product.variants.length ? product.variants.some((variant) => variant.inStock) : product.inStock);
    if (options.attributes) products = products.filter((product) => Object.entries(options.attributes!).every(([name, values]) => product.attributes.some((attribute) => attribute.name === name && values.some((value) => attribute.options.includes(value)))));
    const page = Math.max(1, options.page ?? 1);
    const limit = options.limit ? Math.max(1, options.limit) : products.length;
    return products.slice((page - 1) * limit, page * limit);
  }

  searchProducts(query: string): Promise<Product[]> {
    return this.getProducts({ search: query });
  }

  async getProduct(identifier: string): Promise<Product | null> {
    return this.findProduct(identifier) ?? null;
  }

  async getCategories(): Promise<Category[]> {
    return this.categories;
  }

  async getCategory(slug: string): Promise<Category | null> {
    return this.categories.find((category) => category.slug === slug) ?? null;
  }

  async getCart(): Promise<Cart> {
    return this.buildCart();
  }

  async addToCart(productId: string, quantity: number, variationId?: string): Promise<Cart> {
    if (!Number.isInteger(quantity) || quantity < 1) throw new CommerceError("Quantity must be at least one", "VALIDATION_ERROR", 400);
    const product = this.findProduct(productId);
    if (!product) throw new CommerceError("Product not found", "NOT_FOUND", 404);
    if (product.variants.length && !variationId) {
      throw new CommerceError("Select a product variant before adding it to the cart", "VALIDATION_ERROR", 400);
    }
    const variant = this.findVariant(product, variationId);
    if (variationId && !variant) throw new CommerceError("Product variant not found", "NOT_FOUND", 404);
    if (!(variant?.inStock ?? product.inStock)) throw new CommerceError("Product is out of stock", "VALIDATION_ERROR", 409);
    const key = `${product.id}:${variationId ?? "default"}`;
    const cart = carts.get(this.cartKey)!;
    const current = cart.get(key);
    const nextQuantity = (current?.quantity ?? 0) + quantity;
    const stockLimit = variant?.stockQuantity ?? product.stockQuantity;
    if (stockLimit !== undefined && nextQuantity > stockLimit) {
      throw new CommerceError("Requested quantity exceeds available stock", "VALIDATION_ERROR", 409);
    }
    cart.set(key, { productId, variantId: variationId, quantity: nextQuantity });
    return this.buildCart();
  }

  async updateCartItem(itemId: string, quantity: number): Promise<Cart> {
    if (!Number.isInteger(quantity) || quantity < 1) throw new CommerceError("Quantity must be at least one", "VALIDATION_ERROR", 400);
    const cart = carts.get(this.cartKey)!;
    if (!cart.has(itemId)) throw new CommerceError("Cart item not found", "NOT_FOUND", 404);
    const stored = cart.get(itemId)!;
    const product = this.findProduct(stored.productId);
    const variant = product ? this.findVariant(product, stored.variantId) : undefined;
    const stockLimit = variant?.stockQuantity ?? product?.stockQuantity;
    if (stockLimit !== undefined && quantity > stockLimit) {
      throw new CommerceError("Requested quantity exceeds available stock", "VALIDATION_ERROR", 409);
    }
    cart.set(itemId, { ...stored, quantity });
    return this.buildCart();
  }

  async removeFromCart(itemId: string): Promise<Cart> {
    carts.get(this.cartKey)!.delete(itemId);
    return this.buildCart();
  }

  async getCheckout(): Promise<Checkout> {
    return {
      cart: this.buildCart(),
      availableShippingMethods: [{ id: "mock-standard", label: "Demo delivery", price: { amount: 0, currency: this.currency } }],
      availablePaymentMethods: [{ id: "mock-payment", label: "Demo only" }],
    };
  }

  async createOrder(data: CheckoutData): Promise<Order> {
    const cart = this.buildCart();
    if (!cart.items.length) throw new CommerceError("Cannot create an order from an empty cart", "VALIDATION_ERROR", 400);
    const number = `MOCK-${nextOrderNumber++}`;
    const order: Order = { id: number, number, status: "demo", paymentStatus: "not_processed", items: cart.items, customer: { email: data.email, billingAddress: data.billingAddress, shippingAddress: data.shippingAddress }, totals: cart.totals };
    orders.set(number, order);
    carts.get(this.cartKey)!.clear();
    return order;
  }
}
