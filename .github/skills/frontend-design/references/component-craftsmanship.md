# Component Craftsmanship

Components should feel like parts of one considered product while responding to different purposes. Polish comes from fit, alignment, type, states, and behavior—not from adding ornament to every surface.

## Design from purpose

- Identify each component's job, information priority, and expected next action before styling it.
- Use a suitable treatment for the role: product card, navigation item, filter, banner, form field, and button do not all need the same structure or prominence.
- Keep shared system qualities coherent—type roles, spacing, focus behavior, border treatment, and color semantics—without forcing identical silhouettes.
- Reuse components when behavior and meaning match; do not abstract distinct experiences into a generic component merely for visual uniformity.
- Avoid excessive rounded white cards, unnecessary borders, arbitrary shadows, decorative icons, oversized controls, and nested containers.

## Refine proportions and alignment

- Check component width, height, image ratio, internal padding, baseline alignment, and whitespace against actual content.
- Keep related labels, values, controls, and actions grouped. Align elements to clear edges and avoid ambiguous spacing.
- Choose border radius, surface, border, and elevation as a coherent system. Use a visible surface only when it clarifies grouping, affordance, or hierarchy.
- Make primary, secondary, and low-emphasis actions visually distinct. Do not make every button equally dominant.
- Keep icon use purposeful and recognizable; provide accessible names where icons alone communicate an action.

## Complete the interaction states

- Define hover, keyboard focus, pressed, selected/current, disabled, loading, empty, success, and error states where relevant.
- Make focus clearly visible and preserve native keyboard behavior. Ensure state is not conveyed by color alone.
- Give feedback close to the action and announce status accessibly when needed. Do not create silent failures or success-shaped fallbacks.
- Keep touch targets usable, controls labeled, and interaction available without hover.
- Use restrained transitions for continuity or feedback; honor `prefers-reduced-motion` and avoid blocking task completion.

## Check real content and breakpoints

- Test components with long product names, varying prices, missing optional content, error messages, and localized strings when applicable.
- Ensure card actions and information remain stable without clipping or awkward height changes.
- Reflow controls and content intentionally for small screens. Preserve essential details and actions; do not just scale the desktop component down.
- Inspect the rendered component alongside neighboring content so its visual weight and spacing fit the overall composition.
