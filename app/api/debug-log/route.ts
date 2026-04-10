import { appendFileSync } from "fs";
import { NextRequest, NextResponse } from "next/server";

const LOG_PATH = "c:/laragon/www/Mitologi Clothing/debug-b65770.log";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    appendFileSync(LOG_PATH, JSON.stringify(body) + "\n", "utf8");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
