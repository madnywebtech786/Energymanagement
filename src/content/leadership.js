export const leadership = {
  eyebrow: "Leadership",
  heading: "Led by a former CEO & MD of an E&P company.",
  lead: "Complex reservoirs around the world. Onshore and offshore. Subsurface and surface.",
  name: "Sikandar Memon",
  credential: "Petroleum Engineer · Director & Chief Executive Officer",
  formerRole: "Former CEO & Managing Director, an E&P company",
  // Stated in the bio's own prose ("more than 35 years"); kept here too so
  // the credential panel's CountUp reads from one source instead of a
  // number duplicated between prose and component.
  yearsExperience: 35,
  // Verbatim from the client's reference design. Only the first 3
  // paragraphs: a 4th paragraph exists in the reference but is cut off
  // mid-sentence in the screenshot supplied, so it is left out entirely
  // rather than guessed at (confirmed with the client).
  bio: [
    "Sikandar Memon is an upstream oil and gas executive and petroleum engineer with more than 35 years across national and international operators in Pakistan, Saudi Arabia, Malaysia, the UAE and Algeria. He was CEO and Managing Director of a listed E&P company supplying more than a fifth of Pakistan's natural gas, after serving as its Chief Operating Officer over a workforce of about 1,300.",
    "His career spans onshore and offshore assets in some of the most geologically complex reservoirs in the world: major onshore operating areas in Saudi Arabia and Algeria, joint-venture assets in Abu Dhabi and Malaysia, Pakistan's mature, depleted and low-BTU gas fields, and offshore concessions in the Arabian Gulf and off the Indus delta, including deep-water blocks.",
    "He has engineered both sides of the wellhead. Subsurface: reservoir and well performance, nodal analysis, well integrity, stimulation, coiled tubing, water shut-off, sidetracks and artificial lift. Surface: production facilities, surface de-bottlenecking, plant tie-ins and operational readiness, including the plant and tie-in projects that advanced about 60 MMscfd of additional gas capacity.",
  ],
  // Credentials card (image 2 of the client's reference). Registration/APEGA
  // status is deliberately omitted: the reference screenshot shows that line
  // struck through, read as the client marking it for removal, not inclusion
  // (confirmed with the client). LinkedIn URL supplied by the client
  // 2026-11-05.
  credentials: {
    based: "Calgary, Alberta",
    experience: "35+ years, 1989 to present",
    assets: "Onshore & offshore across Southeast Asia, the Middle East, North Africa and Canada",
    expertise: "Subsurface & surface: reservoir, wells, production and facilities",
    linkedinUrl: "http://www.linkedin.com/in/sikandaralimemon",
  },
  // Employers are shown as text only, never as logos.
  experience: {
    label: "Selected prior professional experience",
    employers: [
      "BP",
      "Aramco",
      "PETRONAS",
      "ADNOC",
      "Occidental Petroleum (Oxy)",
      "United Energy Pakistan (UEP)",
      "Pakistan Petroleum Limited (PPL)"
    ],
  },
  // Verbatim citations from the client's reference (image 3).
  publications: {
    label: "Selected publications",
    items: [
      {
        title: "Rejuvenating Profitability and Performance of Aging Gas Field through Multi-Pronged Strategy.",
        venue: "SPE Annual Caspian Technical Conference, 2023.",
      },
      {
        title: "Plunger Lift Application in Packer Wells: Success Stories, Challenges & Lessons Learnt.",
        venue: "ADIPEC, 2023.",
      },
      {
        title: "Well Integrity Diagnostic & Solutions for In-Service Wells Realise Million Dollar Cost Savings.",
        venue: "Practical Well Integrity Conference, Houston, 2014.",
      },
      {
        title: "Price Projection Model for New Explorations and the Lost Control of Majors.",
        venue: "GEO 2012, Middle East Geosciences Conference.",
      },
    ],
  },
};
