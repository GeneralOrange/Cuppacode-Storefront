import { describe, expect, it, vi } from "vitest";
import { cmsHtmlToText, sanitizeCmsContent } from "./sanitize-cms-content";

vi.mock("server-only", () => ({}));

describe("CMS content sanitization", () => {
  it("keeps Gutenberg basics while removing scripts, event handlers, and unsafe links", () => {
    const html = [
      "<!-- wp:heading --><h1>Information</h1><!-- /wp:heading -->",
      "<p onclick=\"alert(1)\"><strong>Useful</strong> <em>details</em></p>",
      "<ul><li>First</li><li>Second</li></ul>",
      "<a href=\"javascript:alert(1)\">unsafe link</a>",
      "<script>alert('xss')</script>",
    ].join("");

    const sanitized = sanitizeCmsContent(html, ["https://germat.example"]);

    expect(sanitized).toContain("<h2>Information</h2>");
    expect(sanitized).toContain("<strong>Useful</strong>");
    expect(sanitized).toContain("<em>details</em>");
    expect(sanitized).toContain("<ul>");
    expect(sanitized).not.toContain("onclick");
    expect(sanitized).not.toContain("javascript:");
    expect(sanitized).not.toContain("<script");
  });

  it("preserves safe images and captions but removes unapproved image hosts", () => {
    const html = [
      "<figure><img src=\"https://germat.example/media/tool.jpg\" alt=\"Gereedschap\" width=\"800\" height=\"600\"></figure>",
      "<img src=\"https://tracker.example/pixel.jpg\" alt=\"Tracking pixel\">",
      "<figcaption>Voorbeeldcaption</figcaption>",
    ].join("");

    const sanitized = sanitizeCmsContent(html, ["https://germat.example"]);

    expect(sanitized).toContain("https://germat.example/media/tool.jpg");
    expect(sanitized).toContain("loading=\"lazy\"");
    expect(sanitized).toContain("Voorbeeldcaption");
    expect(sanitized).not.toContain("tracker.example");
  });

  it("supports semantic tables, captions, blockquotes, and separators", () => {
    const html = "<table><caption>Overzicht</caption><thead><tr><th scope=\"col\">Type</th></tr></thead><tbody><tr><td>PEX</td></tr></tbody></table><blockquote><p>Quote</p></blockquote><hr>";
    const sanitized = sanitizeCmsContent(html, []);

    expect(sanitized).toContain("<table>");
    expect(sanitized).toContain("<caption>Overzicht</caption>");
    expect(sanitized).toContain("<th scope=\"col\">Type</th>");
    expect(sanitized).toContain("<blockquote>");
    expect(sanitized).toContain("<hr");
  });

  it("converts WordPress rendered title and excerpt HTML to plain text", () => {
    expect(cmsHtmlToText("<p>Contact <strong>&amp; advies</strong></p>"))
      .toBe("Contact & advies");
  });
});
