// `description` on each item (added 2026-10-19) is DRAFT copy for client
// sign-off, per this plan's own default ("Claude drafts from the existing
// bullets and marks it DRAFT for client sign-off"). Each one restates that
// service's existing tagline and bullets as 3-4 lines of prose for the home
// page's desktop services panels — no new claims, metrics or scope beyond
// what was already in `tagline`/`bullets`.
export const services = {
  eyebrow: "Services",
  heading: "Engineering and geoscience support across subsurface and surface E&P operations.",
  lead: "Our senior petroleum engineers and geoscientists work directly with you to deliver technical studies, independent reviews and hands-on operational support. Drawing on experience across onshore and offshore assets, we tailor each engagement to your asset’s needs, with a clear scope, practical deliverables and agreed measures of success.",
  items: [
    {
      slug: "production-optimization",
      name: "Production Optimization Advisory",
      tagline: "Identify and capture production gains across wells and networks.",
      description:
        "We identify and capture production gains across wells and networks through nodal and network analysis, well performance reviews and deliverability studies. Debottlenecking work targets the constraints holding production back, while flow assurance, scale and sand management protect the gains once they are made.",
      bullets: [
        "Nodal & network analysis",
        "Well performance & deliverability",
        "Production optimization & debottlenecking",
        "Flow assurance, scale & sand management",
      ],
    },
    {
      slug: "reservoir-management",
      name: "Reservoir Management Advisory",
      tagline: "Understand reservoir behaviour and plan the best recovery strategy.",
      description:
        "We help you understand reservoir behaviour and plan the best recovery strategy for your asset. Reserves and resource assessments, decline curve and material balance analysis establish where a reservoir stands today, and reservoir simulation and forecasting inform what comes next. Waterflood, EOR and recovery studies then test the options available to improve recovery.",
      bullets: [
        "Reserves & resource assessment",
        "Decline curve & material balance analysis",
        "Reservoir simulation & forecasting",
        "Waterflood, EOR & recovery studies",
      ],
    },
    {
      slug: "subsurface-geological",
      name: "Subsurface & Geological Advisory",
      tagline: "Build reliable subsurface models to reduce drilling risk.",
      description:
        "We build reliable subsurface models that reduce drilling risk, starting from structural and stratigraphic interpretation and petrophysical log evaluation. Static modelling and volumetrics turn that interpretation into a dependable picture of the subsurface, which in turn supports prospect maturation and well placement decisions.",
      bullets: [
        "Structural & stratigraphic interpretation",
        "Petrophysical log evaluation",
        "Static modelling & volumetrics",
        "Prospect maturation & well placement",
      ],
    },
    {
      slug: "well-integrity",
      name: "Well Integrity Advisory",
      tagline: "Manage well risk throughout the well lifecycle.",
      description:
        "We manage well risk throughout the well lifecycle, from well integrity management systems to barrier assessment and annulus pressure reviews. Corrosion and casing evaluation identify where a well's condition needs attention, and that understanding carries through into workover, suspension and abandonment planning.",
      bullets: [
        "Well integrity management systems",
        "Barrier assessment & annulus pressure reviews",
        "Corrosion & casing evaluation",
        "Workover, suspension & abandonment planning",
      ],
    },
    {
      slug: "artificial-lift",
      name: "Artificial Lift Advisory",
      tagline: "Choose and run lift systems that last longer and cost less.",
      bullets: [
        "ESP, rod pump, PCP & gas lift selection",
        "Lift design & optimization",
        "Run-life & failure root-cause analysis",
        "Lift surveillance & energy efficiency",
      ],
    },
    {
      slug: "field-development-planning",
      name: "Field Development Planning",
      tagline: "Turn discoveries and mature fields into economic development plans.",
      // DRAFT, added 2026-11-02 so this service's home-page panel/card reads
      // at the same length as the rest of the featured four (see
      // "Subsurface & reservoir" services on the home page), restating the
      // tagline and bullets as prose — no new claims.
      description:
        "We turn discoveries and mature fields into economic development plans, from integrated field development plans through concept selection and phasing. Drilling and infill programme design translate the chosen concept into an executable plan, and economics and investment cases test whether that plan is worth pursuing.",
      bullets: [
        "Integrated field development plans",
        "Concept selection & phasing",
        "Drilling & infill programme design",
        "Economics & investment cases",
      ],
    },
    {
      slug: "well-intervention",
      name: "Well Intervention Advisory",
      tagline: "Restore and grow well output with safe, cost-effective interventions.",
      bullets: [
        "Candidate selection & opportunity ranking",
        "Coiled tubing, slickline, wireline & snubbing",
        "Workovers, recompletions & water/gas shut-off",
        "Acidizing, scale removal & sand clean-outs",
        "Post-job evaluation & return on investment",
      ],
    },
    {
      slug: "wells-completions",
      name: "Wells & Completions Advisory",
      tagline: "Design wells and completions for long-term productivity.",
      bullets: [
        "Completion design & selection",
        "Stimulation & fracturing reviews",
        "Completion performance reviews",
        "Integration with surface facilities",
      ],
    },
    {
      slug: "asset-evaluation-due-diligence",
      name: "Asset Evaluation & Due Diligence",
      tagline: "Independent technical views for transactions and investment decisions.",
      // DRAFT, added 2026-11-02 — see Field Development Planning's own
      // description above for why.
      description:
        "We provide independent technical views for transactions and investment decisions, through technical due diligence for acquisitions and divestitures and asset health checks and benchmarking against comparable assets. Opportunity identification uncovers where an asset's value can still be improved, and late-life and decommissioning strategy addresses what happens once production ends.",
      bullets: [
        "Technical due diligence (A&D)",
        "Asset health checks & benchmarking",
        "Opportunity identification",
        "Late-life & decommissioning strategy",
      ],
    },
    {
      slug: "management-advisory",
      name: "Management Advisory",
      tagline:
        "Executive-level support that connects technical results with business priorities.",
      bullets: [
        "Operating cost reduction programmes",
        "Organization & capability reviews",
        "Operational excellence & KPIs",
        "Strategy, planning & board support",
      ],
    },
  ],
};

// `/services` index page (redesigned 2026-11-02 from a 10-card grid to a
// grouped, numbered list, matching a client-supplied reference image
// verbatim). Three groups, each listing its member services by slug in
// display order — the numbering on the page (01-10) runs continuously
// across all three groups, not restarting per group, so it is computed from
// each slug's position here rather than stored as a number. `indexDescription`
// is new copy written only for this page's compact 2-line row treatment,
// separate from each service's own longer `tagline`/`description` used
// elsewhere (the home page panels, the detail-page hero) — short enough to
// read as a single glance in a dense list. Source: the client's reference
// image, transcribed verbatim, except group 2's heading/lead and the
// Asset Evaluation and Artificial Lift rows, which the client supplied as
// explicit replacement copy over what the reference image showed for those
// two rows specifically — confirmed with the client that the image's own
// grouping (which group each service sits in) is otherwise unchanged.
export const serviceGroups = [
  {
    heading: "Subsurface & reservoir",
    lead: "Reduce drilling risk and understand what the reservoir will give you.",
    // The client's explicit choice: this group's rows show no index number
    // at all. Numbering instead starts at the next group and runs 1-6
    // across "Wells, Production & Surface Facilities" (5 items) and
    // "Management" (1 item) combined — see resolveGroups in
    // src/app/services/page.js, which reads this flag rather than assuming
    // "always skip the first group" by position.
    numbered: false,
    items: [
      {
        slug: "subsurface-geological",
        indexDescription:
          "Geological and geophysical consulting: seismic interpretation review, structural and stratigraphic mapping, petrophysical evaluation, static modelling and volumetrics; independent validation and certification of existing interpretations.",
      },
      {
        slug: "reservoir-management",
        indexDescription:
          "Reservoir engineering consulting: reserves and resources evaluation, decline-curve and material-balance analysis, reservoir simulation and production forecasting, waterflood, pressure maintenance and EOR screening.",
      },
      {
        slug: "field-development-planning",
        indexDescription:
          "Field development plans (FDP) and redevelopment studies: development concept, well counts, phasing and economics that turn mature fields into fundable plans.",
      },
      {
        slug: "asset-evaluation-due-diligence",
        // Client-supplied replacement copy, shorter than the reference
        // image's own text for this row.
        indexDescription:
          "Technical due diligence for acquisitions and divestitures, farm-ins with independent asset evaluation.",
      },
    ],
  },
  {
    // Heading and lead are the client's explicit replacement copy, given
    // directly in chat rather than read from the reference image (which
    // showed "Wells, production & surface" with no visible lead line for
    // this group).
    heading: "Wells, Production & Surface Facilities",
    lead: "Get more from your existing wells and facilities—and sustain the gains.",
    items: [
      {
        slug: "production-optimization",
        indexDescription:
          "Oil and gas production optimization: nodal and network analysis, well performance reviews, gas deliverability studies and surface de-bottlenecking; plant tie-in and facilities capacity reviews; flow assurance, scale, sand loading and sand management; mature and brownfield rejuvenation.",
      },
      {
        slug: "artificial-lift",
        // Client-supplied replacement copy over the reference image's own
        // text for this row.
        indexDescription:
          "Artificial lift selection, design and optimization: ESP, PCP, Jet Pump, Rod Pump, gas lift, plunger lift and Surface Multi-phase pump, and low-rate or liquid-loaded gas wells.",
      },
      {
        slug: "well-intervention",
        indexDescription:
          "Rigless well interventions, acid stimulation, water and gas shut-off, coiled tubing, sand re-completion and workover programs that restore well output safely and at low cost.",
      },
      {
        slug: "well-integrity",
        indexDescription:
          "Well integrity management systems, well barrier and sustained annulus pressure assessment, corrosion and casing evaluation, well suspension and plug-and-abandonment (P&A) planning.",
      },
      {
        slug: "wells-completions",
        indexDescription:
          "Well design and completion engineering for long-term productivity, sand control and operational readiness, plus workover and re-completion decisions.",
      },
    ],
  },
  {
    heading: "Management",
    lead: null,
    items: [
      {
        slug: "management-advisory",
        indexDescription:
          "Oil and gas management consulting and fractional executive support: portfolio and capital decisions, joint ventures and farm-outs, partner and government engagement, ESG reporting and HSE culture.",
      },
    ],
  },
];
