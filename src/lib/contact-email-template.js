// Builds the HTML (and plain-text fallback) for the contact-form
// notification email. Table-based layout with inlined styles throughout —
// not the site's own Tailwind/CSS system — because email clients (Outlook
// in particular, via its Word rendering engine) do not support a <style>
// block reliably and strip most modern CSS; this is the actual constraint
// set HTML email has to design within, not a stylistic choice to match the
// live site's CSS architecture. Colours are the site's own brand tokens
// (navy #0B2545, teal #0B7F73/#14B8A6), hand-copied as literal hex since
// Tailwind's CSS custom properties do not reach into an email client either.
//
// All submitted fields are untrusted user input (see /api/contact's own
// comment) and are HTML-escaped before interpolation — this is the one
// place that input reaches another human's inbox as rendered HTML, so an
// unescaped `<script>` or stray `"` closing an attribute early is a real
// injection risk here even though the same fields are already validated
// upstream for length and shape.
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Preserves user line breaks in the message body without trusting raw
// newlines as HTML structure.
function escapeHtmlMultiline(value) {
  return escapeHtml(value).replace(/\n/g, "<br>");
}

const COLORS = {
  navy: "#0b2545",
  navyMuted: "#52607a",
  paper: "#f6f8fa",
  surface: "#ffffff",
  border: "#e2e6ec",
  teal: "#0b7f73",
};

function detailRow(label, value, href) {
  const safeLabel = escapeHtml(label);
  const safeValue = escapeHtml(value);
  const valueCell = href
    ? `<a href="${escapeHtml(href)}" style="color:${COLORS.navy};text-decoration:none;font-weight:600;">${safeValue}</a>`
    : `<span style="color:${COLORS.navy};font-weight:600;">${safeValue}</span>`;

  return `
    <tr>
      <td style="padding:14px 0;border-top:1px solid ${COLORS.border};font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.4;color:${COLORS.navyMuted};text-transform:uppercase;letter-spacing:0.06em;width:120px;vertical-align:top;">
        ${safeLabel}
      </td>
      <td style="padding:14px 0;border-top:1px solid ${COLORS.border};font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.4;vertical-align:top;">
        ${valueCell}
      </td>
    </tr>`;
}

// `fields` is the already-validated { name, company, email, phone, message }
// object from /api/contact. `submittedAt` is a Date, formatted server-side
// (not in the email client) so the timestamp is deterministic and timezone
// is explicit rather than left to whatever the recipient's mail app assumes.
export function buildContactNotificationEmail(fields, { submittedAt } = {}) {
  const when = submittedAt ?? new Date();
  const formattedDate = when.toLocaleString("en-CA", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Edmonton",
  });

  const subject = `New contact form message from ${fields.name}`;

  const companyRow = fields.company ? detailRow("Company", fields.company) : "";

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(subject)}</title>
    <style>
      /* A bare HTML width="600" attribute on the card table (below) is what
         Outlook desktop and some other clients honour literally, ignoring
         inline max-width entirely — confirmed by rendering this template
         and finding the card causing real horizontal overflow at a phone
         viewport despite the inline max-width:100% already on it. The card
         table's HTML width is 100% (fluid baseline, safe everywhere) with
         its 600px cap applied only via inline max-width + this media query,
         so a client that does honour one of the two still gets the correct
         result, and nothing here depends on both being honoured at once. */
      @media screen and (max-width: 640px) {
        .email-card { width: 100% !important; }
        .email-pad-lg { padding-left: 20px !important; padding-right: 20px !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background-color:${COLORS.paper};">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
      New message from ${escapeHtml(fields.name)} via the website contact form.
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${COLORS.paper};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" class="email-card" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:${COLORS.surface};border-radius:12px;overflow:hidden;border:1px solid ${COLORS.border};">
            <tr>
              <td class="email-pad-lg" style="background-color:${COLORS.navy};padding:28px 36px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="font-family:Arial,Helvetica,sans-serif;">
                      <span style="display:inline-block;width:34px;height:34px;line-height:34px;text-align:center;background-color:${COLORS.teal};border-radius:7px;color:#ffffff;font-size:14px;font-weight:700;letter-spacing:0.02em;">EM</span>
                      <span style="display:inline-block;margin-left:12px;vertical-align:middle;color:#ffffff;font-size:15px;font-weight:600;letter-spacing:0.01em;">
                        Energy &amp; Management
                      </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td class="email-pad-lg" style="padding:32px 36px 8px;">
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${COLORS.teal};">
                  New website enquiry
                </p>
                <h1 style="margin:10px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:1.3;color:${COLORS.navy};font-weight:500;">
                  ${escapeHtml(fields.name)} wants to discuss an asset
                </h1>
                <p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;color:${COLORS.navyMuted};">
                  Submitted ${escapeHtml(formattedDate)} (Mountain Time) via the contact form.
                </p>
              </td>
            </tr>

            <tr>
              <td class="email-pad-lg" style="padding:12px 36px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  ${detailRow("Name", fields.name)}
                  ${companyRow}
                  ${detailRow("Email", fields.email, `mailto:${fields.email}`)}
                  ${detailRow("Phone", fields.phone, `tel:${fields.phone.replace(/[^+\d]/g, "")}`)}
                </table>
              </td>
            </tr>

            <tr>
              <td class="email-pad-lg" style="padding:24px 36px 32px;">
                <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:${COLORS.navyMuted};">
                  Message
                </p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${COLORS.paper};border-radius:8px;border:1px solid ${COLORS.border};">
                  <tr>
                    <td style="padding:18px 20px;font-family:Georgia,'Times New Roman',serif;font-size:15px;line-height:1.6;color:${COLORS.navy};">
                      ${escapeHtmlMultiline(fields.message)}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td class="email-pad-lg" style="padding:0 36px 32px;">
                <a href="mailto:${escapeHtml(fields.email)}" style="display:inline-block;background-color:${COLORS.navy};color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:600;text-decoration:none;padding:12px 24px;border-radius:999px;">
                  Reply to ${escapeHtml(fields.name.split(" ")[0] || fields.name)}
                </a>
              </td>
            </tr>

            <tr>
              <td class="email-pad-lg" style="padding:20px 36px;background-color:${COLORS.paper};border-top:1px solid ${COLORS.border};">
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:${COLORS.navyMuted};">
                  Automated notification from the Energy &amp; Management Consulting Solutions website contact form. Reply-To on this email is already set to the sender's address above.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    `New contact form message from ${fields.name}`,
    "",
    `Name: ${fields.name}`,
    fields.company ? `Company: ${fields.company}` : null,
    `Email: ${fields.email}`,
    `Phone: ${fields.phone}`,
    `Submitted: ${formattedDate} (Mountain Time)`,
    "",
    "Message:",
    fields.message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  return { subject, html, text };
}
