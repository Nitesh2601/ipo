import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  console.log("🔵 GET HIT");

  const resolvedParams = await params;
  const { symbol } = resolvedParams;

  console.log("SYMBOL:", symbol);

  if (!symbol) {
    return NextResponse.json(
      { success: false, message: "Symbol missing" },
      { status: 400 }
    );
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { ipoSymbol: symbol },
      orderBy: { createdAt: "asc" },
      include: {
        User: { select: { username: true } },
      },
    });

    return NextResponse.json(
      { success: true, comments },
      
    );
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}
