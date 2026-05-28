import { NextResponse } from "next/server";
import { createItem, listItems } from "@/lib/mvp-store";

function numeric(value: unknown, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function GET() {
  return NextResponse.json({ data: listItems() });
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    name?: string;
    descriptor?: string;
    detail?: string;
    priceUsdc?: number | string;
    payload?: Record<string, unknown>;
  };

  const item = createItem({
    name: body.name?.trim() || "Untitled Split",
    descriptor: body.descriptor?.trim() || "4 people",
    detail: body.detail?.trim() || "2 paid",
    priceUsdc: numeric(body.priceUsdc, 3),
    payload: body.payload || {"participants":4,"paid":2,"status":"collecting"},
  });

  return NextResponse.json({ data: item }, { status: 201 });
}
