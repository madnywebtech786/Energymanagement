// Validates a contact submission and hands it to the mail seam. Treat the
// request body as untrusted input (see node_modules/next/dist/docs/01-app/
// 02-guides/data-security.md): every field is re-checked here regardless of
// the client form's own HTML validation, since this endpoint is reachable by
// any POST, not only through the page.
const LIMITS = {
  name: 100,
  email: 160,
  phone: 30,
  message: 2000,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(body) {
  const errors = {};
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name) errors.name = "Enter your name.";
  else if (name.length > LIMITS.name) errors.name = "Name is too long.";

  if (!email) errors.email = "Enter your email address.";
  else if (email.length > LIMITS.email || !EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!phone) errors.phone = "Enter a phone number.";
  else if (phone.length > LIMITS.phone) errors.phone = "Phone number is too long.";

  if (!message) errors.message = "Enter a message.";
  else if (message.length > LIMITS.message) errors.message = "Message is too long.";

  return { errors, fields: { name, email, phone, message } };
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, errors: { form: "Invalid request." } }, { status: 400 });
  }

  // Honeypot: a field no sighted human fills in. A bot that fills every
  // field trips this instead of a visible error.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return Response.json({ ok: true });
  }

  const { errors, fields } = validate(body);
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, errors }, { status: 400 });
  }

  // Delivery is not wired up yet (Nodemailer/SMTP, planned). Log the
  // validated submission server-side so nothing is silently dropped while
  // that decision is pending; swap this for src/lib/mail.js once the
  // credentials exist.
  console.info("[contact] submission received", {
    name: fields.name,
    email: fields.email,
    phone: fields.phone,
    messageLength: fields.message.length,
  });

  return Response.json({ ok: true });
}
