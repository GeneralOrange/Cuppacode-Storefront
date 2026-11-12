import "server-only";

import { CmsError } from "@/content/core/cms-error";
import type {
  CmsImage,
  CmsPage,
  CmsSeoMetadata,
  ContentProvider,
  Page,
  Post,
} from "@/content/core/content-provider";
import { getCmsMediaOrigins } from "@/config/cms-media";
import { cmsHtmlToText } from "@/content/sanitize-cms-content";

const CMS_PAGES_TAG = "cms-pages";
const PAGE_CACHE_SECONDS = 3600;
const REQUEST_TIMEOUT_MS = 10_000;
const PAGE_SIZE = 100;

interface WordPressImage {
  source_url?: string;
  alt_text?: string;
  width?: number;
  height?: number;
  media_details?: {
    width?: number;
    height?: number;
  };
}

interface WordPressRecord {
  id: number;
  slug: string;
  status: string;
  date?: string;
  title?: { rendered?: string };
  content?: { rendered?: string };
  excerpt?: { rendered?: string };
  modified?: string;
  parent?: number;
  menu_order?: number;
  featured_media?: number;
  jetpack_featured_media_url?: string;
  _embedded?: { "wp:featuredmedia"?: WordPressImage[] };
  yoast_head_json?: {
    title?: string;
    description?: string;
    canonical?: string;
    og_title?: string;
  };
}

interface WordPressRecordsResponse {
  response: Response;
  records: WordPressRecord[];
}

function parseImage(record: WordPressRecord): CmsImage | undefined {
  const image = record._embedded?.["wp:featuredmedia"]?.[0];
  if (!image?.source_url) return undefined;

  let mediaUrl: URL;
  try {
    mediaUrl = new URL(image.source_url);
  } catch {
    return undefined;
  }
  if (
    !["http:", "https:"].includes(mediaUrl.protocol) ||
    !getCmsMediaOrigins().includes(mediaUrl.origin)
  ) return undefined;

  const width = image.media_details?.width ?? image.width;
  const height = image.media_details?.height ?? image.height;

  return {
    url: mediaUrl.toString(),
    alt: image.alt_text?.trim() || "",
    ...(Number.isInteger(width) && width! > 0 ? { width } : {}),
    ...(Number.isInteger(height) && height! > 0 ? { height } : {}),
  };
}

function parseSeo(record: WordPressRecord): CmsSeoMetadata | undefined {
  const seo = record.yoast_head_json;
  if (!seo) return undefined;

  const metadata: CmsSeoMetadata = {
    title: cmsHtmlToText(seo.title),
    description: cmsHtmlToText(seo.description),
    canonicalUrl: safeCanonicalUrl(seo.canonical),
    openGraphTitle: cmsHtmlToText(seo.og_title),
  };

  return Object.values(metadata).some(Boolean) ? metadata : undefined;
}

function safeCanonicalUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) && !url.username && !url.password
      ? url.toString()
      : undefined;
  } catch {
    return undefined;
  }
}

function mapPage(record: WordPressRecord): CmsPage | null {
  if (record.status !== "publish") return null;

  const title = cmsHtmlToText(record.title?.rendered);
  if (!title || !record.slug || typeof record.content?.rendered !== "string") {
    throw new CmsError("WordPress returned an invalid page record", "INVALID_RESPONSE");
  }

  return {
    id: String(record.id),
    slug: record.slug,
    title,
    content: record.content.rendered,
    excerpt: cmsHtmlToText(record.excerpt?.rendered),
    featuredImage: parseImage(record),
    status: "published",
    modifiedAt: record.modified,
    parentId: record.parent ? String(record.parent) : null,
    menuOrder: Number.isInteger(record.menu_order) ? record.menu_order! : 0,
    seo: parseSeo(record),
  };
}

function mapPost(record: WordPressRecord): Post | null {
  if (record.status !== "publish") return null;

  const title = cmsHtmlToText(record.title?.rendered);
  if (!title || !record.slug || typeof record.content?.rendered !== "string") {
    throw new CmsError("WordPress returned an invalid post record", "INVALID_RESPONSE");
  }

  return {
    id: String(record.id),
    slug: record.slug,
    title,
    content: record.content.rendered,
    excerpt: cmsHtmlToText(record.excerpt?.rendered),
    publishedAt: record.date ?? "",
    featuredImage:
      record.jetpack_featured_media_url ??
      record._embedded?.["wp:featuredmedia"]?.[0]?.source_url,
  };
}

export class WordPressCmsProvider implements ContentProvider {
  private readonly baseUrl: string;

  constructor(baseUrl = process.env.WORDPRESS_URL) {
    if (!baseUrl) {
      throw new CmsError(
        "Missing required server environment variable: WORDPRESS_URL",
        "CONFIGURATION_ERROR",
      );
    }

    let url: URL;
    try {
      url = new URL(baseUrl);
    } catch {
      throw new CmsError("WORDPRESS_URL must be an absolute URL", "CONFIGURATION_ERROR");
    }
    if (
      !["http:", "https:"].includes(url.protocol) ||
      url.username ||
      url.password ||
      url.search ||
      url.hash
    ) {
      throw new CmsError("WORDPRESS_URL must use HTTP(S) without credentials", "CONFIGURATION_ERROR");
    }
    this.baseUrl = url.toString().replace(/\/$/, "");
  }

  private async requestRecords(
    path: string,
    tags: string[],
    allowNotFound = false,
  ): Promise<WordPressRecordsResponse> {
    const url = new URL(`${this.baseUrl}/wp-json/wp/v2${path}`);
    url.searchParams.set("_embed", "wp:featuredmedia");

    let response: Response;
    try {
      response = await fetch(url, {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        next: { revalidate: PAGE_CACHE_SECONDS, tags },
      });
    } catch (error) {
      const timedOut = error instanceof Error && error.name === "TimeoutError";
      throw new CmsError(
        timedOut ? "WordPress request timed out" : "Unable to reach WordPress",
        timedOut ? "TIMEOUT" : "NETWORK_ERROR",
      );
    }

    if (response.status === 404) {
      if (!allowNotFound) {
        throw new CmsError(
          "WordPress page request failed with status 404",
          "UPSTREAM_ERROR",
          response.status,
        );
      }
      return { response, records: [] };
    }
    if (!response.ok) {
      throw new CmsError(
        `WordPress page request failed with status ${response.status}`,
        "UPSTREAM_ERROR",
        response.status,
      );
    }

    let body: unknown;
    try {
      body = await response.json();
    } catch {
      throw new CmsError("WordPress returned invalid JSON", "INVALID_RESPONSE");
    }

    const records = Array.isArray(body) ? body : [body];
    if (!records.every((record) => record && typeof record === "object")) {
      throw new CmsError("WordPress returned an invalid page collection", "INVALID_RESPONSE");
    }

    return { response, records: records as WordPressRecord[] };
  }

  async getPageBySlug(slug: string): Promise<CmsPage | null> {
    if (!slug.trim()) return null;

    const params = new URLSearchParams({
      slug,
      status: "publish",
      per_page: "1",
    });
    const { records } = await this.requestRecords(
      `/pages?${params}`,
      [CMS_PAGES_TAG, `cms-page-${slug}`],
    );
    return records[0] ? mapPage(records[0]) : null;
  }

  getPage(slug: string): Promise<Page | null> {
    return this.getPageBySlug(slug);
  }

  async getPageById(id: string): Promise<CmsPage | null> {
    if (!/^[1-9]\d*$/.test(id)) return null;

    const { records } = await this.requestRecords(
      `/pages/${encodeURIComponent(id)}?context=view`,
      [CMS_PAGES_TAG, `cms-page-id-${id}`],
      true,
    );
    return records[0] ? mapPage(records[0]) : null;
  }

  async getPages(): Promise<CmsPage[]> {
    const first = await this.requestRecords(
      `/pages?status=publish&per_page=${PAGE_SIZE}&page=1`,
      [CMS_PAGES_TAG],
    );
    const totalPagesHeader = first.response.headers.get("X-WP-TotalPages");
    const laterPages: WordPressRecordsResponse[] = [];
    if (totalPagesHeader !== null) {
      const totalPages = Number(totalPagesHeader);
      if (!Number.isInteger(totalPages) || totalPages < 0) {
        throw new CmsError("WordPress returned invalid pagination metadata", "INVALID_RESPONSE");
      }
      if (totalPages === 0 && first.records.length > 0) {
        throw new CmsError("WordPress returned invalid pagination metadata", "INVALID_RESPONSE");
      }
      if (totalPages > 1) {
        laterPages.push(...await Promise.all(
          Array.from({ length: totalPages - 1 }, (_, index) =>
            this.requestRecords(
              `/pages?status=publish&per_page=${PAGE_SIZE}&page=${index + 2}`,
              [CMS_PAGES_TAG],
            ),
          ),
        ));
      }
    } else {
      let pageNumber = 2;
      let page = first;
      while (page.records.length === PAGE_SIZE) {
        page = await this.requestRecords(
          `/pages?status=publish&per_page=${PAGE_SIZE}&page=${pageNumber}`,
          [CMS_PAGES_TAG],
        );
        laterPages.push(page);
        pageNumber += 1;
      }
    }

    return [first, ...laterPages]
      .flatMap(({ records }) => records)
      .map(mapPage)
      .filter((page): page is CmsPage => page !== null);
  }

  async getPosts(): Promise<Post[]> {
    const { records } = await this.requestRecords(
      "/posts?status=publish",
      ["cms-posts"],
    );
    return records
      .map(mapPost)
      .filter((post): post is Post => post !== null);
  }

  async getPost(slug: string): Promise<Post | null> {
    if (!slug.trim()) return null;
    const params = new URLSearchParams({ slug, status: "publish", per_page: "1" });
    const { records } = await this.requestRecords(
      `/posts?${params}`,
      ["cms-posts", `cms-post-${slug}`],
    );
    return records[0] ? mapPost(records[0]) : null;
  }
}

export { WordPressCmsProvider as WordPressContentProvider };
