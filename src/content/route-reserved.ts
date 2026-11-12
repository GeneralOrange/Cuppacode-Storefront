const reservedCmsSlugs = new Set([
  "api",
  "cart",
  "category",
  "checkout",
  "favicon.ico",
  "product",
  "robots.txt",
  "shop",
  "sitemap.xml",
  "verhuur-demo",
]);

export function isReservedCmsSlug(slug: string): boolean {
  return reservedCmsSlugs.has(slug.toLowerCase());
}
