import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function POST(req) {
    try {
      const { commentId, userId } = await req.json();
  
      const comment = await prisma.comment.findUnique({
        where: { id: commentId },
      });
  
      if (!comment) {
        return  NextResponse.json(
          { success: false, message: "Comment not found" },
          { status: 404 }
        );
      }
  
      if (comment.userId !== userId) {
        return  NextResponse.json(
          { success: false, message: "Unauthorized" },
          { status: 403 }
        );
      }
  
      await prisma.comment.delete({
        where: { id: commentId },
      });
  
      return  NextResponse.json({ success: true });
    } catch (error) {
      return  NextResponse.json(
        { success: false, message: "Failed to delete comment" },
        { status: 500 }
      );
    }
  }
  