import type {
  Category,
  Product,
  ProductQuery,
} from "../types/catalog";
import type {
  Cart,
  Checkout,
  CheckoutData,
  Order,
} from "../types/transaction";

export interface CommerceProvider {
  getProducts(options?: ProductQuery): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  getProduct(identifier: string): Promise<Product | null>;
  getCategories(): Promise<Category[]>;
  getCategory(slug: string): Promise<Category | null>;
  getCart(): Promise<Cart>;
  addToCart(
    productId: string,
    quantity: number,
    variationId?: string,
  ): Promise<Cart>;
  updateCartItem(itemId: string, quantity: number): Promise<Cart>;
  removeFromCart(itemId: string): Promise<Cart>;
  getCheckout(): Promise<Checkout>;
  createOrder(data: CheckoutData): Promise<Order>;
}
