# Design Principles

Design is the orchestration of meaning, hierarchy, composition, and behavior. Use these principles to make an interface feel authored for its product rather than assembled from familiar patterns.

## Start with a point of view

- Understand the audience, product, use context, primary task, content, and confirmed brand evidence before choosing a style.
- Write a one-sentence visual concept that could not be swapped unchanged onto any unrelated website. Use it to judge subsequent choices.
- Distinguish facts from assumptions. Treat logos, existing UI, product photography, copy, and reference material as evidence; never invent official brand identity or claims.
- Translate what works in references into general lessons. Do not copy their assets, branding, distinctive compositions, or component styling.
- When evidence is incomplete, choose a restrained, reversible direction and say what is assumed. Ask only when the choice materially affects identity or user behavior.

## Compose the whole experience

- Decide what should be seen first, what users need to understand next, and where the next action belongs.
- Create hierarchy through the combined use of scale, contrast, position, whitespace, grouping, and typography—not color or boldness alone.
- Align to a small, consistent set of page and component edges. Set widths and grid proportions according to the content and its importance.
- Relate images and text intentionally: consider visual weight, subject placement, crop, reading order, and whether the image supports or competes with the message.
- Build rhythm through purposeful changes in section scale, density, alignment, image treatment, and background. A compact utility band can follow an expansive editorial moment; a product grid can be followed by a quiet, constrained story. Do not alternate patterns randomly.
- Use negative space to clarify relationships and create emphasis. Avoid both cramped screens and oversized, unearned emptiness.
- Group related content by proximity and separate unrelated content. Do not put every section or component in a card.
- Check transitions between sections: use shared alignment, color, imagery, or a deliberate boundary rather than a stack of disconnected rectangles.
- Give long copy readable measures. Control line breaks and avoid awkward heading, label, and control collisions at real viewport sizes.

## Make the system coherent, not monotonous

- Inspect existing tokens, utilities, components, and conventions first. Extend the shared mechanism; do not introduce a parallel design system.
- Centralize repeated semantic decisions: brand and status colors, type roles, spacing, layout widths, borders, radii, elevation, and control states.
- Name values by role (such as `text-muted`, `brand-primary`, `status-error`), keeping brand identity separate from success, warning, and error semantics.
- Reuse a pattern when it expresses the same purpose. Vary composition when content or hierarchy differs; consistency does not require identical sections.
- Avoid unnecessary nested cards, borders, background changes, and shadows. Use the lightest separation that makes grouping clear.
- Treat radius, padding, height, alignment, and typography as a component's character—not independent decorative knobs. An exception should be purposeful and local.

## Build accessible, credible interfaces

- Maintain readable contrast for text, icons, controls, focus rings, and disabled states. Do not communicate status by color alone.
- Use native semantics, meaningful accessible names, visible keyboard focus, logical focus order, and useful error feedback.
- Make hover, focus, pressed, selected, disabled, loading, success, and error states distinct and consistent.
- Keep actions reachable and tappable on touch devices; do not hide essential information behind hover.
- Use restrained motion only to communicate state or direction. Keep it immediate, avoid layout shifts, and honor `prefers-reduced-motion`.
- Verify that the design does not add unsupported product facts, endorsements, urgency, availability, service promises, or image-rights claims.

## Avoid autopilot patterns

Do not add a split hero, three equal columns, a card grid, rounded pills, gradients, blobs, blur/glass effects, shadows, badges, decorative icons, or animated reveals merely because they are common in generated interfaces. First ask what content or interaction needs the pattern. If there is no clear answer, leave it out and choose a more fitting composition.
