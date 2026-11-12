# CuppaCode Storefront

An interactive Next.js storefront showcase built on the existing provider-independent `CommerceProvider` architecture.

## Run locally

```powershell
npm install
npm run dev
```

By default, the app opens the Germat showcase using local mock data. It requires no WooCommerce URL, credentials, or production connection.

## Germat demo safety

- `NEXT_PUBLIC_STOREFRONT` defaults to `germat`.
- The Germat storefront always uses `MockCommerceProvider`, even if WooCommerce environment variables are present.
- Product and cart interactions only update the in-memory local demo cart.
- Checkout returns a preview reference only. It never calls `CommerceProvider.createOrder`, creates a WooCommerce order, or processes payment.
- The rental flow is a local prototype; it does not check availability, submit a request, or reserve equipment.
- The Germat dataset marks prices and availability with `dataQuality` as demo values. They are not current offers or stock claims.
- Product visuals are original, hand-authored vector illustrations. Germat product photos were not copied because their reuse permission was not established.

The public Germat product page was reviewed for product wording and the listed press profiles and sizes. Other product options, demo prices, and demo availability need confirmation from Germat before a production integration.

## Keep the NOVA showcase

The original NOVA mock catalog remains in `src/data/commerce.json`. In PowerShell, set `$env:NEXT_PUBLIC_STOREFRONT="nova"` before starting Next.js to select its theme and catalog. Use the mock provider for a safe demo. Do not configure production WooCommerce for a customer presentation.

## Architecture

```text
Next.js UI and route handlers
    |
CommerceProvider          ContentProvider (CMS)
    |
MockCommerceProvider /     MockCmsProvider /
WooCommerceProvider        WordPressCmsProvider
    |
Local catalog / Store API  Local pages / WordPress REST API
```

The Germat catalog is in `src/data/germat-commerce.json`; theme and navigation configuration live in `src/config/theme.ts`. Product UI consumes the shared commerce types, including attribute-based variations, per-variant prices, stock state, SKU, and image. WooCommerce transport and response mapping remain in `src/commerce/providers/woocommerce`.

The multi-attribute selector disables impossible combinations, updates the price and variant image, communicates demo availability, and adds the selected variant ID to the cart. Cart entries are keyed by product and variation, so different variants remain separate.

## CMS pages

The storefront reads regular pages through the independent `ContentProvider` interface in `src/content`. The default `CMS_PROVIDER=mock` uses local example pages; `CMS_PROVIDER=wordpress` reads published pages from the WordPress REST API at `WORDPRESS_URL/wp-json/wp/v2/`. The provider returns normalized CMS models, so route and rendering code do not depend on WordPress response shapes.

Single-segment published page slugs render at the site root (for example `/over-ons`, `/contact`, and `/verzending`). Next.js static routes take precedence, including `/cart`, `/checkout`, `/shop`, `/product/...`, `/category/...`, and `/verhuur-demo`. `/verhuur` is intentionally CMS-managed; the existing interactive rental prototype is available at `/verhuur-demo`. The Germat footer has manually configured page links in `src/config/theme.ts`; WordPress menus are not synchronized.

CMS pages and page collections use Next.js server-side fetch caching with a one-hour time-based revalidation. A failed background refresh can continue serving a previously cached successful response; a first fetch during an outage shows a generic unavailable message. To support future WordPress webhooks, configure a strong random `CMS_REVALIDATE_SECRET` and send:

```http
POST /api/cms/revalidate
Authorization: Bearer <CMS_REVALIDATE_SECRET>
Content-Type: application/json

{"slug":"over-ons"}
```

The handler invalidates the page and collection cache tags and revalidates the page path. No webhook plugin is installed and the production WordPress site is not modified. Keep the token server-only. Add media CDN hostnames to the comma-separated `STOREFRONT_IMAGE_HOSTS` allowlist. The WordPress and WooCommerce origins are allowed automatically; only configured origins are enabled for Next.js image optimization and sanitized CMS images.

The renderer supports semantic Gutenberg headings, paragraphs, emphasis, links, lists, images/captions, tables, blockquotes, and separators. HTML is sanitized server-side; scripts, event handlers, unsafe protocols, unapproved image hosts, and unsupported embeds/widgets are removed. Simple text and safe child content from unsupported blocks may remain, but Elementor and other page-builder layouts are not recreated. Page content styles inherit the storefront rather than loading WordPress theme CSS.

## Germat visual theme

The Germat palette, typography variables, radii, shadows, and layout rhythm are centralized in `src/app/globals.css`. Replace the blue palette and radius tokens there when the official Germat identity and moodboard are available. The Germat theme uses Manrope through `next/font/google`; Next.js self-hosts the generated font assets. NOVA retains its separate color and typography treatment.

## Validation

```powershell
npm run lint
npm run typecheck
npm run test
npm run build
```

Shopify and Magento are not implemented. A production Germat integration still needs verified product data, image-use approval, shipping/tax rules, and a separately designed checkout and rental workflow.
