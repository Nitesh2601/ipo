import prisma from "@/lib/prisma";

/**
 * 🔹 CURRENT IPOs (NSE Mainboard)
 */
export async function getCurrentIpos() {
  return prisma.currentIpo.findMany({
    
    select: {
      id: true,
      companyName: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
}

/**
 * 🔹 UPCOMING IPOs (NSE Mainboard)
 */
export async function getUpcomingIpos() {
  return prisma.upcomingIpo.findMany({
    
    select: {
      id: true,
      companyName: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
}

/**
 * 🔹 BSE SME IPOs
 */
export async function getBseIpos() {
  return prisma.bseIpo.findMany({
    
    select: {
      id: true,
      companyName: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
}
