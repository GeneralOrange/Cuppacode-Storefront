# Typography and Layout

Treat typography and layout as structural parts of the visual identity. Their job is to make content legible and persuasive while shaping hierarchy, pace, and tone.

## Choose type with evidence

- Inspect the project's existing fonts, loading mechanism, available weights, language coverage, and fallback stack before changing them.
- Choose for brand character and sustained readability, not novelty alone. Consider how the typeface looks in a large heading, small label, product name, and dense body copy.
- Avoid adding a font provider or multiple families without a clear identity or technical reason. Prefer the project's optimized or local font-loading strategy.
- Do not rely on a very light weight, tiny labels, excessive all-caps, or tight letter spacing for a premium effect.

## Define typographic roles

Establish a clear hierarchy instead of styling each element independently:

| Role | Design for |
|---|---|
| Display | Distinctive first impression, controlled measure, deliberate line breaks, responsive size. |
| Page/section headings | Scannable structure, consistent levels, useful rather than decorative wrapping. |
| Body and supporting copy | Comfortable reading size, line-height, measure, and paragraph rhythm. |
| Navigation | Fast scanning, clear current state, usable hit areas, concise labels. |
| Product name and description | Product recognition, stable wrapping in lists, informative secondary copy. |
| Price and commerce metadata | Easy comparison; clearly distinguish base/from price, unit, sale, and supporting facts where applicable. |
| Labels and controls | Legible at real sizes, unambiguous, consistent casing, adequate tap target. |

Pair size, weight, line-height, measure, and spacing to communicate each role. Do not make every element equally bold or prominent. Use semantic heading order even when visual styling differs.

## Tune responsive typography

- Define fluid or breakpoint-based type behavior according to the project's established conventions.
- Check actual text wrapping at narrow phone, typical phone, tablet when relevant, and desktop widths.
- Give display text a controlled measure; prevent a heading from creating an orphan line, collision, or dominating the page.
- Keep body copy readable without overly long lines. Avoid increasing font size while leaving line-height and measure unexamined.
- Inspect navigation, prices, labels, and buttons under real content; handle localization and longer product names where applicable.
- Avoid hiding decision-critical copy merely to preserve a desktop composition.

## Build a layout around content

- Identify focal point, reading order, content relationships, and the intended density before selecting columns.
- Choose page widths, column ratios, gutters, and section spacing to suit copy length, imagery, and functional priority. Do not force equal columns when importance is unequal.
- Use a small, consistent set of alignment edges. Align text, controls, and media where a shared edge strengthens the composition; break alignment only with intent.
- Use whitespace to separate unlike content, group related content, and direct attention. Treat it as a measured resource, not empty filler.
- Change section scale or alignment when it advances the visual narrative. Maintain rhythm without repeating the same section silhouette.
- Reserve component padding, image ratio, and control height for usability and content. Do not solve every layout problem by adding a container or surface.

## Relationship of type and imagery

- Check how image subject placement relates to nearby text, action, and crop. Do not put essential copy over a busy image without adequate contrast.
- Use image aspect ratios consistently where comparison helps, and intentionally vary them where storytelling benefits.
- Keep product imagery faithful and easy to compare; do not let an oversized headline or decorative treatment overwhelm the merchandise.
- Ensure captions, labels, and overlay text remain readable at every viewport and do not obscure important image detail.

## Final inspection

Read the page at realistic content lengths and zoom levels. Inspect line breaks, contrast, content order, image-to-text balance, alignment, density, and overflow in the rendered browser. If a font fails readability or responsive wrapping, revise the role, measure, scale, or font choice instead of accepting awkward output.
