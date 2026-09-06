export interface Page {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
}

export interface Post extends Page {
  publishedAt: string;
  featuredImage?: string;
}

export interface ContentProvider {
  getPage(slug: string): Promise<Page | null>;
  getPosts(): Promise<Post[]>;
  getPost(slug: string): Promise<Post | null>;
}
