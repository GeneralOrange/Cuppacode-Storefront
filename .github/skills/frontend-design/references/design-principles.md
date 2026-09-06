# Design Principles

Use these principles to make interfaces feel intentional, coherent, and suited to their product rather than assembled from familiar templates.

## Start with context

- Understand the product, audience, use environment, content, and primary user task before choosing a visual style.
- Treat brand, existing UI, assets, copy, and reference material as evidence. Distinguish confirmed identity from a provisional direction.
- Convert reference-site observations into general UX lessons. Do not reproduce protected brand assets, distinctive layouts, or component styling.
- When details are missing, make a restrained, reversible choice that fits the product. Ask when a decision would materially alter the user experience or identity.

## Hierarchy and composition

- Establish one clear primary focal point per view, followed by a deliberate sequence of supporting information and actions.
- Use scale, contrast, position, whitespace, and grouping together to express priority; do not rely on color or font weight alone.
- Align elements to a small, consistent set of page and component edges. Use grid proportions that fit content rather than defaulting to equal columns.
- Keep related elements visually close and separate unrelated groups. Let sections connect through rhythm, color, and alignment rather than boxing each one.
- Balance content density and negative space. Avoid both cramped screens and oversized empty areas.
- Give long-form copy and labels readable line lengths. Prevent headings and controls from colliding or wrapping awkwardly.
- Use image aspect ratios and crops that suit the subject. Reserve enough space for product imagery and do not crop away important product details.

## Design systems

- Begin with existing variables, utility conventions, components, and design tokens. Extend a shared mechanism rather than building a parallel one.
- Centralize repeated decisions: semantic brand and status colors, typography roles and scale, spacing, radii, shadows, layout widths, grids, and interactive states.
- Name colors and values by purpose (for example, `text-muted`, `brand-primary`, `status-error`), not by a temporary visual color when the system has semantic tokens.
- Keep the distinction between brand colors and semantic success, warning, and error colors.
- Apply tokens consistently. A token is only useful when components actually consume it.
- Allow intentional exceptions when they improve clarity or composition, and keep those exceptions local and explainable.
- Avoid unnecessary nested cards, borders, surface changes, and shadows. Use the lightest visual separation that communicates the grouping.

## Typography

- Choose typefaces for tone, readability, language support, and available integration, not novelty alone.
- Use a deliberate hierarchy for display/hero text, section headings, body copy, labels, navigation, product titles, prices, and metadata.
- Tune line height and measure alongside font size. Large headings need controlled width and line breaks; body text needs comfortable reading rhythm.
- Use font weights and letter spacing deliberately. Avoid making every label uppercase, every heading extra-bold, or all type the same size.
- Define responsive type behavior and inspect real wrapping at narrow widths.
- Prefer optimized or locally served fonts where the framework supports them. Account for font loading and fallback behavior.

## Color and imagery

- Use a small, intentional palette with roles for brand, surfaces, text, borders, and statuses.
- Maintain readable contrast for text, icons, controls, focus rings, and disabled states. Do not communicate status with color alone.
- Use accent color to guide attention, not to fill every surface.
- Select imagery for relevance, quality, consistency, and rights. Do not substitute generic stock photos for product-specific imagery or fabricate a brand logo.
- When suitable photography is unavailable or reuse rights are uncertain, use honest placeholders or original illustrations and label them appropriately.
- Check that image treatments, crops, backgrounds, and radii feel consistent across cards, galleries, and hero areas.

## Responsive behavior

- Design for the content at each size, not merely for a smaller desktop canvas.
- Define intentional changes in navigation, reading order, columns, image prominence, card density, controls, and section spacing.
- Keep important actions reachable and tappable. Avoid hover-only information and controls on touch devices.
- Test practical widths, including narrow phones. Check both document overflow and clipped/overlapping content.
- Preserve hierarchy and product information as layouts collapse; do not hide essential context to fit a smaller screen.

## Interaction, accessibility, and motion

- Use native semantic elements and clear accessible names. Keep keyboard order, focus visibility, labels, and error feedback intact.
- Make hover, focus, pressed, selected, disabled, and loading states visually consistent and distinguishable.
- Use motion to communicate state or direction, with restrained duration and easing. Do not delay task completion for decoration.
- Honor `prefers-reduced-motion`; avoid motion that causes layout shifts or makes content harder to read.
- Ensure menus, drawers, dialogs, variant controls, and filters work with keyboard and touch input.

## Avoid default-template decisions

Do not add gradients, blobs, blur/glass effects, shadows, badges, pill shapes, decorative icons, or animated reveals by habit. Do not use a hero-plus-three-cards layout simply because it is familiar. Add these only when they serve a clear content, brand, or interaction purpose.
