import type { ContentProvider } from "./core/content-provider";
import { WordPressContentProvider } from "./wordpress/wordpress-content-provider";

export function getContentProvider(): ContentProvider {
  return new WordPressContentProvider();
}
