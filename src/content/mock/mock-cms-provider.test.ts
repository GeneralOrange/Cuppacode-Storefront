import { describe, expect, it } from "vitest";
import { MockCmsProvider } from "./mock-cms-provider";
import { isReservedCmsSlug } from "@/content/route-reserved";

describe("MockCmsProvider", () => {
  const provider = new MockCmsProvider();

  it("returns the configured informational pages by slug and id", async () => {
    const page = await provider.getPageBySlug("over-ons");

    expect(page?.title).toBe("Over Germat");
    expect(page?.status).toBe("published");
    expect(await provider.getPage("over-ons")).toEqual(page);
    expect(await provider.getPageById("mock-over-ons")).toEqual(page);
  });

  it("returns pages in their configured menu order", async () => {
    const pages = await provider.getPages();

    expect(pages.map((page) => page.slug)).toEqual([
      "over-ons",
      "contact",
      "verzending",
      "garantie",
      "verhuur",
      "algemene-voorwaarden",
    ]);
  });

  it("returns null for unknown pages", async () => {
    await expect(provider.getPageBySlug("niet-bestaand")).resolves.toBeNull();
    await expect(provider.getPageById("unknown")).resolves.toBeNull();
    await expect(provider.getPost("unknown")).resolves.toBeNull();
    await expect(provider.getPosts()).resolves.toEqual([]);
  });

  it("reserves storefront route segments from CMS lookup", () => {
    expect(isReservedCmsSlug("product")).toBe(true);
    expect(isReservedCmsSlug("api")).toBe(true);
    expect(isReservedCmsSlug("verhuur-demo")).toBe(true);
    expect(isReservedCmsSlug("over-ons")).toBe(false);
    expect(isReservedCmsSlug("verhuur")).toBe(false);
  });
});
