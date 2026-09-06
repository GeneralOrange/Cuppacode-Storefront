export interface WooCommerceImage {
  id: number;
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface WooCommerceCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: WooCommerceImage | null;
}

export interface WooCommerceAttribute {
  id: number;
  name: string;
  variation?: boolean;
  options: string[];
}

export interface WooCommerceVariation {
  id: number;
  name?: string;
  sku?: string;
  price: string;
  regular_price?: string;
  sale_price?: string;
  stock_status?: string;
  stock_quantity?: number | null;
  attributes?: Array<{ id: number; name: string; option: string }>;
  image?: WooCommerceImage;
}

export interface WooCommerceProduct {
  id: number;
  slug: string;
  name: string;
  description?: string;
  short_description?: string;
  default_attributes?: Array<{ id: number; name: string; option: string }>;
  price: string;
  regular_price?: string;
  sale_price?: string;
  prices?: {
    price: string;
    regular_price: string;
    sale_price: string;
    currency_code: string;
    currency_minor_unit: number;
  };
  images?: WooCommerceImage[];
  categories?: WooCommerceCategory[];
  attributes?: WooCommerceAttribute[];
  variations?: number[];
  is_in_stock?: boolean;
  stock_status?: string;
  type?: string;
  stock_quantity?: number | null;
}
