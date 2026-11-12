# Art-Direction Workflow

Use this lightweight creative process before implementation. Its purpose is to make the design's point of view explicit and testable, not to create ceremony or delay a small, well-scoped refinement.

## 1. Gather and classify evidence

Inspect the requested page, product/service, audience, content hierarchy, existing interface, design tokens, font setup, image assets, and repository constraints. Identify the primary task and any decision-critical information.

If references are supplied, inspect the actual websites or screenshots when access allows. For each, record observations rather than adjectives:

- **Recognizability:** which repeated visual choices make it identifiable?
- **Hierarchy:** what attracts attention first, second, and third, and why?
- **Whitespace and density:** where is space open or compressed, and what does that communicate?
- **Typography and image relationship:** how do scale, line breaks, alignment, crop, and subject placement work together?
- **Content emphasis:** how are important messages, products, prices, and actions distinguished?
- **Perceived quality:** what specific choices create a premium, playful, technical, editorial, or practical impression?

Translate relevant principles into an original direction. Do not copy logos, product photography, wording, signature layouts, or distinctive component styling. If a reference is inaccessible, say so and work from the evidence that is available.

Separate confirmed facts from assumptions. Never invent brand, audience, product, policy, or asset-rights claims. Where evidence is thin, make a modest, reversible choice and label it as a working assumption.

## 2. Write a concise art-direction brief

Before changing the interface, communicate a short brief with:

| Decision | Define |
|---|---|
| Audience and task | Who is using this, in what context, and what should they accomplish? |
| Brand personality | Three useful traits, supported by evidence or marked as provisional. |
| Positioning | The intended distinction and emotional impression; avoid empty labels such as “modern.” |
| Visual concept | One sentence describing the organizing idea for this experience. |
| Typography | Typeface personality and the hierarchy's display, heading, body, navigation, product, price, and label roles. |
| Color | Brand, secondary, background/surface, text, border, interaction, and semantic roles. |
| Image direction | Subject, lighting, composition, crop/ratio, backdrop, and consistency. |
| Composition | Focal point, reading sequence, widths, section rhythm, density, and mobile transformation. |
| Components and interaction | Surface character, action prominence, state feedback, and motion restraint. |
| Rationale | Why the direction fits this task, audience, content, and available evidence. |

Keep the brief concise for small changes; expand it when the page, brand, or references call for more decisions. Ask a focused question only when a consequential choice cannot be inferred. Otherwise proceed with an explicit, reversible assumption.

## 3. Turn the brief into a composition

Sketch the page as a sequence of visual beats before coding:

1. Identify the initial focal point and immediate user question.
2. Place the primary action and decision-critical information where they are understandable.
3. Group related content and choose widths and proportions based on relative importance.
4. Vary scale and density across sections with purpose—such as an expansive image, compact utility band, constrained editorial copy, or product-led grid—rather than repeating a template.
5. Decide how image placement, crop, alignment, color, and typography support each beat.
6. Recompose for mobile: establish the new reading order, image priority, control access, and information density rather than merely stacking desktop columns.

Do not use the examples above as a new fixed sequence. The content and task determine the composition.

## 4. Art-direct imagery

- Prefer accurate, available product images for commerce. Preserve product identity, color, scale, and important detail.
- For lifestyle imagery, specify how subject, environment, light, palette, composition, and crop express the brand concept.
- Keep a product range visually consistent without making every image feel mechanically identical.
- Avoid arbitrary stock, unsupported claims about image provenance, and decorative images that compete with the content.
- If an image-generation tool is actually available and the user explicitly requests image creation, convert the direction into a precise prompt covering subject, setting, lighting, composition, palette, crop, and exclusions. Do not claim generation unless the tool was used; do not assume design instructions grant image-generation capability.

## 5. Validate whether the direction survived implementation

Inspect the rendered desktop and mobile experience. Compare it with the brief: does the composition, hierarchy, type, palette, image treatment, and interaction still express the same concept? Apply the ten-category score and critique from [the visual-quality checklist](./visual-quality-checklist.md). Identify the weakest three areas, fix meaningful gaps, and inspect again. If a choice fails, revise the design rather than explaining the mismatch away.

## Reference and design-system resources

When useful for a real interaction or accessibility question, consult authoritative resources such as Material Design, Apple Human Interface Guidelines, Shopify Polaris, Atlassian Design System, Radix UI documentation, or Nielsen Norman Group. Confirm relevance and current guidance. Borrow interaction principles, accessibility requirements, and consistency patterns—not a visual style by default.
