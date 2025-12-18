import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const body = await req.json();
    const { symbol, comment, userId } = body;

    console.log("Incoming comment payload:", { symbol, comment, userId });

    if (!symbol || !comment || !userId) {
      console.log("❌ Missing fields", { symbol, comment, userId });
      return  NextResponse.json(
        { success: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    const newComment = await prisma.comment.create({
      data: {
        ipoSymbol: symbol,
        text: comment, // Correct field
        userId,
      },
    });

    console.log("✅ Comment inserted:", newComment);

    return  NextResponse.json({ success: true, comment: newComment });

  } catch (error) {
    console.error("❌ Prisma error:", error);
    console.error("❌ Prisma meta:", error.meta);

    return  NextResponse.json(
      { success: false, message: "Failed to add comment", error: error.message },
      { status: 500 }
    );
  }
}
