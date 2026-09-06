import type {
  Category,
  Money,
  Product,
  ProductAttribute,
  ProductImage,
  ProductVariant,
} from "@/commerce/core/types";
import type {
  WooCommerceAttribute,
  WooCommerceCategory,
  WooCommerceImage,
  WooCommerceProduct,
  WooCommerceVariation,
} from "./types";

function toMoney(
  value: string | undefined,
  currency = "USD",
  minorUnit = 2,
): Money {
  const amount = Number(value ?? 0);
  return {
    amount: Number.isFinite(amount) ? amount / 10 ** minorUnit : 0,
    currency,
  };
}

export function mapWooCommerceImage(image: WooCommerceImage): ProductImage {
  return {
    id: String(image.id),
    url: image.src,
    alt: image.alt ?? "",
    width: image.width,
    height: image.height,
  };
}

export function mapWooCommerceCategory(
  category: WooCommerceCategory,
): Category {
  return {
    id: String(category.id),
    name: category.name,
    slug: category.slug,
    description: category.description,
    image: category.image ? mapWooCommerceImage(category.image) : undefined,
  };
}

function mapAttribute(attribute: WooCommerceAttribute): ProductAttribute {
  return {
    id: String(attribute.id),
    name: attribute.name,
    options: attribute.options,
    variation: attribute.variation,
  };
}

export function mapWooCommerceVariation(
  variation: WooCommerceVariation,
  currency = "USD",
): ProductVariant {
  return {
    id: String(variation.id),
    name: variation.name ?? "",
    sku: variation.sku || undefined,
    price: toMoney(variation.price, currency),
    compareAtPrice: variation.regular_price
      ? toMoney(variation.regular_price, currency)
      : undefined,
    attributes: Object.fromEntries(
      (variation.attributes ?? []).map((attribute) => [
        attribute.name,
        attribute.option,
      ]),
    ),
    inStock: variation.stock_status === "instock",
    stockQuantity: variation.stock_quantity ?? undefined,
    image: variation.image ? mapWooCommerceImage(variation.image) : undefined,
  };
}

export function findWooCommerceCartVariant(
  product: Product,
  variationId?: number,
  selections: Array<{ attribute: string; value: string }> = [],
): ProductVariant | undefined {
  if (variationId !== undefined) {
    const variant = product.variants.find((candidate) => candidate.id === String(variationId));
    if (variant) return variant;
  }
  if (!selections.length) return undefined;
  return product.variants.find((variant) =>
    selections.every(({ attribute, value }) => {
      const option = variant.attributes[attribute];
      return option === undefined || option === "" || option === value;
    }),
  );
}

export function mapWooCommerceProduct(
  product: WooCommerceProduct,
  variations: WooCommerceVariation[] = [],
): Product {
  const currency = product.prices?.currency_code ?? "USD";
  const minorUnit = product.prices?.currency_minor_unit ?? 2;
  const priceValue = product.prices?.price ?? product.price;
  const regularPrice = product.prices?.regular_price ?? product.regular_price;

  return {
    id: String(product.id),
    slug: product.slug,
    name: product.name,
    description: product.description ?? product.short_description ?? "",
    shortDescription: product.short_description,
    productType: product.type === "variable" || variations.length > 0
      ? "variable"
      : "simple",
    price: {
      amount: Number(priceValue || 0) / 10 ** minorUnit,
      currency,
    },
    compareAtPrice: regularPrice && regularPrice !== priceValue
      ? { amount: Number(regularPrice) / 10 ** minorUnit, currency }
      : undefined,
    images: (product.images ?? []).map(mapWooCommerceImage),
    categories: (product.categories ?? []).map(mapWooCommerceCategory),
    variants: variations.map((variation) =>
      mapWooCommerceVariation(variation, currency),
    ),
    inStock: product.is_in_stock ?? product.stock_status === "instock",
    stockQuantity: product.stock_quantity ?? undefined,
    attributes: (product.attributes ?? []).map(mapAttribute),
    defaultAttributes: product.default_attributes?.length
      ? Object.fromEntries(product.default_attributes.map((attribute) => [attribute.name, attribute.option]))
      : undefined,
  };
}
