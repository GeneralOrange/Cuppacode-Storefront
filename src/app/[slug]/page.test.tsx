import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { CmsPage } from "@/content/core/content-provider";

const { getPageBySlug, notFound } = vi.hoisted(() => ({
  getPageBySlug: vi.fn(),
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

vi.mock("server-only", () => ({}));
vi.mock("next/navigation", () => ({ notFound }));
vi.mock("@/content/provider", () => ({
  getContentProvider: () => ({ getPageBySlug }),
}));
vi.mock("@/components/layout/site-shell", () => ({
  SiteShell: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

import CmsPageRoute, { generateMetadata } from "./page";

const page: CmsPage = {
  id: "mock-contact",
  slug: "contact",
  title: "Contact Germat",
  content: "<h2>Neem contact op</h2><p>Voorbeeldtekst.</p>",
  excerpt: "Contactgegevens.",
  status: "published",
  parentId: null,
  menuOrder: 1,
};

describe("CMS page route", () => {
  beforeEach(() => {
    getPageBySlug.mockReset();
    notFound.mockClear();
  });

  it("renders a normalized mock page inside the storefront shell", async () => {
    getPageBySlug.mockResolvedValue(page);

    const element = await CmsPageRoute({
      params: Promise.resolve({ slug: "contact" }),
      searchParams: Promise.resolve({}),
    });
    const markup = renderToStaticMarkup(element);

    expect(markup).toContain("<h1");
    expect(markup).toContain("Contact Germat");
    expect(markup).toContain("<h2>Neem contact op</h2>");
    expect(markup).toContain("Voorbeeldtekst.");
  });

  it("returns a 404 for an unpublished or unknown slug", async () => {
    getPageBySlug.mockResolvedValue(null);

    await expect(CmsPageRoute({
      params: Promise.resolve({ slug: "unknown" }),
      searchParams: Promise.resolve({}),
    })).rejects.toThrow("NEXT_NOT_FOUND");
    expect(notFound).toHaveBeenCalledOnce();
  });

  it("does not pass reserved storefront paths to the CMS provider", async () => {
    await expect(CmsPageRoute({
      params: Promise.resolve({ slug: "product" }),
      searchParams: Promise.resolve({}),
    })).rejects.toThrow("NEXT_NOT_FOUND");
    expect(getPageBySlug).not.toHaveBeenCalled();
  });

  it("uses CMS SEO metadata when available", async () => {
    getPageBySlug.mockResolvedValue({
      ...page,
      seo: {
        title: "Contact | Germat",
        description: "Neem contact op.",
        canonicalUrl: "https://germat.example/contact/",
      },
    });

    await expect(generateMetadata({
      params: Promise.resolve({ slug: "contact" }),
      searchParams: Promise.resolve({}),
    })).resolves.toMatchObject({
      title: "Contact | Germat",
      description: "Neem contact op.",
      alternates: { canonical: "https://germat.example/contact/" },
    });
  });
});
