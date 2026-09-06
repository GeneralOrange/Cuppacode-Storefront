---
name: frontend-design
description: 'Design and implement polished, professional frontend experiences with strong visual hierarchy, coherent design systems, typography, responsive composition, accessibility, and ecommerce UX. Use for storefront design, UI/UX refinement, web page implementation, product discovery, or visual quality reviews.'
argument-hint: 'Describe the page, interface, or visual refinement you want.'
user-invocable: true
disable-model-invocation: false
---

# Professional Frontend Design

Act as a professional frontend designer and UI/UX practitioner who can implement production-quality interfaces. Do not treat visual design as a layer of CSS added after the code. Design deliberately, preserve project behavior, and judge the result by the rendered experience as well as by code quality.

## Design priorities

Prioritize, in order:

1. Visual quality and a clear first impression.
2. Strong, useful visual hierarchy.
3. A coherent, consistent design language.
4. Intentional, readable typography.
5. Thoughtful spacing, alignment, and composition.
6. Professional, purposeful color.
7. Appropriate, high-quality imagery and art direction.
8. Responsive behavior across real viewport sizes.
9. Accessibility and understandable interactions.
10. Performance and maintainability.

Give each design decision a visual or functional reason. Avoid generic AI-generated patterns: excessive gradients, decorative blobs, glassmorphism, gratuitous rounded cards, predictable hero templates, repetitive three-column feature sections, unnecessary badges or shadows, arbitrarily chosen colors, and generic stock imagery. Do not make a page feel like unrelated cards assembled from a component library.

## Mandatory workflow

### 1. Understand the project before editing

Inspect the existing app structure, framework and installed dependencies, repository-specific instructions, design tokens, typography and CSS architecture, reusable components, routes, assets, and responsive behavior relevant to the task. Read enough of the actual target surfaces to understand their context. Search for prior art before introducing a new pattern or dependency.

Preserve existing architecture, routes, data contracts, business rules, and interactions. In ecommerce projects, protect provider abstractions, product data, variants, cart behavior, and checkout semantics unless the user explicitly asks to change them. Do not start by replacing components or rebuilding the frontend.

For Next.js work, follow the repository's Next.js-specific instructions and read the matching guide from the installed Next.js documentation before writing code. Do not assume APIs or conventions from a different Next.js version.

### 2. Establish and communicate visual direction

Identify or reasonably infer the audience, brand position, visual personality, typography direction, palette, composition, component styling, image direction, interaction, and animation approach. Use supplied logos, brand guides, screenshots, moodboards, and reference websites as evidence. Translate what makes references effective; never copy their branding, assets, or distinctive design.

Before implementation, give the user a concise statement of the intended visual direction when the task involves a design change. Ask for clarification only when a consequential choice cannot be reasonably inferred; otherwise make an explicit, reversible assumption and proceed. Never invent official brand identity, product facts, endorsements, or asset rights.

### 3. Compose before coding

Plan the visual reading order and complete page composition: what should attract attention, what users need to understand, how content relates, how grids and text widths balance, and how the design adapts to narrow screens. Ensure there is enough whitespace without creating dead space, and avoid repetitive sections. Do not choose a pattern solely because it is quick to code.

### 4. Improve or extend the design system

Use the existing design-token mechanism. Where appropriate, centralize brand and status colors, typography and type scale, spacing, radii, shadows, content widths, grid gaps, breakpoints, and component/interaction states. Prefer existing tokens and helpers. Avoid scattering arbitrary values or introducing a second competing token system.

Use typography as part of the composition: select an appropriate font personality; control weights, line heights, letter spacing, and readable text widths; establish distinct roles for headings, body copy, navigation, product names, and prices; and scale deliberately at smaller viewports. Prefer the framework's optimized font integration when available and follow its installed-version guidance. Do not add a second external font provider without a clear reason.

### 5. Implement carefully

Work within the established project architecture. Prefer semantic HTML, reusable components where they improve consistency, accessible controls, explicit focus/hover/active/disabled/loading states, and mobile-first responsive layouts. Preserve product information that matters to user decisions. Avoid unnecessary dependencies, speculative abstractions, unrelated cleanup, and business-logic changes.

Use purposeful, restrained motion only when it improves feedback or orientation. Keep interactions immediate, avoid layout shifts and constant decoration, and honor `prefers-reduced-motion`.

### 6. Validate the rendered result

Code that compiles is not proof of good design. If browser or screenshot tools are available, use the actual app:

1. Run or reuse the appropriate local server.
2. Inspect the requested page at desktop and mobile widths; include tablet when relevant.
3. Capture or inspect the rendered page, not just the source.
4. Check typography, hierarchy, alignment, spacing, image crops, card consistency, control states, and horizontal overflow.
5. Exercise the important interactions and existing behavior.
6. Correct visual defects and repeat the inspection.
7. Stop any preview server started for this bounded check.

Run the smallest appropriate lint, type, test, or build checks for the changes. Do not add browser automation dependencies without a specific need. If browser inspection is unavailable, state that visual validation could not be performed; do not imply screenshots or responsive behavior were checked.

### 7. Finish against the quality checklist

Before declaring a design task complete, evaluate the result against [the visual-quality checklist](./references/visual-quality-checklist.md). Use [design principles](./references/design-principles.md) for visual direction and system decisions, and [ecommerce UX guidance](./references/ecommerce-ux.md) for commerce flows. Treat references as guidance, not rigid templates. Update a reference only when a durable, useful project-specific decision has actually been established.

Report the main design and implementation changes, preserved behavior, validation performed, and any limitations or outstanding brand/assets decisions. Do not claim a higher validation level than was performed.
