import { CommerceError } from "@/commerce/core/errors/commerce-error";

export type CommerceProviderName = "mock" | "woocommerce";

function requiredServerEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new CommerceError(
      `Missing required server environment variable: ${name}`,
      "CONFIGURATION_ERROR",
    );
  }

  return value.replace(/\/$/, "");
}

export function getCommerceConfig() {
  const provider = process.env.COMMERCE_PROVIDER || "mock";

  if (provider !== "mock" && provider !== "woocommerce") {
    throw new CommerceError(
      `Unsupported commerce provider: ${provider}`,
      "CONFIGURATION_ERROR",
    );
  }

  if (provider === "mock") {
    return { provider: "mock" as const };
  }

  return {
    provider: "woocommerce" as const,
    baseUrl: requiredServerEnv("WOOCOMMERCE_URL"),
    consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
    consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
  };
}
