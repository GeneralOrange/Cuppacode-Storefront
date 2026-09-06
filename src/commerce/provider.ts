import type { CommerceProvider } from "@/commerce/core/interfaces/commerce-provider";
import { CommerceError } from "@/commerce/core/errors/commerce-error";
import { getCommerceConfig } from "@/config/commerce";
import { getStorefrontConfig } from "@/config/theme";
import { WooCommerceProvider } from "./providers/woocommerce/woocommerce-provider";
import { MockCommerceProvider } from "./providers/mock/mock-commerce-provider";

export function getCommerceProvider(cartToken?: string): CommerceProvider {
  const storefrontConfig = getStorefrontConfig();
  const storefront = storefrontConfig.key;

  if (storefrontConfig.commerce === "local-mock") {
    return new MockCommerceProvider(cartToken, storefront);
  }

  const config = getCommerceConfig();

  switch (config.provider) {
    case "mock":
      return new MockCommerceProvider(cartToken, storefront);
    case "woocommerce":
      return new WooCommerceProvider(cartToken);
  }

  throw new CommerceError("Unsupported commerce provider", "CONFIGURATION_ERROR");
}
