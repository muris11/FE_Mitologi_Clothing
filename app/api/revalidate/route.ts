import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * On-demand revalidation endpoint called by the Laravel backend
 * after admin CRUD operations (create/update/delete).
 *
 * Usage: POST /api/revalidate?secret=<REVALIDATION_SECRET>
 * Body:  { "tags": ["products", "categories", ...], "paths": ["/shop", "/"] }
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const secret = req.nextUrl.searchParams.get("secret");
  const configuredSecret =
    process.env.NEXTJS_REVALIDATION_SECRET || process.env.REVALIDATION_SECRET;

  if (!secret || secret !== configuredSecret) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const tags: string[] = body.tags || [];
    const paths: string[] = body.paths || [];
    const revalidatedTags: string[] = [];
    const revalidatedPaths: string[] = [];

    // Revalidate by tags (for fetch cache)
    for (const tag of tags) {
      try {
        revalidateTag(tag, 'max');
        revalidatedTags.push(tag);

        // Also revalidate related paths based on tag
        switch (tag) {
          case "products":
          case "best-sellers":
          case "new-arrivals":
            revalidatePath("/shop", "page");
            revalidatePath("/", "page");
            revalidatePath("/kategori", "page");
            revalidatedPaths.push("/shop", "/", "/kategori");
            break;
          case "categories":
          case "collections":
            revalidatePath("/kategori", "page");
            revalidatePath("/shop", "page");
            revalidatedPaths.push("/kategori", "/shop");
            break;
          case "landing-page":
          case "hero-slides":
          case "testimonials":
          case "materials":
          case "order-steps":
          case "portfolios":
          case "team-members":
          case "site-settings":
            revalidatePath("/", "page");
            revalidatePath("/tentang-kami", "page");
            revalidatedPaths.push("/", "/tentang-kami");
            break;
          case "reviews":
            revalidatePath("/shop", "page");
            revalidatedPaths.push("/shop");
            break;
          case "pages":
            revalidatePath("/[page]", "page");
            revalidatedPaths.push("/[page]");
            break;
          default:
            // For any other tag, revalidate root
            revalidatePath("/", "layout");
            revalidatedPaths.push("/ (layout)");
        }
      } catch (error) {
        console.error(`Failed to revalidate tag: ${tag}`, error);
      }
    }

    // Revalidate specific paths if provided
    for (const path of paths) {
      try {
        revalidatePath(path, "page");
        revalidatedPaths.push(path);
      } catch (error) {
        console.error(`Failed to revalidate path: ${path}`, error);
      }
    }

    // If no tags or paths provided, revalidate everything
    if (tags.length === 0 && paths.length === 0) {
      revalidatePath("/", "layout");
      return NextResponse.json({
        revalidated: true,
        message: "All pages revalidated",
        now: Date.now(),
      });
    }

    return NextResponse.json({
      revalidated: true,
      tags: revalidatedTags,
      paths: [...new Set(revalidatedPaths)],
      now: Date.now(),
    });
  } catch {
    return NextResponse.json(
      { message: "Error processing request" },
      { status: 500 },
    );
  }
}
