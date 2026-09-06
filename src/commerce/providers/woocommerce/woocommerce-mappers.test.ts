import { describe, expect, it } from "vitest";
import {
  mapWooCommerceCategory,
  mapWooCommerceImage,
  mapWooCommerceProduct,
  mapWooCommerceVariation,
  findWooCommerceCartVariant,
} from "./woocommerce-mappers";
import type { WooCommerceProduct } from "./types";

const image = { id: 7, src: "https://cdn.example.test/mug.jpg", alt: "Blue mug", width: 800, height: 800 };

const product: WooCommerceProduct = {
  id: 12,
  slug: "blue-mug",
  name: "Blue mug",
  description: "A useful mug.",
  price: "1299",
  regular_price: "1599",
  images: [image],
  categories: [{ id: 3, name: "Mugs", slug: "mugs" }],
  attributes: [{ id: 4, name: "Color", variation: true, options: ["Blue"] }],
  variations: [44],
  is_in_stock: true,
};

describe("WooCommerce mappers", () => {
  it("maps product identity and price", () => {
    const mapped = mapWooCommerceProduct(product);
    expect(mapped.id).toBe("12");
    expect(mapped.slug).toBe("blue-mug");
    expect(mapped.price).toEqual({ amount: 12.99, currency: "USD" });
    expect(mapped.compareAtPrice).toEqual({ amount: 15.99, currency: "USD" });
  });

  it("maps images", () => {
    expect(mapWooCommerceImage(image)).toEqual({
      id: "7",
      url: image.src,
      alt: image.alt,
      width: 800,
      height: 800,
    });
  });

  it("maps categories", () => {
    expect(mapWooCommerceCategory({ id: 3, name: "Mugs", slug: "mugs" })).toEqual({
      id: "3",
      name: "Mugs",
      slug: "mugs",
      description: undefined,
      image: undefined,
    });
  });

  it("maps variation attributes and stock", () => {
    const mapped = mapWooCommerceVariation({
      id: 44,
      name: "Blue / Large",
      price: "1499",
      regular_price: "1699",
      stock_status: "instock",
      attributes: [{ id: 4, name: "Color", option: "Blue" }],
    });
    expect(mapped.id).toBe("44");
    expect(mapped.attributes).toEqual({ Color: "Blue" });
    expect(mapped.price.amount).toBe(14.99);
    expect(mapped.inStock).toBe(true);
  });

  it("maps product attributes and availability", () => {
    const mapped = mapWooCommerceProduct(product);
    expect(mapped.attributes).toEqual([{ id: "4", name: "Color", options: ["Blue"], variation: true }]);
    expect(mapped.inStock).toBe(true);
    expect(mapped.images[0]?.alt).toBe("Blue mug");
  });

  it("maps variation stock and resolves the chosen WooCommerce cart variation", () => {
    const mapped = mapWooCommerceProduct(product, [{
      id: 44,
      name: "Blue",
      sku: "BLUE-DEMO",
      price: "1299",
      stock_status: "instock",
      stock_quantity: 3,
      attributes: [{ id: 4, name: "Color", option: "Blue" }],
    }]);
    const variant = findWooCommerceCartVariant(mapped, undefined, [
      { attribute: "Color", value: "Blue" },
    ]);
    expect(variant?.id).toBe("44");
    expect(variant?.sku).toBe("BLUE-DEMO");
    expect(variant?.stockQuantity).toBe(3);
    expect(findWooCommerceCartVariant(mapped, 44)?.id).toBe("44");
  });
});
