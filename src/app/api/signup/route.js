import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "@/lib/emailServices/welcomeEmailService";

export async function POST(req) {
  
  try {
    const body = await req.json();
    
    const { name, email, password, username } = body;

    // Step 1 — Validate fields
    
    if (!name || !email || !password || !username) {
      console.log("❌ Validation failed — Missing fields");
      return NextResponse.json({
        success: false,
        message: "All fields are required",
      });
    }
   

    // Step 2 — Check existing email
    console.log(`🔍 Checking existing email: ${email}`);
    const exists = await prisma.user.findUnique({ where: { email } });

    if (exists) {
      
      return NextResponse.json({
        success: false,
        message: "Email already registered",
      });
    }
    

    // Step 3 — Check existing username
    
    const usernameExists = await prisma.user.findUnique({
      where: { username },
    });

    if (usernameExists) {
      console.log("❌ Username already exists");
      return NextResponse.json({
        success: false,
        message: "Username already taken",
      });
    }
    
   
    const hashed = await bcrypt.hash(password, 10);
    
    // Step 5 — Creating user in DB
    
    await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashed,
      },
    });
    console.log("✅ User successfully created in DB");

    // Step 6 — Sending welcome email
    
    await sendWelcomeEmail({ name, email });
    

    console.log("🎉 Signup completed successfully");
    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("🔥 Server Error:", err);
    return NextResponse.json({
      success: false,
      message: "Server error",
    });
  }
}
