import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { randomBytes } from "crypto";

export async function getOrCreateUser(): Promise<{
  userId: string;
  token: string;
  credits: number;
  isPro: boolean;
}> {
  const cookieStore = await cookies();
  const token = cookieStore.get("avatar_token")?.value;

  if (token) {
    const user = await prisma.user.findUnique({ where: { token } });
    if (user) {
      return {
        userId: user.id,
        token: user.token,
        credits: user.credits,
        isPro: user.isPro,
      };
    }
  }

  // Create new user
  const newToken = randomBytes(32).toString("hex");
  const user = await prisma.user.create({
    data: {
      token: newToken,
      credits: 3,
      isPro: false,
    },
  });

  cookieStore.set("avatar_token", newToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });

  return {
    userId: user.id,
    token: user.token,
    credits: user.credits,
    isPro: user.isPro,
  };
}

export async function decrementCredits(userId: string): Promise<number> {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { credits: { decrement: 1 } },
  });
  return Math.max(0, user.credits);
}

export async function addCredits(userId: string, amount: number): Promise<number> {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { credits: { increment: amount } },
  });
  return user.credits;
}

export async function setPro(userId: string): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: { isPro: true, credits: 999999 },
  });
}
