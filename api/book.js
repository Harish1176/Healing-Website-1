import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    const { name, email, session, duration, price, message } = req.body;

    // 1️⃣ Send booking email to YOU
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "harish67890h@gmail.com", // 
      subject: "🌿 New Healing Session Booking",
      html: `
        <h2>New Booking Received</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Session:</strong> ${session}</p>
        <p><strong>Duration:</strong> ${duration}</p>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Message:</strong> ${message || "N/A"}</p>
      `
    });

    // 2️⃣ Send confirmation email to CLIENT
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "✨ Your Healing Session Booking is Received",
      html: `
        <p>Dear ${name},</p>

        <p>Thank you for booking your healing session 🌿</p>

        <p>Your booking has been received successfully.</p>

        <p>I will personally review your request and contact you shortly to confirm the schedule.</p>

        <br/>

        <p>With love & light,<br/>Harish</p>
      `
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Email failed" });
  }
}
