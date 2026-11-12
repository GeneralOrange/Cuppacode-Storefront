export type StorefrontKey = "germat" | "nova";

const storefronts = {
  germat: {
    key: "germat",
    commerce: "local-mock",
    brand: {
      name: "GERMAT",
      tagline: "Professioneel gereedschap. Direct aan de slag.",
      announcement: "Demo-omgeving · beelden, prijzen en voorraad zijn indicatief",
    },
    navigation: [
      { label: "Installatie", href: "/category/installatiegereedschap" },
      { label: "Gereedschapsets", href: "/category/gereedschapsets" },
      { label: "Zonnepanelen", href: "/category/zonnepanelen-gereedschap" },
      { label: "Waterleiding & PEX", href: "/category/waterleiding-pex" },
      { label: "Handgereedschap", href: "/category/handgereedschap" },
      { label: "Elektra gereedschap", href: "/category/elektra-gereedschap" },
      { label: "Verhuur", href: "/verhuur" },
    ],
    cmsNavigation: [
      { label: "Over ons", href: "/over-ons" },
      { label: "Contact", href: "/contact" },
      { label: "Verzending", href: "/verzending" },
      { label: "Garantie", href: "/garantie" },
      { label: "Verhuur", href: "/verhuur" },
      { label: "Algemene voorwaarden", href: "/algemene-voorwaarden" },
    ],
  },
  nova: {
    key: "nova",
    commerce: "configured",
    brand: {
      name: "NOVA",
      tagline: "Objects for everyday rituals.",
      announcement: "Free delivery on orders over €50",
    },
    navigation: [
      { label: "Shop", href: "/shop" },
      { label: "Coffee", href: "/category/coffee" },
      { label: "Objects", href: "/category/brewing-equipment" },
      { label: "Tea", href: "/category/tea" },
    ],
    cmsNavigation: [],
  },
} as const;

export function getStorefrontKey(): StorefrontKey {
  return process.env.NEXT_PUBLIC_STOREFRONT === "nova" ? "nova" : "germat";
}

export function getStorefrontConfig() {
  return storefronts[getStorefrontKey()];
}

export const themeConfig = getStorefrontConfig();
