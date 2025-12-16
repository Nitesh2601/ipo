
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { sendResetPasswordEmail } from "@/lib/emailServices/resetPassword";

export async function POST(req) {
  try {
    const { email } = await req.json();

    console.log("📩 Forgot-password request:", email);

    if (!email) {
      return Response.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // 1️⃣ Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log("❌ No user found for email:", email);
      return Response.json(
        { success: false, message: "No account found with this email" },
        { status: 404 }
      );
    }

    // 2️⃣ Create JWT reset token (stateless)
    const resetToken = jwt.sign(
      { userId: user.id }, // No sensitive info exposed
      process.env.JWT_RESET_SECRET,
      { expiresIn: "15m" }
    );

    // 3️⃣ Construct reset link → frontend reset-password page
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/resetPassword?token=${resetToken}`;

    console.log("🔗 Reset link generated:", resetLink);

    // 4️⃣ Send email
    await sendResetPasswordEmail({
      email: user.email,
      name: user.name,
      resetLink,
    });

    console.log("📤 Reset email sent to:", user.email);

    return Response.json(
      { success: true, message: "Reset link sent to your email" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Forgot-password error:", error);

    return Response.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
