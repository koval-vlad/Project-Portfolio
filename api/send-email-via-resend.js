import { Resend } from 'resend';

const resend_api = new Resend(process.env.RESEND_API_KEY);

export default async function send_email_via_resend(req, res) {
  const { senderName, senderEmail, message } = req.body;
  
  try {
    const data = await resend_api.emails.send({
      from: process.env.EMAIL_SENDER_RESEND,
      to: process.env.EMAIL_RECIPIENT_RESEND,
      subject: `Message from Project Portfolio website`,
      html: `<p><strong>Message from ${senderName}</strong> (${senderEmail}):</p>${message}`,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}