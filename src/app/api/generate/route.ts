import { NextRequest, NextResponse } from "next/server";
import { getOrCreateUser, decrementCredits } from "@/lib/auth";
import { generateAvatar } from "@/lib/huggingface";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { userId, credits, isPro } = await getOrCreateUser();

    // Check credits (pro users skip this)
    if (!isPro && credits <= 0) {
      return NextResponse.json(
        { error: "No credits remaining. Upgrade to Pro for unlimited generations!" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { prompt, style, refImageBase64 } = body;

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "Please enter a prompt" },
        { status: 400 }
      );
    }

    if (!style) {
      return NextResponse.json(
        { error: "Please select a style" },
        { status: 400 }
      );
    }

    // Generate avatar
    let imageUrl: string;
    try {
      imageUrl = await generateAvatar(prompt.trim(), style, refImageBase64);
    } catch (err) {
      console.error("Replicate error:", err);
      return NextResponse.json(
        { error: "Forge temporarily unavailable. Please try again." },
        { status: 503 }
      );
    }

    // Decrement credits (skip for pro)
    const newCredits = isPro ? credits : await decrementCredits(userId);

    // Save generation
    await prisma.generation.create({
      data: {
        userId,
        prompt: prompt.trim(),
        style,
        imageUrl,
      },
    });

    return NextResponse.json({
      id: Date.now().toString(),
      imageUrl,
      creditsRemaining: newCredits,
    });
  } catch (err) {
    console.error("Generate error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
