import { sendContactEmail } from "@/lib/emailServices/contactForm";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    console.log("📩 Contact form request received:", { name, email });

    // No validation here (you validate on frontend)

    // Send the email
    await sendContactEmail({ name, email, message });

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("❌ Contact form API error:", error);

    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
