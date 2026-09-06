export interface Money {
  amount: number;
  currency: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: ProductImage;
}

export interface ProductAttribute {
  id: string;
  name: string;
  options: string[];
  variation?: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku?: string;
  price: Money;
  compareAtPrice?: Money;
  attributes: Record<string, string>;
  inStock: boolean;
  stockQuantity?: number;
  image?: ProductImage;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription?: string;
  productType?: "simple" | "variable";
  price: Money;
  compareAtPrice?: Money;
  images: ProductImage[];
  categories: Category[];
  variants: ProductVariant[];
  inStock: boolean;
  stockQuantity?: number;
  attributes: ProductAttribute[];
  defaultAttributes?: Record<string, string>;
  dataQuality?: {
    prices: "demo" | "verified";
    availability: "demo" | "verified";
  };
}

export interface ProductQuery {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  attributes?: Record<string, string[]>;
  inStock?: boolean;
}
