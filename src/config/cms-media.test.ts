import { describe, expect, it } from "vitest";
import {
  getCmsMediaOrigins,
  getStorefrontImageOrigins,
} from "./cms-media";

describe("storefront media origins", () => {
  it("allows only configured CMS, commerce, and media origins", () => {
    const env = {
      WORDPRESS_URL: "https://cms.example",
      WOOCOMMERCE_URL: "https://shop.example/store",
      STOREFRONT_IMAGE_HOSTS: "cdn.example,https://images.example",
    };

    expect(getCmsMediaOrigins(env)).toEqual([
      "https://cms.example",
      "https://cdn.example",
      "https://images.example",
    ]);
    expect(getStorefrontImageOrigins(env)).toEqual([
      "https://cms.example",
      "https://cdn.example",
      "https://images.example",
      "https://shop.example",
    ]);
  });

  it("rejects unsafe or malformed image host configuration", () => {
    expect(() => getCmsMediaOrigins({
      WORDPRESS_URL: "https://cms.example",
      STOREFRONT_IMAGE_HOSTS: "http://untrusted.example",
    })).toThrow("STOREFRONT_IMAGE_HOSTS");
    expect(() => getStorefrontImageOrigins({
      WORDPRESS_URL: "https://cms.example",
      WOOCOMMERCE_URL: "javascript:alert(1)",
    })).toThrow("WOOCOMMERCE_URL");
  });
});
