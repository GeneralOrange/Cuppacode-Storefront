import type { Money, Product, ProductVariant } from "./catalog";

export interface CartItem {
  id: string;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  unitPrice: Money;
  subtotal: Money;
}

export interface CartTotals {
  subtotal: Money;
  shipping?: Money;
  discount?: Money;
  total: Money;
}

export interface Cart {
  items: CartItem[];
  totals: CartTotals;
  itemCount: number;
}

export interface Checkout {
  cart: Cart;
  availableShippingMethods?: ShippingMethod[];
  availablePaymentMethods?: PaymentMethod[];
}

export interface ShippingMethod {
  id: string;
  label: string;
  price: Money;
}

export interface PaymentMethod {
  id: string;
  label: string;
}

export interface CheckoutData {
  billingAddress: Address;
  shippingAddress?: Address;
  email: string;
  shippingMethodId?: string;
  paymentMethodId?: string;
  notes?: string;
}

export interface Address {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface Order {
  id: string;
  number: string;
  status: string;
  paymentStatus?: string;
  items?: CartItem[];
  customer?: {
    email: string;
    billingAddress: Address;
    shippingAddress?: Address;
  };
  totals: CartTotals;
}
