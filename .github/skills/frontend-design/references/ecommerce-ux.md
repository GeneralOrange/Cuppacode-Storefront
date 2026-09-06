# Ecommerce UX Guidance

Design ecommerce interfaces to help shoppers understand the assortment, evaluate products, choose the correct configuration, and complete an appropriate purchase flow. Visual simplicity must not obscure product facts or purchase consequences.

## Discovery and navigation

- Make the site's specialist category structure understandable and easy to browse.
- Keep primary navigation compact; use grouped dropdowns or mobile navigation when they genuinely improve access to a large assortment.
- Make search easy to find, labeled, keyboard accessible, and connected to the expected results experience.
- Preserve category context and useful search terms as shoppers move between listing and detail pages.
- Make service, advice, delivery, returns, rental, and other commercial information visible when it affects the purchase decision. Never invent policy claims.

## Product listing and cards

- Give products consistent image frames, names, concise descriptions, category context, and readable price placement.
- Maintain card alignment and stable information areas so prices and actions do not jump unpredictably between cards.
- Use a useful, consistent product image treatment. Product fidelity and imagery often matter more than decorative backgrounds.
- Make variable products recognizable and set an accurate expectation, such as a minimum “from” price and a clear “view options” action.
- Distinguish actual availability from demo or unknown availability. Use textual status alongside semantic color; never imply live inventory from sample data.
- Ensure add-to-cart and view-options controls are distinct, appropriately sized, and keyboard operable.
- Keep product facts, compatibility notes, and units legible; do not hide them to make a card appear more minimal.

## Product detail and variants

- Establish a clear product title, product-specific imagery, price, key description, and purchase controls near the top of the detail view.
- Present variant attributes with explicit labels, selected values, and visible unavailable/impossible choices. Do not make users infer which option is active.
- Preserve selected options when the shopper makes compatible subsequent choices. Disable impossible combinations only when the product data supports that conclusion.
- Update the displayed variant price, image, stock message, and add-to-cart identity consistently when a valid variant changes.
- Keep sold-out or unavailable choices understandable and non-purchasable. Do not suggest an item is available when it is not.
- Communicate the consequences of selecting an option before adding it. Provide useful inline guidance when required choices are missing.
- Keep product-specific specifications and compatibility context available, especially for technical or specialist goods.

## Search, filters, and sorting

- Use plain-language labels and useful defaults. Keep the active filters and result count apparent.
- Provide a clear reset action that preserves intentional route context where applicable.
- Avoid offering filters that do not match available product data.
- On mobile, make filter controls easy to open, operate, apply, and dismiss. Support Escape and accessible dialog semantics for modal drawers.
- Ensure sorting behavior matches the visible label and displayed price semantics (including variant price ranges).
- Preserve filter behavior and results while improving styling.

## Cart and checkout

- Show product identity, selected variant, quantity, unit/subtotal price, and a clear way to update or remove items.
- Distinguish cart-level totals and disclose what is excluded, such as taxes or shipping, when applicable.
- Provide responsive cart and checkout layouts without hiding key choices or totals.
- Use clear loading, success, and error states. Avoid silent failures or ambiguous button labels.
- Keep the boundary between preview and real transaction unmistakable. Never imply an order, payment, reservation, availability check, or customer data submission occurred unless that behavior actually exists.
- Preserve provider, cart identity, and order semantics. Visual refinement must not change commerce business logic.

## Service, trust, and content

- Surface only verified service claims, ratings, certifications, stock, delivery times, guarantees, and payment assurances.
- Explain demo values, placeholder imagery, or unconfirmed product details where needed to prevent misrepresentation.
- Do not add urgency, scarcity, discounts, or social proof unless supported by real data and authorized content.
- Keep calls to action specific and consistent with the actual next step.
