
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET(req) {
  try {

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;

    const limit = 10;
    const skip = (page - 1) * limit;

    const data = await prisma.IpoPast.findMany({

      skip,
      take: limit,
      orderBy: { updatedAt: "desc" }, // newest first
        
    });

    const total = await prisma.ipoPast.count();

    console.log("Fetched Upcoming IPO Data:", JSON.stringify(data, null, 2));

    return NextResponse.json(
      {
        success: true,
        page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
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
    console.error("Error fetching upcoming IPOs:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch upcoming IPO data" },
      { status: 500 }
    );
  }
}
