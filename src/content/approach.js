import { services } from "./services";
import { serviceDetails } from "./service-details";

export const approach = {
  eyebrow: "End-to-end approach",
  heading: "Integrated asset management, from subsurface to sustained performance.",
  lead: "One integrated team covers the full asset lifecycle, so decisions in one discipline account for their impact on the rest.",
  stages: [
    { name: "Assess", text: "Data review, asset diagnostics and benchmarking." },
    { name: "Characterize", text: "Geology, petrophysics and reservoir understanding." },
    { name: "Plan", text: "Development concepts, forecasts and economics." },
    { name: "Execute", text: "Wells, completions, lift and facilities support." },
    { name: "Optimize", text: "Surveillance, production gains and cost control." },
    { name: "Sustain", text: "Integrity, late-life strategy and abandonment." },
  ],
};

// Derived, not hand-maintained: each service's own `stages` index array in
// service-details.js is the single source of truth for where it sits in
// the lifecycle (already used by ServiceLifecycle on every service detail
// page). This reverses that into "for each stage, which services" so the
// two views can never drift out of sync with each other.
export const stageServices = approach.stages.map((stage, stageIndex) =>
  services.items.filter((service) => serviceDetails[service.slug]?.stages?.includes(stageIndex)),
);
