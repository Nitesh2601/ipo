import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return Response.json(
        { message: "Token and password required" },
        { status: 400 }
      );
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);
    } catch (err) {
      return Response.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    const userId = decoded.userId;

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return Response.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Reset password error:", error);
    return Response.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
