
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  console.log("🔵 GET HIT");

  // ❗ FIX: params is NOW a Promise → must await
  const resolvedParams = await params;
  const { symbol } = resolvedParams;

  console.log("SYMBOL:", symbol);

  if (!symbol) {
    return Response.json(
      { success: false, message: "Symbol missing" },
      { status: 400 }
    );
  }

  const comments = await prisma.comment.findMany({
    where: { ipoSymbol: symbol },
    orderBy: { createdAt: "asc" },
    include: {
        User: {
          select: { username: true },
        },
     } ,
  });

  return Response.json({ success: true, comments });
}
