import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResetPasswordEmail({ email, name, resetLink }) {
  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL, // after domain setup
      to: email,
      subject: "Reset your password",
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>Hello ${name},</h2>
          <p>You requested to reset your password.</p>

          <a href="${resetLink}"
             style="
                display:inline-block;
                padding:10px 15px;
                background:#0d6efd;
                color:white;
                border-radius:6px;
                text-decoration:none;
                margin-top:10px;
             ">
            Reset Password
          </a>

          <p style="margin-top:20px; color:#555;">
            Link expires in 15 minutes.
          </p>
        </div>
      `,
    });

    console.log("📧 Reset password email sent.");
  } catch (error) {
    console.error("❌ Email sending error:", error);
  }
}
