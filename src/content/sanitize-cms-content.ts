import "server-only";

import { decodeHTML } from "entities";
import sanitizeHtml from "sanitize-html";

const allowedTags = [
  "a",
  "b",
  "blockquote",
  "br",
  "caption",
  "cite",
  "code",
  "dd",
  "del",
  "div",
  "dl",
  "dt",
  "em",
  "figcaption",
  "figure",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hr",
  "i",
  "img",
  "li",
  "ol",
  "p",
  "s",
  "small",
  "source",
  "span",
  "strong",
  "sub",
  "sup",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "tr",
  "u",
  "ul",
];

function isAllowedMediaUrl(value: string | undefined, origins: Set<string>): boolean {
  if (!value) return false;
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) && origins.has(url.origin);
  } catch {
    return false;
  }
}

function filterSrcSet(
  srcSet: string | undefined,
  origins: Set<string>,
): string | undefined {
  if (!srcSet) return undefined;
  const candidates = srcSet.split(",").map((candidate) => candidate.trim()).filter(Boolean);
  if (!candidates.length) return undefined;
  if (candidates.some((candidate) => !isAllowedMediaUrl(candidate.split(/\s+/, 1)[0], origins))) {
    return undefined;
  }
  return candidates.join(", ");
}

export function sanitizeCmsContent(
  content: string,
  allowedMediaOrigins: string[],
): string {
  const origins = new Set(allowedMediaOrigins);

  return sanitizeHtml(content, {
    allowedTags,
    allowedAttributes: {
      a: ["href", "rel", "target"],
      img: ["alt", "height", "loading", "sizes", "src", "srcset", "width"],
      source: ["media", "sizes", "srcset", "type"],
      td: ["colspan", "rowspan"],
      th: ["colspan", "rowspan", "scope"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesAppliedToAttributes: ["href", "src", "cite"],
    allowProtocolRelative: false,
    transformTags: {
      a: (tagName, attributes) => ({
        tagName,
        attribs: {
          ...attributes,
          ...(attributes.target === "_blank"
            ? { rel: "noopener noreferrer" }
            : {}),
        },
      }),
      h1: "h2",
      img: (_tagName, attributes) => {
        const src = attributes.src;
        if (!isAllowedMediaUrl(src, origins)) {
          return {
            tagName: "span",
            text: attributes.alt || "",
            attribs: {},
          };
        }

        const srcSet = filterSrcSet(attributes.srcset, origins);
        const attribs: Record<string, string> = {
          ...attributes,
          src,
          loading: "lazy",
        };
        if (srcSet) attribs.srcset = srcSet;
        else delete attribs.srcset;

        return {
          tagName: "img",
          attribs,
        };
      },
      source: (_tagName, attributes) => {
        const srcSet = filterSrcSet(attributes.srcset, origins);
        return {
          tagName: "source",
          attribs: srcSet ? { ...attributes, srcset: srcSet } : {},
        };
      },
    },
  });
}

export function cmsHtmlToText(value: string | undefined): string | undefined {
  if (!value) return undefined;
  return decodeHTML(sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} }))
    .replace(/\s+/g, " ")
    .trim();
}
