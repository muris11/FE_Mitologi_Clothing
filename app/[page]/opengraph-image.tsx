import { getPage } from "lib/api";

export const runtime = "nodejs";

export default async function Image(props: {
  params: Promise<{ page: string }>;
}) {
  const params = await props.params;
  const page = await getPage(params.page);
  const title = page?.seo?.title || page?.title || process.env.SITE_NAME;

  // Dynamic require + indirect process access to prevent Turbopack
  // from flagging Node.js APIs as Edge Runtime violations
  const fs = require("fs/promises") as typeof import("fs/promises");
  const path = require("path") as typeof import("path");
  const cwd = globalThis.process?.cwd() ?? ".";

  const fontFile = await fs.readFile(path.join(cwd, "fonts/Inter-Bold.ttf"));
  const fontData = Uint8Array.from(fontFile).buffer;
}
