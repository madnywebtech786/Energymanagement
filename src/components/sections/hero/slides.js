// The 2 hero slides for the dark wave hero (built 2026-11-02, replacing the
// earlier 3-slide photo hero — see "Hero redesign: dark wave variant" in
// docs/redesign-plan.md's Decisions table for the full design rationale).
// Copy is the client's own supplied text, verbatim where given; the two
// button labels/hrefs and the disclaimer line were confirmed with the client
// against their reference screenshot (not invented — see the same Decisions
// entry). hrefs are plain route paths, resolved by <Button>'s own
// internal/external split. `lead` is an array of body paragraphs
// (HeroContent maps over it) — slide 1 restructured at the client's direct
// request: "Independent Oil & Gas Consulting" is now the heading itself
// (previously a separate small eyebrow line above a longer heading), and the
// sentence that used to be the heading is now the first body paragraph. No
// separate eyebrow renders above it any more, since the heading now carries
// that same text.
export const heroSlides = [
  {
    key: "overview",
    eyebrow: "",
    heading: "Independent Oil & Gas Consulting",
    lead: [
      "Engineering and geological studies, production support and practical advisory for E&P operators and investors—from reservoir to plant gate.",
      "Our engineers and geoscientists are led by a former E&P CEO and hands-on engineer with over three decades of global exploration and production experience.",
    ],
    note: "If our initial assessment does not add value, you do not pay for it.",
    actions: ["Discuss your asset", "See what we do"],
    hrefs: ["/contact", "/services"],
  },
  {
    key: "experience",
    eyebrow: "",
    heading: "Experience That Supports Your Decisions",
    lead: [
      "Our leadership's track record includes documented production improvements and successful resolution of multimillion-dollar technical disputes through negotiation. We work with you to understand your challenges and identify practical solutions.",
    ],
    actions: ["Discuss your asset", "See our approach"],
    hrefs: ["/contact", "/approach"],
  },
];
