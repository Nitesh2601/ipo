import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const data = await prisma.upcomingIpo.findMany({
      where :{
        status : 'Forthcoming'
      },
      orderBy: {
        updatedAt: "desc",
      }

      
    });

    console.log("Fetched Upcoming IPO Data:", JSON.stringify(data, null, 2));

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
    console.error("Error fetching upcoming IPOs:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch upcoming IPO data" },
      { status: 500 }
    );
  }
}
