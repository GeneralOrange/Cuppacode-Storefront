import { afterEach, describe, expect, it, vi } from "vitest";
import { CmsError } from "@/content/core/cms-error";
import { WordPressCmsProvider } from "./wordpress-content-provider";

vi.mock("server-only", () => ({}));

const originalWordPressUrl = process.env.WORDPRESS_URL;

function wordpressRecord(overrides: Record<string, unknown> = {}) {
  return {
    id: 21,
    slug: "over-ons",
    status: "publish",
    date: "2026-02-20T08:30:00",
    title: { rendered: "Over ons &amp; Germat" },
    content: { rendered: "<p>Pagina-inhoud</p>" },
    excerpt: { rendered: "<p>Een <strong>voorbeeld</strong>.</p>" },
    modified: "2026-03-01T10:00:00",
    parent: 0,
    menu_order: 2,
    _embedded: {
      "wp:featuredmedia": [{
        source_url: "https://germat.example/wp-content/uploads/over-ons.jpg",
        alt_text: "Germat team",
        media_details: { width: 1200, height: 800 },
      }],
    },
    yoast_head_json: {
      title: "Over ons | Germat",
      description: "Meer informatie",
      canonical: "https://germat.example/over-ons/",
      og_title: "Over Germat",
    },
    ...overrides,
  };
}

function response(
  body: unknown,
  options: { status?: number; headers?: Record<string, string> } = {},
) {
  return new Response(body === undefined ? null : JSON.stringify(body), {
    status: options.status ?? 200,
    headers: options.headers,
  });
}

describe("WordPressCmsProvider", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    if (originalWordPressUrl === undefined) delete process.env.WORDPRESS_URL;
    else process.env.WORDPRESS_URL = originalWordPressUrl;
  });

  it("normalizes a published page and requests the slug from the public REST API", async () => {
    process.env.WORDPRESS_URL = "https://germat.example";
    const fetchMock = vi.fn().mockResolvedValue(response([wordpressRecord()]));
    vi.stubGlobal("fetch", fetchMock);
    const provider = new WordPressCmsProvider();

    const page = await provider.getPageBySlug("over-ons");

    expect(page).toMatchObject({
      id: "21",
      slug: "over-ons",
      title: "Over ons & Germat",
      content: "<p>Pagina-inhoud</p>",
      excerpt: "Een voorbeeld.",
      status: "published",
      parentId: null,
      menuOrder: 2,
      featuredImage: {
        url: "https://germat.example/wp-content/uploads/over-ons.jpg",
        alt: "Germat team",
        width: 1200,
        height: 800,
      },
      seo: {
        title: "Over ons | Germat",
        description: "Meer informatie",
        canonicalUrl: "https://germat.example/over-ons/",
        openGraphTitle: "Over Germat",
      },
    });

    const requestUrl = new URL(fetchMock.mock.calls[0][0]);
    expect(requestUrl.pathname).toBe("/wp-json/wp/v2/pages");
    expect(requestUrl.searchParams.get("slug")).toBe("over-ons");
    expect(requestUrl.searchParams.get("status")).toBe("publish");
    expect(requestUrl.searchParams.get("_embed")).toBe("wp:featuredmedia");
    expect(fetchMock.mock.calls[0][1]).toMatchObject({
      next: { revalidate: 3600, tags: ["cms-pages", "cms-page-over-ons"] },
    });
  });

  it("normalizes pages by id and hides drafts", async () => {
    process.env.WORDPRESS_URL = "https://germat.example";
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(response([wordpressRecord()]))
      .mockResolvedValueOnce(response(wordpressRecord({ status: "draft" })));
    vi.stubGlobal("fetch", fetchMock);
    const provider = new WordPressCmsProvider();

    await expect(provider.getPageById("21")).resolves.toMatchObject({ id: "21" });
    await expect(provider.getPageById("21")).resolves.toBeNull();
    await expect(provider.getPageById("not-an-id")).resolves.toBeNull();
  });

  it("loads every published collection page across WordPress pagination", async () => {
    process.env.WORDPRESS_URL = "https://germat.example";
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(response([wordpressRecord()], {
        headers: { "X-WP-TotalPages": "2" },
      }))
      .mockResolvedValueOnce(response([wordpressRecord({
        id: 22,
        slug: "contact",
        status: "publish",
      })]));
    vi.stubGlobal("fetch", fetchMock);
    const provider = new WordPressCmsProvider();

    const pages = await provider.getPages();

    expect(pages.map((page) => page.slug)).toEqual(["over-ons", "contact"]);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(new URL(fetchMock.mock.calls[1][0]).searchParams.get("page")).toBe("2");
  });

  it("returns null for missing pages and rejects upstream failures", async () => {
    process.env.WORDPRESS_URL = "https://germat.example";
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(response([]))
      .mockResolvedValueOnce(response({ message: "private details" }, { status: 500 }));
    vi.stubGlobal("fetch", fetchMock);
    const provider = new WordPressCmsProvider();

    await expect(provider.getPageBySlug("missing")).resolves.toBeNull();
    await expect(provider.getPageBySlug("unavailable")).rejects.toMatchObject({
      name: "CmsError",
      code: "UPSTREAM_ERROR",
      status: 500,
    } satisfies Partial<CmsError>);
  });

  it("maps request timeouts to a CMS timeout error", async () => {
    process.env.WORDPRESS_URL = "https://germat.example";
    const timeout = Object.assign(new Error("timed out"), { name: "TimeoutError" });
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(timeout));
    const provider = new WordPressCmsProvider();

    await expect(provider.getPages()).rejects.toMatchObject({
      name: "CmsError",
      code: "TIMEOUT",
    });
  });

  it("rejects a WordPress base URL containing credentials", () => {
    expect(() => new WordPressCmsProvider("https://user:pass@germat.example"))
      .toThrowError(CmsError);
  });

  it("preserves the existing published post methods", async () => {
    process.env.WORDPRESS_URL = "https://germat.example";
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(response([wordpressRecord({
        jetpack_featured_media_url: "https://germat.example/wp-content/uploads/post.jpg",
      })]))
      .mockResolvedValueOnce(response([wordpressRecord()]));
    vi.stubGlobal("fetch", fetchMock);
    const provider = new WordPressCmsProvider();

    await expect(provider.getPosts()).resolves.toMatchObject([{
      id: "21",
      slug: "over-ons",
      publishedAt: "2026-02-20T08:30:00",
      featuredImage: "https://germat.example/wp-content/uploads/post.jpg",
    }]);
    await expect(provider.getPost("over-ons")).resolves.toMatchObject({
      slug: "over-ons",
      title: "Over ons & Germat",
    });
    expect(new URL(fetchMock.mock.calls[0][0]).pathname).toBe("/wp-json/wp/v2/posts");
  });
});
