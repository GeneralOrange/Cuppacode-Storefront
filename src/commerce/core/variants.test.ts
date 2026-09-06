import { describe, expect, it } from "vitest";
import type { Product } from "./types";
import { getProductPriceRange, getVariantForSelections, hasVariantForOption } from "./variants";

const product: Product = {
  id: "demo",
  slug: "demo",
  name: "Demo product",
  description: "",
  price: { amount: 10, currency: "EUR" },
  images: [],
  categories: [],
  inStock: true,
  attributes: [
    { id: "profile", name: "Profile", options: ["TH", "U"] },
    { id: "size", name: "Size", options: ["16", "20"] },
  ],
  variants: [
    { id: "th-16", name: "TH / 16", price: { amount: 10, currency: "EUR" }, attributes: { Profile: "TH", Size: "16" }, inStock: true },
    { id: "th-20", name: "TH / 20", price: { amount: 12, currency: "EUR" }, attributes: { Profile: "TH", Size: "20" }, inStock: false },
    { id: "u-20", name: "U / 20", price: { amount: 15, currency: "EUR" }, attributes: { Profile: "U", Size: "20" }, inStock: true },
  ],
};

describe("product variant matching", () => {
  it("finds a variant only after all attributes are selected", () => {
    expect(getVariantForSelections(product, { Profile: "TH" })).toBeUndefined();
    expect(getVariantForSelections(product, { Profile: "TH", Size: "16" })?.id).toBe("th-16");
  });

  it("identifies impossible combinations and keeps sold-out combinations selectable", () => {
    expect(hasVariantForOption(product, "Size", "16", { Profile: "U" })).toBe(false);
    expect(hasVariantForOption(product, "Size", "20", { Profile: "TH" })).toBe(true);
    expect(getVariantForSelections(product, { Profile: "TH", Size: "20" })?.inStock).toBe(false);
  });

  it("calculates variant price ranges", () => {
    expect(getProductPriceRange(product)).toEqual({ minimum: 10, maximum: 15 });
  });
});
