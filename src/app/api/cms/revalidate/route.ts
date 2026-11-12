import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const CMS_PAGES_TAG = "cms-pages";

function isAuthorized(request: Request, secret: string): boolean {
  const authorization = request.headers.get("authorization") ?? "";
  const token = authorization.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : "";
  const expected = Buffer.from(secret);
  const actual = Buffer.from(token);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export async function POST(request: Request) {
  const secret = process.env.CMS_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Revalidation is not configured" },
      { status: 503 },
    );
  }
  if (!isAuthorized(request, secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 1024) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  if (
    !body ||
    typeof body !== "object" ||
    !("slug" in body) ||
    typeof body.slug !== "string" ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(body.slug)
  ) {
    return NextResponse.json({ error: "A valid page slug is required" }, { status: 400 });
  }

  const slug = body.slug.toLowerCase();
  revalidateTag(CMS_PAGES_TAG, "max");
  revalidateTag(`cms-page-${slug}`, "max");
  revalidatePath(`/${slug}`);

  return NextResponse.json({ revalidated: true, slug });
}
