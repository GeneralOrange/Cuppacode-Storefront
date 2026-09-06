# Visual Quality Checklist

Use this checklist before calling a frontend design task complete. Check only what applies, and report any relevant limitation rather than assuming it passed.

## Direction and system

- [ ] The visual direction suits the audience, product, and confirmed brand assets.
- [ ] Reference material informed UX decisions without being copied.
- [ ] Existing design conventions and architecture were inspected and preserved.
- [ ] Shared tokens are used consistently for recurring colors, type, spacing, radius, elevation, and layout.
- [ ] Brand styling is distinguishable from success, warning, and error semantics.
- [ ] No unapproved logo, product claim, image, or brand fact was invented.

## Composition and typography

- [ ] The first focal point and next user action are clear.
- [ ] Headings, copy, images, controls, and sections form one coherent visual flow.
- [ ] Alignment, content width, whitespace, and grid proportions feel intentional.
- [ ] Typography has distinct roles with readable line lengths and line heights.
- [ ] Headings, prices, labels, and navigation wrap well without awkward collisions.
- [ ] Section spacing and component padding are consistent without excessive empty space.
- [ ] Card heights, image frames, and action placement are stable and balanced.

## Color, imagery, and details

- [ ] Contrast is sufficient for text, controls, borders, focus states, and disabled states.
- [ ] Accent color is purposeful and not overused.
- [ ] Images have appropriate quality, rights, crop, aspect ratio, and product fidelity.
- [ ] Placeholder and demo content cannot be mistaken for verified commercial information.
- [ ] Radii, borders, backgrounds, and shadows are consistent and not unnecessarily layered.
- [ ] Hover, focus, selected, pressed, disabled, loading, success, and error states are coherent.

## Responsive and interaction

- [ ] Desktop composition was inspected in a real browser when tooling was available.
- [ ] Mobile composition was inspected in a real browser at a practical narrow viewport.
- [ ] Tablet behavior was checked when relevant to the layout or navigation.
- [ ] There is no unintended horizontal scrolling, clipping, overlap, or cramped tap target.
- [ ] Navigation, dialogs, drawers, search, filters, and forms work with keyboard and touch.
- [ ] Critical content and actions remain available at small sizes.
- [ ] Motion is purposeful, does not delay interaction, and respects reduced-motion preference.

## Behavior and verification

- [ ] Existing routes, business logic, data, and interactions remain intact unless explicitly changed.
- [ ] Ecommerce prices, variants, availability, totals, and transaction boundaries remain accurate.
- [ ] Relevant lint, type, tests, and/or production build checks were run.
- [ ] Important user flows were exercised in the browser when available.
- [ ] Visual defects found during inspection were corrected and rechecked.
- [ ] Any validation that could not be performed is clearly disclosed.
