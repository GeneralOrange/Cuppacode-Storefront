import "server-only";

import type { ContentProvider, Page, Post } from "@/content/core/content-provider";
import { CommerceError } from "@/commerce/core/errors/commerce-error";

interface WordPressRecord {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt?: { rendered: string };
  jetpack_featured_media_url?: string;
}

export class WordPressContentProvider implements ContentProvider {
  private readonly baseUrl: string;

  constructor() {
    const url = process.env.WORDPRESS_URL;
    if (!url) {
      throw new CommerceError(
        "Missing required server environment variable: WORDPRESS_URL",
        "CONFIGURATION_ERROR",
      );
    }
    this.baseUrl = url.replace(/\/$/, "");
  }

  private async request<T>(path: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}/wp-json/wp/v2${path}`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) {
      throw new CommerceError("WordPress content request failed", "UNKNOWN_ERROR", response.status);
    }
    return response.json() as Promise<T>;
  }

  private mapPage(record: WordPressRecord): Page {
    return {
      id: String(record.id),
      slug: record.slug,
      title: record.title.rendered,
      content: record.content.rendered,
      excerpt: record.excerpt?.rendered,
    };
  }

  async getPage(slug: string): Promise<Page | null> {
    const records = await this.request<WordPressRecord[]>(`/pages?slug=${encodeURIComponent(slug)}`);
    return records[0] ? this.mapPage(records[0]) : null;
  }

  async getPosts(): Promise<Post[]> {
    const records = await this.request<WordPressRecord[]>("/posts");
    return records.map((record) => ({
      ...this.mapPage(record),
      publishedAt: record.date,
      featuredImage: record.jetpack_featured_media_url,
    }));
  }

  async getPost(slug: string): Promise<Post | null> {
    const records = await this.request<WordPressRecord[]>(`/posts?slug=${encodeURIComponent(slug)}`);
    const record = records[0];
    return record
      ? {
          ...this.mapPage(record),
          publishedAt: record.date,
          featuredImage: record.jetpack_featured_media_url,
        }
      : null;
  }
}
