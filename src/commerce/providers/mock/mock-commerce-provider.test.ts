import { beforeEach, describe, expect, it } from "vitest";
import { MockCommerceProvider } from "./mock-commerce-provider";

let provider: MockCommerceProvider;

beforeEach(() => {
  provider = new MockCommerceProvider(`test-${crypto.randomUUID()}`);
});

describe("MockCommerceProvider", () => {
  it("returns local products and paginates them", async () => {
    expect((await provider.getProducts()).length).toBe(20);
    expect((await provider.getProducts({ page: 2, limit: 12 })).length).toBe(8);
  });

  it("finds products by id, slug and case-insensitive search", async () => {
    expect((await provider.getProduct("product-008"))?.slug).toBe("ceramic-pour-over");
    expect((await provider.getProduct("ceramic-pour-over"))?.id).toBe("product-008");
    expect((await provider.searchProducts("SHIRT")).length).toBe(0);
    expect((await provider.searchProducts("espresso"))[0]?.slug).toBe("velvet-roast-espresso");
  });

  it("filters by category and price", async () => {
    const products = await provider.getProducts({ category: "tea", maxPrice: 10 });
    expect(products.length).toBeGreaterThan(0);
    expect(products.every((product) => product.categories.some((category) => category.slug === "tea"))).toBe(true);
    expect(products.every((product) => product.price.amount <= 10)).toBe(true);
  });

  it("returns variants and rejects an unavailable product", async () => {
    const product = await provider.getProduct("ceramic-pour-over");
    expect(product?.variants.length).toBe(2);
    await expect(provider.addToCart("decaf-evening", 1)).rejects.toThrow("out of stock");
  });

  it("adds, updates and removes cart items with calculated totals", async () => {
    await provider.addToCart("product-001", 2);
    let cart = await provider.getCart();
    expect(cart.itemCount).toBe(2);
    expect(cart.totals.subtotal.amount).toBe(25.9);

    await provider.updateCartItem(cart.items[0]!.id, 3);
    cart = await provider.getCart();
    expect(cart.totals.total.amount).toBe(38.85);

    await provider.removeFromCart(cart.items[0]!.id);
    expect((await provider.getCart()).items).toHaveLength(0);
  });

  it("does not allow adding a quantity beyond known stock", async () => {
    await provider.addToCart("product-001", 42);
    await expect(provider.addToCart("product-001", 1)).rejects.toThrow("exceeds available stock");
    expect((await provider.getCart()).items[0]?.quantity).toBe(42);
  });

  it("creates a local demo order and clears the cart", async () => {
    await provider.addToCart("product-002", 1);
    const order = await provider.createOrder({
      email: "customer@example.test",
      billingAddress: { firstName: "Demo", lastName: "Customer", address1: "Demo Street 1", city: "Utrecht", postalCode: "3511AA", country: "NL" },
    });
    expect(order.id).toMatch(/^MOCK-1000/);
    expect(order.status).toBe("demo");
    expect(order.paymentStatus).toBe("not_processed");
    expect((await provider.getCart()).items).toHaveLength(0);
  });

  it("keeps different variants of the same product as separate cart items", async () => {
    await provider.addToCart("product-008", 1, "variant-008-white");
    await provider.addToCart("product-008", 2, "variant-008-sage");
    const cart = await provider.getCart();
    expect(cart.items).toHaveLength(2);
    expect(cart.items.map((item) => item.variant?.id).sort()).toEqual([
      "variant-008-sage",
      "variant-008-white",
    ]);
  });

  it("loads the Germat demo catalog through the same provider", async () => {
    const germat = new MockCommerceProvider(`germat-${crypto.randomUUID()}`, "germat");
    const product = await germat.getProduct("germat-complete-waterleiding-pex-gereedschapset-in-en-uitwendige-buigveren");
    expect(product?.attributes.map((attribute) => attribute.name)).toEqual(["Persprofiel", "Persmaat"]);
    expect(product?.dataQuality).toEqual({ prices: "demo", availability: "demo" });
    expect((await germat.getProducts()).length).toBe(9);
    if (!product) throw new Error("Germat demo product should be available");
    await expect(germat.addToCart(product.id, 1)).rejects.toThrow("Select a product variant");
    await expect(germat.addToCart(product.id, 1, "g-pex-both-th-20")).rejects.toThrow("out of stock");
    await germat.addToCart(product.id, 1, "g-pex-both-th-16");
    await germat.addToCart(product.id, 1, "g-pex-both-u-16");
    const cart = await germat.getCart();
    expect(cart.items).toHaveLength(2);
    expect(cart.items.map((item) => item.variant?.id).sort()).toEqual([
      "g-pex-both-th-16",
      "g-pex-both-u-16",
    ]);
  });
});
