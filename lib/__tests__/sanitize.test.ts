import { describe, expect, it } from "vitest";
import { sanitizeHtmlContent, sanitizePlainText } from "../sanitize";

describe("sanitizeHtmlContent", () => {
  it("allows safe HTML tags", () => {
    const html = "<p>Hello <strong>world</strong></p>";
    expect(sanitizeHtmlContent(html)).toBe(
      "<p>Hello <strong>world</strong></p>",
    );
  });

  it("strips script tags (XSS prevention)", () => {
    const html = '<p>Hello</p><script>alert("xss")</script>';
    expect(sanitizeHtmlContent(html)).toBe("<p>Hello</p>");
  });

  it("strips event handlers from tags", () => {
    const html = '<img src="test.jpg" onerror="alert(1)" />';
    const result = sanitizeHtmlContent(html);
    expect(result).not.toContain("onerror");
  });

  it("allows safe link attributes", () => {
    const html = '<a href="https://example.com" title="Link">Click</a>';
    expect(sanitizeHtmlContent(html)).toContain('href="https://example.com"');
  });

  it("allows img with safe attributes", () => {
    const html = '<img src="test.jpg" alt="Test" width="100" loading="lazy" />';
    const result = sanitizeHtmlContent(html);
    expect(result).toContain('src="test.jpg"');
    expect(result).toContain('alt="Test"');
    expect(result).toContain('loading="lazy"');
  });

  it("strips iframe tags", () => {
    const html = '<iframe src="https://evil.com"></iframe>';
    expect(sanitizeHtmlContent(html)).toBe("");
  });

  it("allows table elements", () => {
    const html =
      "<table><thead><tr><th>Header</th></tr></thead><tbody><tr><td>Data</td></tr></tbody></table>";
    expect(sanitizeHtmlContent(html)).toContain("<table>");
    expect(sanitizeHtmlContent(html)).toContain("<td>Data</td>");
  });

  it("returns empty string for null/empty input", () => {
    expect(sanitizeHtmlContent("")).toBe("");
    expect(sanitizeHtmlContent(null as unknown as string)).toBe("");
  });

  it("preserves class and id attributes", () => {
    const html = '<div class="container" id="main">Content</div>';
    const result = sanitizeHtmlContent(html);
    expect(result).toContain('class="container"');
    expect(result).toContain('id="main"');
  });

  it("blocks javascript: protocol in links", () => {
    const html = '<a href="javascript:alert(1)">Click</a>';
    const result = sanitizeHtmlContent(html);
    expect(result).not.toContain("javascript:");
  });
});

describe("sanitizePlainText", () => {
  it("strips all HTML tags", () => {
    const text = "<b>Bold</b> and <i>italic</i>";
    expect(sanitizePlainText(text)).toBe("Bold and italic");
  });

  it("strips script tags", () => {
    const text = 'Hello<script>alert("xss")</script>World';
    expect(sanitizePlainText(text)).toBe("HelloWorld");
  });

  it("returns empty string for null/empty input", () => {
    expect(sanitizePlainText("")).toBe("");
    expect(sanitizePlainText(null as unknown as string)).toBe("");
  });

  it("preserves plain text content", () => {
    expect(sanitizePlainText("Just plain text")).toBe("Just plain text");
  });
});
