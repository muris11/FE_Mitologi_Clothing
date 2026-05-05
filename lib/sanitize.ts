import sanitizeHtmlLib from "sanitize-html";

/**
 * Sanitize HTML string using sanitize-html library.
 * This provides robust protection against XSS attacks while preserving
 * safe HTML content from the CMS.
 *
 * @see https://github.com/apostrophecms/sanitize-html
 */
export function sanitizeHtmlContent(html: string): string {
  if (!html) return "";

  return sanitizeHtmlLib(html, {
    allowedTags: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "br",
      "hr",
      "strong",
      "em",
      "b",
      "i",
      "u",
      "s",
      "strike",
      "sub",
      "sup",
      "ul",
      "ol",
      "li",
      "dl",
      "dt",
      "dd",
      "a",
      "img",
      "table",
      "thead",
      "tbody",
      "tfoot",
      "tr",
      "th",
      "td",
      "caption",
      "colgroup",
      "col",
      "article",
      "section",
      "nav",
      "aside",
      "header",
      "footer",
      "main",
      "figure",
      "figcaption",
      "blockquote",
      "cite",
      "q",
      "abbr",
      "address",
      "time",
      "mark",
      "small",
      "del",
      "ins",
      "pre",
      "code",
      "kbd",
      "samp",
      "var",
      "div",
      "span",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      table: ["border", "cellpadding", "cellspacing"],
      td: ["colspan", "rowspan"],
      th: ["colspan", "rowspan"],
      ol: ["start", "type"],
      ul: ["type"],
      li: ["value"],
      time: ["datetime"],
      abbr: ["title"],
      "*": ["class", "id", "style"],
    },
    allowedSchemes: ["https", "http", "mailto", "tel"],
    allowedSchemesAppliedToAttributes: ["href", "src"],
    allowProtocolRelative: false,
    transformTags: {
      a: sanitizeHtmlLib.simpleTransform("a", {}, true),
    },
    disallowedTagsMode: "discard",
  });
}

/**
 * Sanitize product description - more permissive for CMS content
 */
export function sanitizeProductDescription(html: string): string {
  return sanitizeHtmlContent(html);
}

/**
 * Sanitize plain text - escapes HTML entities
 */
export function sanitizePlainText(text: string): string {
  if (!text) return "";
  return sanitizeHtmlLib(text, {
    allowedTags: [],
    allowedAttributes: {},
  });
}

export { sanitizeHtmlContent as sanitizeHtml };
