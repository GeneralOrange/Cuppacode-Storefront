import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { revalidateTag, revalidatePath } = vi.hoisted(() => ({
  revalidateTag: vi.fn(),
  revalidatePath: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidateTag,
  revalidatePath,
}));

import { POST } from "./route";

const originalSecret = process.env.CMS_REVALIDATE_SECRET;

function request(body: unknown, authorization?: string): Request {
  return new Request("http://localhost/api/cms/revalidate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(authorization ? { Authorization: authorization } : {}),
    },
    body: JSON.stringify(body),
  });
}

describe("CMS revalidation route", () => {
  beforeEach(() => {
    revalidateTag.mockReset();
    revalidatePath.mockReset();
    process.env.CMS_REVALIDATE_SECRET = "test-secret-with-enough-entropy";
  });

  afterEach(() => {
    if (originalSecret === undefined) delete process.env.CMS_REVALIDATE_SECRET;
    else process.env.CMS_REVALIDATE_SECRET = originalSecret;
  });

  it("rejects missing and invalid secrets", async () => {
    const missing = await POST(request({ slug: "over-ons" }));
    const invalid = await POST(request(
      { slug: "over-ons" },
      "Bearer wrong-secret",
    ));

    expect(missing.status).toBe(401);
    expect(invalid.status).toBe(401);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("rejects invalid page slugs", async () => {
    const result = await POST(request(
      { slug: "../contact" },
      "Bearer test-secret-with-enough-entropy",
    ));

    expect(result.status).toBe(400);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("invalidates collection and page caches for an authorized slug", async () => {
    const result = await POST(request(
      { slug: "over-ons" },
      "Bearer test-secret-with-enough-entropy",
    ));

    expect(result.status).toBe(200);
    expect(await result.json()).toEqual({ revalidated: true, slug: "over-ons" });
    expect(revalidateTag).toHaveBeenCalledWith("cms-pages", "max");
    expect(revalidateTag).toHaveBeenCalledWith("cms-page-over-ons", "max");
    expect(revalidatePath).toHaveBeenCalledWith("/over-ons");
  });

  it("reports missing revalidation configuration without exposing the secret", async () => {
    delete process.env.CMS_REVALIDATE_SECRET;
    const result = await POST(request({ slug: "over-ons" }));

    expect(result.status).toBe(503);
    expect(await result.json()).toEqual({ error: "Revalidation is not configured" });
  });
});
