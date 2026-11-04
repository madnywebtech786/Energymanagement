// Validates a contact submission and hands it to the mail seam. Treat the
// request body as untrusted input (see node_modules/next/dist/docs/01-app/
// 02-guides/data-security.md): every field is re-checked here regardless of
// the client form's own HTML validation, since this endpoint is reachable by
// any POST, not only through the page.
import { sendContactNotification } from "@/lib/mail";

const LIMITS = {
  name: 100,
  company: 100,
  email: 160,
  phone: 30,
  message: 2000,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(body) {
  const errors = {};
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name) errors.name = "Enter your name.";
  else if (name.length > LIMITS.name) errors.name = "Name is too long.";

  // Company is optional, matching the client's reference design (no
  // required marker on this field). Still length-capped like every other
  // field, since an unvalidated field is still attacker-controlled input.
  if (company.length > LIMITS.company) errors.company = "Company name is too long.";

  if (!email) errors.email = "Enter your email address.";
  else if (email.length > LIMITS.email || !EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!phone) errors.phone = "Enter a phone number.";
  else if (phone.length > LIMITS.phone) errors.phone = "Phone number is too long.";

  if (!message) errors.message = "Enter a message.";
  else if (message.length > LIMITS.message) errors.message = "Message is too long.";

  return { errors, fields: { name, company, email, phone, message } };
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, errors: { form: "Invalid request." } }, { status: 400 });
  }

  // Honeypot: a field no sighted human fills in. A bot that fills every
  // field trips this instead of a visible error. Renamed from "company" to
  // "website" when the form gained a real, visible Company field — see
  // ContactForm for the full reasoning.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return Response.json({ ok: true });
  }

  const { errors, fields } = validate(body);
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, errors }, { status: 400 });
  }

  try {
    await sendContactNotification(fields);
  } catch (error) {
    // A send failure (bad credentials, Gmail rate limit, network issue) must
    // surface as an error response — returning ok:true here would show the
    // visitor "Message sent" while the email never arrived, which is worse
    // than the previous log-only stub. Logged server-side with detail for
    // diagnosis; the client only ever sees the generic copy.error message.
    console.error("[contact] failed to send notification email", error);
    return Response.json({ ok: false, errors: { form: "Delivery failed." } }, { status: 502 });
  }

  return Response.json({ ok: true });
}
