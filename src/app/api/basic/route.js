import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await prisma.currentIpo.findMany({
      where:{
        status : 'Active',
      },

      include: {
        SubscriptionCategory: true, // fetch related categories
      },
      orderBy: {
        updatedAt: "desc", // latest updates first
      },
    });

    

    return NextResponse.json(
      {
        success: true,
        count: data.length,
        data,
      },
      {
        headers: {
          // 🔥 ISR / caching headers
          "Cache-Control": "s-maxage=300, stale-while-revalidate=59",
        },
      }
    );

  } catch (error) {
    console.error("Error fetching current IPOs:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch IPO data" },
      { status: 500 }
    );
  }
}
