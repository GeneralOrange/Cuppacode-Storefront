import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { CmsFeaturedImage } from "./cms-featured-image";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    width,
    height,
    sizes,
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
    sizes: string;
  }) => (
    <span
      role="img"
      aria-label={alt}
      data-src={src}
      data-width={width}
      data-height={height}
      data-sizes={sizes}
    />
  ),
}));

describe("CMS featured image", () => {
  it("renders the original media URL with alt text, dimensions, and responsive sizes", () => {
    const markup = renderToStaticMarkup(
      <CmsFeaturedImage
        image={{
          url: "https://germat.example/wp-content/uploads/page.jpg",
          alt: "Gereedschap op een werkbank",
          width: 1200,
          height: 800,
        }}
      />,
    );

    expect(markup).toContain('aria-label="Gereedschap op een werkbank"');
    expect(markup).toContain('data-src="https://germat.example/wp-content/uploads/page.jpg"');
    expect(markup).toContain('data-width="1200"');
    expect(markup).toContain('data-height="800"');
    expect(markup).toContain('data-sizes="(max-width: 768px) 100vw, 768px"');
  });
});
