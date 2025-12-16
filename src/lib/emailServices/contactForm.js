import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail({ name, email, message }) {
  try {
    const response = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL , // must be verified domain
      to: process.env.MY_PERSONAL_EMAIL, // your personal inbox
      reply_to: email, // reply directly to user
      subject: `New Contact Message from ${name}`,
      text: `
            Name: ${name}
            Email: ${email}

            Message:
            ${message}
                `,
    });

    console.log("📨 Contact email sent:", response);
    return response;
  } catch (error) {
    console.error("❌ Error sending contact email:", error);
    throw error; // let API route catch it
  }
}
