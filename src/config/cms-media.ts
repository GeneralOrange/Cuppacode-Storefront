type Environment = Record<string, string | undefined>;

export function getCmsMediaOrigins(env: Environment = process.env): string[] {
  const origins = new Set<string>();
  const wordpressUrl = env.WORDPRESS_URL;

  if (wordpressUrl) {
    let parsed: URL;
    try {
      parsed = new URL(wordpressUrl);
    } catch {
      throw new Error("WORDPRESS_URL must be an absolute URL to configure CMS media");
    }
    if (!["http:", "https:"].includes(parsed.protocol) || parsed.username || parsed.password) {
      throw new Error("WORDPRESS_URL must use HTTP(S) without credentials");
    }
    origins.add(parsed.origin);
  } else {
    origins.add("https://germat.nl");
  }

  for (const host of (env.STOREFRONT_IMAGE_HOSTS ?? "").split(",").map((value) => value.trim()).filter(Boolean)) {
    let parsed: URL;
    try {
      parsed = new URL(host.includes("://") ? host : `https://${host}`);
    } catch {
      throw new Error(`Invalid CMS_MEDIA_HOSTS entry: ${host}`);
    }
    if (
      parsed.protocol !== "https:" ||
      parsed.username ||
      parsed.password ||
      parsed.port && !/^\d+$/.test(parsed.port) ||
      parsed.pathname !== "/" ||
      parsed.search ||
      parsed.hash
    ) {
      throw new Error(`STOREFRONT_IMAGE_HOSTS entries must be HTTPS origins or hostnames: ${host}`);
    }
    origins.add(parsed.origin);
  }

  return [...origins];
}

export function getStorefrontImageOrigins(env: Environment = process.env): string[] {
  const origins = new Set(getCmsMediaOrigins(env));
  const commerceUrl = env.WOOCOMMERCE_URL;

  if (commerceUrl) {
    let parsed: URL;
    try {
      parsed = new URL(commerceUrl);
    } catch {
      throw new Error("WOOCOMMERCE_URL must be an absolute URL to configure product media");
    }
    if (
      !["http:", "https:"].includes(parsed.protocol) ||
      parsed.username ||
      parsed.password ||
      parsed.search ||
      parsed.hash
    ) {
      throw new Error("WOOCOMMERCE_URL must use HTTP(S) without credentials");
    }
    origins.add(parsed.origin);
  }

  return [...origins];
}
