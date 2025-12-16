import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const data = await prisma.bseIpo.findMany({

        where: {
            status: "F",   // ✅ Only return IPOs with status "l"
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
