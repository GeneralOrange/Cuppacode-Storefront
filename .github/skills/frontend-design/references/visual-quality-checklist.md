# Visual Quality Checklist

Use this after implementing a page or significant component. Check what applies, report any limitation, and fix material defects before calling the design finished. A checklist or score does not substitute for inspecting the rendered result.

## Art direction and identity

- [ ] The concept fits the audience, product, use context, and confirmed brand evidence.
- [ ] The direction has a recognizable point of view rather than a generic template.
- [ ] Reference material informed decisions without copying protected assets or distinctive styling.
- [ ] The main choices in type, color, image, composition, and interaction support one another.
- [ ] No unapproved brand fact, product claim, image, endorsement, policy, or right was invented.

## Composition and hierarchy

- [ ] The first focal point and next user action are clear.
- [ ] Content has a purposeful reading order and useful relationships between copy, imagery, and controls.
- [ ] Scale, contrast, proportion, alignment, density, and negative space are balanced.
- [ ] Sections have visual rhythm and transitions without becoming repetitive or chaotic.
- [ ] Grid proportions, content widths, image ratios, and section scale suit the material.
- [ ] There is no unnecessary card nesting, surface, border, shadow, badge, or decorative effect.

## Typography, color, and imagery

- [ ] Display, heading, body, navigation, product, price, and label roles have deliberate hierarchy.
- [ ] Typeface character, available weights, readability, loading strategy, and language coverage suit the project.
- [ ] Line lengths, line heights, letter spacing, and responsive wrapping are comfortable.
- [ ] Palette roles are coherent; accent is selective and brand colors do not masquerade as semantic status.
- [ ] Text, controls, focus indicators, borders, and disabled states have sufficient contrast.
- [ ] Images are relevant, high quality, consistent, rights-aware, and cropped for their subject and layout.
- [ ] Placeholder and demo content cannot be mistaken for verified commercial information.

## Components, behavior, and responsive quality

- [ ] Components share a coherent system of spacing, heights, alignment, typography, and treatment.
- [ ] Primary, secondary, and low-emphasis actions have appropriate prominence.
- [ ] Hover, focus, selected, pressed, disabled, loading, success, and error states are coherent.
- [ ] Desktop and practical narrow-mobile views were inspected in an actual browser when tools are available.
- [ ] Tablet behavior was checked when relevant to the layout or navigation.
- [ ] No unintended overflow, clipping, overlap, awkward wrapping, or cramped tap target remains.
- [ ] Navigation, dialogs, drawers, search, filters, and forms work with keyboard and touch.
- [ ] Essential content and actions remain available at small sizes.
- [ ] Motion is purposeful, immediate, and reduced when `prefers-reduced-motion` is active.

## Product behavior and evidence

- [ ] Existing routes, data, architecture, and interactions remain intact unless explicitly changed.
- [ ] Ecommerce prices, variants, stock, totals, and transaction boundaries remain accurate.
- [ ] Important user flows were exercised in the browser when tools are available.
- [ ] Relevant lint, type, tests, and/or build checks were run; failures are reported.
- [ ] Defects found during visual inspection were corrected and the result was inspected again.
- [ ] Anything not validated is disclosed; source inspection is not presented as visual validation.

## Mandatory ten-point critique

After browser inspection, score each category 1–10. For ecommerce, separately review product discovery, purchase clarity, and transaction usability below; for non-commerce, state that commerce review is not applicable.

| Category | Score |
|---|---:|
| Visual identity | /10 |
| Composition | /10 |
| Layout and proportions | /10 |
| Spacing | /10 |
| Image art direction and quality | /10 |
| Typography | /10 |
| Color coherence | /10 |
| Component craftsmanship | /10 |
| Responsive quality | /10 |
| Overall consistency | /10 |

Any applicable category below 8 requires investigation and improvement. Name the three weakest areas, make targeted changes, then inspect again. For ecommerce, separately review product discovery, purchase clarity, and transaction usability in [ecommerce UX guidance](./ecommerce-ux.md). Do not inflate scores to justify stopping. Scores describe the observed result; they are not proof of quality.

Answer these questions in the critique:

1. Does this look professionally art-directed?
2. Does it have a recognizable identity?
3. Is visual hierarchy immediately clear?
4. Does typography feel intentional?
5. Are proportions balanced?
6. Is spacing consistent and purposeful?
7. Are images high quality and appropriately cropped?
8. Are sections interesting without being chaotic?
9. Does the page look generic?
10. Would it be convincing in a real client presentation?
