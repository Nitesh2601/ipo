// emailService.js
import { Resend } from "resend";

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = async ({ name, email }) => {
  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: email,
      subject: `Welcome to the Hunt, ${name}! 🚀 Your IPO Edge Starts Now.`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; background-color: #f7f7f7; border-radius: 10px;">
        
          <h2 style="color: #1a73e8; text-align: center; margin-bottom: 25px; font-size: 24px;">
            Hey ${name}, Welcome to IPO Hunters! 
          </h2>

          <p style="font-size: 16px; color: #333; line-height: 1.6; text-align: center;">
            You're now part of the community where smart investors get an edge.
            The hunt for the next big listing is officially underway.
          </p>

          <div style="
            background: #ffffff; 
            padding: 20px; 
            border: 1px solid #e0e0e0;
            margin: 25px 0; 
            border-radius: 8px;
          ">
            <h3 style="margin-top: 0; color: #000; font-size: 18px; text-align: center; margin-bottom: 15px;">
              Stop guessing. Start knowing.
            </h3>
            
            <p style="font-size: 15px; color: #333; line-height: 1.6; text-align: center; font-weight: 500;">
              We give you <strong>Latest GMPs, Subscription status, and Clean Data</strong> to make your next move count.
            </p>
            
            <p style="font-size: 15px; color: #1a73e8; line-height: 1.6; text-align: center; font-style: italic;">
              Plus, comment and share your thoughts with the community!
            </p>
          </div>
          
          <p style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #eee; font-size: 14px; color: #666; text-align: center;">
            Happy Hunting! 
            <br>
            <strong>The IPO Hunters Team</strong>
          </p>

        </div>
      `,
    });

    console.log("Welcome email sent successfully.");
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};