import type { Category, Product, ProductImage, ProductVariant } from "@/commerce/core/types";
import type { Money, ProductAttribute } from "@/commerce/core/types/catalog";

type RawCategory = Category & { parentId?: string };
type RawProduct = Omit<Product, "categories"> & { categoryIds: string[]; shortDescription?: string };

export interface MockCommerceData {
  settings: { storeName: string; currency: string; currencySymbol: string; locale: string };
  categories: RawCategory[];
  products: RawProduct[];
  customers: Array<{ id: string; email: string; firstName: string; lastName: string }>;
  coupons: Array<{ code: string; type: string; amount: number }>;
}

function money(value: Money, currency: string): Money {
  return { amount: value.amount, currency: value.currency || currency };
}

export function mapMockProduct(raw: RawProduct, categories: RawCategory[], currency: string): Product {
  return {
    id: raw.id,
    slug: raw.slug,
    name: raw.name,
    description: raw.description,
    shortDescription: raw.shortDescription,
    productType: raw.productType ?? (raw.variants.length ? "variable" : "simple"),
    price: money(raw.price, currency),
    compareAtPrice: raw.compareAtPrice ? money(raw.compareAtPrice, currency) : undefined,
    images: raw.images.map((image: ProductImage) => ({ ...image })),
    categories: raw.categoryIds
      .map((categoryId) => categories.find((category) => category.id === categoryId))
      .filter((category): category is RawCategory => Boolean(category))
      .map((category) => {
        const copy = { ...category };
        delete copy.parentId;
        return copy;
      }),
    variants: raw.variants.map((variant: ProductVariant) => ({
      ...variant,
      price: money(variant.price, currency),
      compareAtPrice: variant.compareAtPrice ? money(variant.compareAtPrice, currency) : undefined,
      stockQuantity: variant.stockQuantity,
    })),
    inStock: raw.variants.length
      ? raw.variants.some((variant) => variant.inStock)
      : raw.inStock,
    stockQuantity: raw.stockQuantity,
    attributes: raw.attributes.map((attribute: ProductAttribute) => ({ ...attribute })),
    defaultAttributes: raw.defaultAttributes ? { ...raw.defaultAttributes } : undefined,
    dataQuality: raw.dataQuality,
  };
}

export function mapMockCategories(categories: RawCategory[]): Category[] {
  return categories.map((category) => {
    const copy = { ...category };
    delete copy.parentId;
    return copy;
  });
}
