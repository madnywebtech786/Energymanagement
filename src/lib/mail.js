import nodemailer from "nodemailer";
import { buildContactNotificationEmail } from "./contact-email-template";

// One transport, reused across requests, rather than a new SMTP connection
// per submission — Nodemailer's documented pattern. Built lazily (not at
// module load) so a missing env var fails the request that needs mail,
// not the server's startup or an unrelated route's cold start.
let transport;

function getTransport() {
  if (transport) return transport;

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    throw new Error(
      "Email is not configured: GMAIL_USER and GMAIL_APP_PASSWORD must be set (see .env.example).",
    );
  }

  transport = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
  return transport;
}

// Sends the contact-form notification to CONTACT_RECEIVER_EMAIL. Reply-To is
// the visitor's own address (the user's explicit choice): whoever reads the
// notification can hit Reply and it goes straight back to the person who
// submitted the form, not to the Gmail account that sent the notification.
export async function sendContactNotification(fields) {
  const receiver = process.env.CONTACT_RECEIVER_EMAIL;
  if (!receiver) {
    throw new Error("Email is not configured: CONTACT_RECEIVER_EMAIL must be set (see .env.example).");
  }

  const { subject, html, text } = buildContactNotificationEmail(fields);

  await getTransport().sendMail({
    from: `"Energy & Management — Website" <${process.env.GMAIL_USER}>`,
    to: receiver,
    replyTo: `"${fields.name}" <${fields.email}>`,
    subject,
    html,
    text,
  });
}
