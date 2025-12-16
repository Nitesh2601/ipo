import prisma from "@/lib/prisma";

export async function POST(req) {
    try {
      const { commentId, userId } = await req.json();
  
      const comment = await prisma.comment.findUnique({
        where: { id: commentId },
      });
  
      if (!comment) {
        return Response.json(
          { success: false, message: "Comment not found" },
          { status: 404 }
        );
      }
  
      if (comment.userId !== userId) {
        return Response.json(
          { success: false, message: "Unauthorized" },
          { status: 403 }
        );
      }
  
      await prisma.comment.delete({
        where: { id: commentId },
      });
  
      return Response.json({ success: true });
    } catch (error) {
      return Response.json(
        { success: false, message: "Failed to delete comment" },
        { status: 500 }
      );
    }
  }
  