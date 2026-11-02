export const contact = {
  eyebrow: "Contact",
  heading: "Let's discuss your asset",
  lead: "Contact us for a confidential conversation about production, reservoir, well integrity or field development challenges.",
  // The home page's embedded ContactSection has its own heading/lead/intro
  // (new 2026-11-02, verbatim from the client's reference screenshot),
  // separate from the fields above: those still serve /contact's own
  // PageHero and metadata description unchanged, and ContactSection's
  // previous copy duplicated ContactCta's own heading right above it
  // anyway, so this is a genuine fix, not just new content.
  section: {
    heading: "Bring us your hardest asset question.",
    lead: "A confidential conversation, no obligation. We reply within one business day.",
    supportingText:
      "We work with national oil companies, international and independent E&P operators, investors and lenders on onshore and offshore assets in Canada, Pakistan, the Middle East, North Africa and Southeast Asia.",
  },
  cta: {
    eyebrow: "Ready when you are",
    heading: "Bring us your hardest asset question",
    lead: "A confidential conversation, no obligation.",
  },
  form: {
    name: { label: "Name" },
    company: { label: "Company" },
    email: { label: "Email" },
    phone: { label: "Phone" },
    message: { label: "Message", hint: "What asset or challenge would you like to discuss?" },
    submit: "Send message",
    pending: "Sending…",
    success: {
      heading: "Message sent",
      text: "Thank you for reaching out. We respond to every enquiry within one business day.",
    },
    error: "Something went wrong sending your message. Please try again, or reach us directly below.",
  },
  details: {
    email: {
      label: "Email",
      value: "info@emconsultingsolutions.ca",
      href: "mailto:info@emconsultingsolutions.ca",
    },
    phone: {
      label: "Telephone",
      value: "+1 587 777 4643",
      href: "tel:+15877774643",
    },
    office: {
      label: "Office",
      value: "Calgary, Alberta, Canada",
    },
  },
};
