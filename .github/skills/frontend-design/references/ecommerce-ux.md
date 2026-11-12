# Ecommerce UX Guidance

Design commerce experiences to help people discover an assortment, understand product differences, choose a suitable configuration, and complete the intended transaction with confidence. Visual polish must not conceal product facts or purchase consequences.

## Discovery and navigation

- Make category structure, search, and the next step understandable. Keep primary navigation compact; add grouped navigation only when the assortment warrants it.
- Make search visible, labeled, keyboard accessible, and connected to the expected results experience.
- Preserve useful category context and search terms as shoppers move between listing and detail pages.
- Surface advice, delivery, returns, rental, compatibility, and other commercial information when it affects a decision. State only verified policies and services.
- Keep navigation and filters usable with touch, keyboard, and assistive technology; do not rely on hover-only access.

## Product listing and product cards

- Present product identity, useful product imagery, name, key distinction, and price in a stable, scannable hierarchy.
- Use consistent image frames and stable information/action areas so prices and controls do not jump unpredictably.
- Product imagery should accurately represent the item. Use consistent treatment across a range without cropping away relevant details.
- Distinguish simple products from configurable products; show an accurate “from” price when appropriate and a clear “view options” action.
- Make add-to-cart and view-options actions distinct, appropriately sized, keyboard operable, and accurate about what happens next.
- State actual availability separately from demo or unknown data. Never imply live inventory from sample data.
- Keep factual product details, units, compatibility, and meaningful differentiators legible.

## Product detail and variants

- Place title, product-specific imagery, price, key description, and purchase controls in a coherent first-view hierarchy.
- Label every variant attribute, show selected values clearly, and make unavailable or impossible choices understandable.
- Preserve compatible selections when another option changes. Disable impossible combinations only when product data supports the decision.
- Keep variant identity, image, price, stock message, and add-to-cart payload in sync when a valid selection changes.
- Explain required selections and purchase consequences before add-to-cart. Never suggest an unavailable item is purchasable.
- Keep specifications, care, compatibility, and other decision-critical details accessible without making the purchase area hard to understand.

## Search, filters, and sorting

- Use plain-language labels and useful defaults. Make the active filters, result count, and reset action apparent.
- Offer only filters supported by available product data. Preserve route context where applicable when filters reset.
- Ensure the visible sort label matches actual behavior, including the treatment of variant price ranges.
- On mobile, make filter controls easy to open, operate, apply, and dismiss. Modal drawers should have accessible dialog semantics and support Escape.
- Preserve filtering, sorting, and result behavior while improving presentation.

## Cart and checkout

- Show product identity, selected variant, quantity, unit/subtotal price, and clear update/remove controls.
- Distinguish item subtotals from order totals. Disclose what is excluded, such as shipping or taxes, when applicable and known.
- Keep key choices, validation messages, and totals visible in responsive cart and checkout layouts.
- Provide honest loading, success, and error states. Use specific action labels and explicitly surface failures.
- Keep preview/demo behavior unmistakable. Never imply an order, payment, reservation, availability check, or customer data submission occurred unless it actually did.
- Preserve commerce provider, cart identity, product and order semantics. A visual change must not alter business logic.
- Keep presentation independent of the commerce provider. Work through the repository's existing interfaces and provider abstractions; do not encode provider-specific assumptions in shared visual components.

## Trust and conversion

- Improve confidence by making the right information findable, not by manufacturing urgency or reassurance.
- Surface only supported service claims, ratings, certifications, stock, delivery times, guarantees, and payment assurances.
- Do not add scarcity, discounts, social proof, or checkout promises unless supported by real, authorized content.
- Keep calls to action specific to the actual next step. Do not make every action equally prominent.
- Evaluate conversion alongside usability: product comprehension, discoverability, selection confidence, accessibility, and transaction clarity are all part of a successful design.
