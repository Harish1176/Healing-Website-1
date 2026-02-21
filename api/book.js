import { Resend } from "resend";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { name, email, session, duration, price } = req.body;

    // Email to client
    await resend.emails.send({
      from: "Booking <onboarding@resend.dev>",
      to: email,
      subject: "Booking Confirmation 🌿",
      html: `
        <h2>Thank you ${name}</h2>
        <p>Your session is confirmed.</p>
        <p><b>${session}</b> - ${duration}</p>
        <p>Price: ${price}</p>
      `
    });

    // Email to you
    await resend.emails.send({
      from: "Booking <onboarding@resend.dev>",
      to: "harish67890h@gmail.com",
      subject: "New Booking Received",
      html: `
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Session: ${session}</p>
        <p>Duration: ${duration}</p>
        <p>Price: ${price}</p>
      `
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    return res.status(500).json({ error: "Failed" });
  }
}
