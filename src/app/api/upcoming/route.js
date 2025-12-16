import prisma from "@/lib/prisma";

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

    return Response.json({
      success: true,
      count: data.length,
      data,
    });

  } catch (error) {
    console.error("Error fetching upcoming IPOs:", error);

    return Response.json(
      { success: false, message: "Failed to fetch upcoming IPO data" },
      { status: 500 }
    );
  }
}
