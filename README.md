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
CommerceProvider / ContentProvider
    |
MockCommerceProvider / WooCommerceProvider
    |
Local demo data / WooCommerce Store API
```

The Germat catalog is in `src/data/germat-commerce.json`; theme and navigation configuration live in `src/config/theme.ts`. Product UI consumes the shared commerce types, including attribute-based variations, per-variant prices, stock state, SKU, and image. WooCommerce transport and response mapping remain in `src/commerce/providers/woocommerce`.

The multi-attribute selector disables impossible combinations, updates the price and variant image, communicates demo availability, and adds the selected variant ID to the cart. Cart entries are keyed by product and variation, so different variants remain separate.

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
