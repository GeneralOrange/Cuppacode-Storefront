import "server-only";

import { CmsError } from "@/content/core/cms-error";
import type { ContentProvider } from "@/content/core/content-provider";
import { MockCmsProvider } from "@/content/mock/mock-cms-provider";
import { WordPressCmsProvider } from "@/content/wordpress/wordpress-content-provider";

export type CmsProviderName = "mock" | "wordpress";

export function getCmsProviderName(): CmsProviderName {
  const provider = process.env.CMS_PROVIDER || "mock";

  if (provider !== "mock" && provider !== "wordpress") {
    throw new CmsError(
      `Unsupported CMS_PROVIDER: ${provider}`,
      "CONFIGURATION_ERROR",
    );
  }

  return provider;
}

export function getContentProvider(): ContentProvider {
  switch (getCmsProviderName()) {
    case "mock":
      return new MockCmsProvider();
    case "wordpress":
      return new WordPressCmsProvider();
  }
}
