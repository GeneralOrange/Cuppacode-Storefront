export interface CmsImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface CmsSeoMetadata {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  openGraphTitle?: string;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
}

export interface CmsPage extends Page {
  featuredImage?: CmsImage;
  status: "published";
  modifiedAt?: string;
  parentId: string | null;
  menuOrder: number;
  seo?: CmsSeoMetadata;
}

export interface Post extends Page {
  publishedAt: string;
  featuredImage?: string;
}

export interface ContentProvider {
  getPageBySlug(slug: string): Promise<CmsPage | null>;
  getPages(): Promise<CmsPage[]>;
  getPageById(id: string): Promise<CmsPage | null>;
  getPage(slug: string): Promise<Page | null>;
  getPosts(): Promise<Post[]>;
  getPost(slug: string): Promise<Post | null>;
}
