import prisma from "@/lib/prisma";

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

    

    return Response.json({
      success: true,
      count: data.length,
      data,
    });

  } catch (error) {
    console.error("Error fetching current IPOs:", error);
    return Response.json(
      { success: false, message: "Failed to fetch IPO data" },
      { status: 500 }
    );
  }
}
