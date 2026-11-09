// `responsibility.text` and `footer` stay verbatim from index.html — do not
// reword either without the client. `responsibility.scope` is new (added
// for the /about page's Professional Responsibility section): a short
// restatement of text's own opening clause ("provides management, technical
// advisory and project coordination services"), not a replacement for the
// verbatim sentence, which still renders in full elsewhere on that page.
//
// The APEGA Permit to Practice disclosure (its own `responsibility.apega`
// field, plus the matching trailing sentence in `footer`) was removed at
// the client's explicit request 2026-11-10 — see ProfessionalResponsibility
// and about.js's FAQ for the other two places this same fact drove copy,
// also removed in that pass. The adjacent "performed and sealed by
// appropriately licensed professionals or permit holders" sentence stays:
// it is a separate claim (how authenticated work is handled) independent
// of whether the company itself holds that one specific permit.
export const legal = {
  responsibility: {
    label: "Professional responsibility.",
    scope: "This team provides management, technical advisory and project coordination directly — the work shown throughout this site.",
    text: "Energy & Management Consulting Solutions Ltd. provides management, technical advisory and project coordination services. Where engineering or geoscience work must be authenticated in Alberta or another jurisdiction, it is performed and sealed by appropriately licensed professionals or permit holders engaged for that scope.",
  },
  footer:
    "© 2026 Energy & Management Consulting Solutions Ltd. All rights reserved. Engineering and geoscience work requiring authentication is performed and sealed by appropriately licensed professionals or permit holders.",
};
