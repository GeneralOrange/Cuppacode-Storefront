import type { Product, ProductVariant } from "./types";

function matchesAttributes(
  variant: ProductVariant,
  attributes: Record<string, string>,
): boolean {
  return Object.entries(attributes).every(([name, value]) => {
    const option = variant.attributes[name];
    return option === undefined || option === "" || option === value;
  });
}

export function getVariantForSelections(
  product: Product,
  selections: Record<string, string>,
): ProductVariant | undefined {
  const variationAttributes = product.attributes.filter(
    (attribute) => attribute.variation !== false,
  );
  if (!variationAttributes.length) return undefined;
  if (!variationAttributes.every((attribute) => selections[attribute.name])) {
    return undefined;
  }
  const selectedAttributes = Object.fromEntries(
    variationAttributes.map((attribute) => [attribute.name, selections[attribute.name]]),
  );
  return product.variants.find((variant) => matchesAttributes(variant, selectedAttributes));
}

export function hasVariantForOption(
  product: Product,
  attributeName: string,
  option: string,
  selections: Record<string, string>,
): boolean {
  const candidateSelections = {
    ...Object.fromEntries(
      product.attributes
        .filter((attribute) => attribute.variation !== false && attribute.name !== attributeName)
        .map((attribute) => [attribute.name, selections[attribute.name]])
        .filter(([, value]) => Boolean(value)),
    ),
    [attributeName]: option,
  };
  return product.variants.some((variant) => matchesAttributes(variant, candidateSelections));
}

export function getProductPriceRange(product: Product): {
  minimum: number;
  maximum: number;
} {
  if (!product.variants.length) {
    return { minimum: product.price.amount, maximum: product.price.amount };
  }

  const prices = product.variants.map((variant) => variant.price.amount);
  return { minimum: Math.min(...prices), maximum: Math.max(...prices) };
}
