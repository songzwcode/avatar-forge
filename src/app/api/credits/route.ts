import { NextRequest, NextResponse } from "next/server";
import { getOrCreateUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const { userId, credits, isPro } = await getOrCreateUser();
    return NextResponse.json({ credits, isPro, userId });
  } catch (err) {
    console.error("Credits error:", err);
    return NextResponse.json(
      { error: "Failed to fetch credits" },
      { status: 500 }
    );
  }
}
