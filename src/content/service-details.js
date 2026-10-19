// Detail-page-only content for /services/[slug]: everything beyond the
// lean name/tagline/bullets model in services.js (used by the home page,
// header dropdown and mobile menu). Kept in its own file so that model
// stays fast to scan and this much larger layer doesn't bloat it.
//
// Pain points, approach narrative and FAQ answers are client-focused,
// conversion-oriented prose written from the existing tagline/bullets plus
// general, well-known E&P industry context (declining production, well
// integrity risk, stranded capital in undeveloped reserves, and so on) —
// never a claim about this company's own past results, metrics, clients or
// case studies, none of which exist in the source material. DRAFT, for
// client sign-off, same as services.js's own description field.
//
// `stages` keys into approach.js's six lifecycle stages (Assess,
// Characterize, Plan, Execute, Optimize, Sustain) by index.
export const serviceDetails = {
  "production-optimization": {
    painPoints: [
      {
        without: "Wells and networks quietly lose production to constraints nobody has gone looking for.",
        with: "Nodal and network analysis finds exactly where the system is losing barrels, so the gain is real and measurable.",
      },
      {
        without: "Deliverability erodes gradually, and by the time it shows up in monthly reports, months of production are already gone.",
        with: "Regular well performance reviews catch decline early enough to act on it, not just explain it after the fact.",
      },
      {
        without: "Scale, sand and flow assurance problems get treated as one-off incidents instead of a pattern.",
        with: "Flow assurance and sand management are built into the optimization work, so fixes hold instead of repeating.",
      },
    ],
    approach: [
      "We start by establishing exactly where production is actually leaving value on the table — not a generic audit, but a nodal and network analysis that traces the system from reservoir to sales point and isolates the real constraints.",
      "From there, debottlenecking targets those specific limits rather than spreading effort evenly across every well. The result is a prioritized list of interventions ranked by the production gain each one actually delivers, not by how easy it is to action.",
      "Flow assurance, scale and sand management are addressed alongside the optimization work itself, so a gain captured this quarter is still there next quarter instead of being eroded by the same mechanical problem recurring.",
    ],
    scopeNotes: {
      "Nodal & network analysis": "Pinpoints exactly where the system — well, gathering network, facilities — is constraining flow, so effort goes where it actually pays off.",
      "Well performance & deliverability": "Tracks how each well is really producing against its potential, catching decline while there's still time to respond to it.",
      "Production optimization & debottlenecking": "Turns the diagnosis into a ranked, actionable set of interventions, not a report that sits on a shelf.",
      "Flow assurance, scale & sand management": "Protects the gain once it's captured, so the same mechanical issue doesn't quietly undo the work months later.",
    },
    stages: [4], // Optimize
    faq: [
      {
        q: "How is this different from the production surveillance our own team already does?",
        a: "Internal surveillance usually tracks what's happening well by well. This work looks at the whole network together — wells, gathering lines, facilities — and finds constraints that only show up when you trace the full path from reservoir to sales point, which single-well reviews typically miss.",
      },
      {
        q: "Do we need new equipment or capital investment for this to work?",
        a: "Often not. A meaningful share of production optimization gains come from operating and debottlenecking changes within the existing system, not new capital. Where equipment changes genuinely are the answer, that's identified and ranked alongside the lower-cost options, not assumed upfront.",
      },
      {
        q: "How long does an initial production optimization assessment take?",
        a: "It depends on the number of wells and the complexity of the network, but an initial assessment — the phase covered by our guarantee — is scoped and timed with you before work begins, so there's no open-ended commitment.",
      },
      {
        q: "What does 'debottlenecking' actually mean in practice?",
        a: "It means identifying the single point in a well or network — a choke setting, a pipeline segment, a separator, a pump — that's limiting how much the rest of the system could otherwise produce, and addressing that specific point rather than making broad changes everywhere.",
      },
    ],
    relatedSlugs: ["artificial-lift", "well-intervention", "reservoir-management"],
  },

  "reservoir-management": {
    painPoints: [
      {
        without: "Recovery strategy gets set once, early, and rarely revisited as new data comes in.",
        with: "Reserves and resource assessments are grounded in current data, so the recovery plan reflects what the reservoir is actually doing now.",
      },
      {
        without: "Decline curves are extrapolated without material balance checks, so forecasts drift from reality over time.",
        with: "Decline curve and material balance analysis are cross-checked against each other, catching forecast drift before it becomes a budgeting problem.",
      },
      {
        without: "Waterflood, EOR and other recovery options are evaluated too late, after much of the easy recovery is already gone.",
        with: "Recovery studies are run early enough that the options they identify are still economically available to act on.",
      },
    ],
    approach: [
      "Reservoir management starts with an honest, current picture: reserves and resource assessments, decline curve analysis and material balance checks run together so one method's blind spots are caught by the other, instead of a single curve-fit standing in for the whole picture.",
      "That picture feeds reservoir simulation and forecasting — not a black-box model, but a working tool you can interrogate against different development and operating scenarios before committing capital to any of them.",
      "Where primary recovery is approaching its limits, waterflood, EOR and other recovery studies are run while the reservoir still has the pressure and remaining oil in place to make those options economically attractive, not after the window has mostly closed.",
    ],
    scopeNotes: {
      "Reserves & resource assessment": "Gives you a current, defensible number to plan and budget against, not a figure carried forward from an earlier study.",
      "Decline curve & material balance analysis": "Cross-checks two independent methods against each other, so forecast drift is caught early rather than discovered at year-end.",
      "Reservoir simulation & forecasting": "A working model you can test development and operating scenarios against before committing capital, not a static report.",
      "Waterflood, EOR & recovery studies": "Identifies and evaluates recovery options while the reservoir still has the pressure and oil in place to make them worthwhile.",
    },
    stages: [1, 2], // Characterize, Plan
    faq: [
      {
        q: "At what point in a reservoir's life does this kind of review make the most sense?",
        a: "Earlier than most operators think. The most valuable window for waterflood, EOR and recovery planning is while reservoir pressure and remaining oil in place are still favourable — waiting until primary decline is well advanced narrows the economically attractive options considerably.",
      },
      {
        q: "Can this work be done with the data we already have, or do we need new studies first?",
        a: "In most cases, existing production, pressure and well data are enough to start. Where a genuine data gap exists — missing pressure surveys, for example — that's identified early and scoped as its own small piece of work, not discovered mid-engagement.",
      },
      {
        q: "How does reservoir simulation here differ from a standard third-party study?",
        a: "The model is built and delivered as something your team can keep interrogating against new scenarios, not a one-time report. The goal is a decision-support tool, not a document.",
      },
      {
        q: "Do you work with reservoirs that already have an existing simulation model?",
        a: "Yes — reviewing, validating and updating an existing model against current production history is often faster and more cost-effective than building a new one from scratch, and that option is assessed before any new model work is proposed.",
      },
    ],
    relatedSlugs: ["subsurface-geological", "field-development-planning", "asset-evaluation-due-diligence"],
  },

  "subsurface-geological": {
    painPoints: [
      {
        without: "Drilling decisions get made on an interpretation that was never independently stress-tested.",
        with: "Structural and stratigraphic interpretation is built to be defensible, reducing the risk of a costly drilling surprise.",
      },
      {
        without: "Petrophysical logs are read quickly rather than evaluated rigorously, so pay zones get missed or overstated.",
        with: "Careful petrophysical log evaluation gives you a realistic read on what's actually in the rock before capital is committed.",
      },
      {
        without: "Prospects get matured and wells get placed on incomplete static models, inflating uncertainty on every number downstream.",
        with: "Static modelling and volumetrics are built properly first, so prospect maturation and well placement rest on solid ground.",
      },
    ],
    approach: [
      "Subsurface work starts with structural and stratigraphic interpretation that's built to hold up under scrutiny — tracing faults, horizons and depositional patterns with enough rigor that the interpretation survives contact with new well data, not just the next presentation.",
      "Petrophysical log evaluation turns that interpretation into a quantified picture of reservoir quality: net pay, porosity, saturation — the numbers that actually drive economics, evaluated carefully rather than read off a quick-look log.",
      "Static modelling and volumetrics bring interpretation and petrophysics together into one consistent model, which is what prospect maturation and well placement decisions should actually be built on — not a sketch, a defensible model with quantified uncertainty.",
    ],
    scopeNotes: {
      "Structural & stratigraphic interpretation": "Built to hold up against new well data, reducing the risk of a drilling surprise that could have been anticipated.",
      "Petrophysical log evaluation": "A rigorous, quantified read on reservoir quality — net pay, porosity, saturation — not a quick-look estimate.",
      "Static modelling & volumetrics": "Brings interpretation and petrophysics together into one consistent model with quantified uncertainty, not a sketch.",
      "Prospect maturation & well placement": "Decisions grounded in the static model's actual output, not intuition applied to an incomplete picture.",
    },
    stages: [1], // Characterize
    faq: [
      {
        q: "What kind of data do you need to start a subsurface review?",
        a: "Typically existing well logs, seismic interpretation (where available), core data and any prior geological reports. The initial assessment identifies what's already usable and what, if anything, genuinely needs to be acquired before deeper work proceeds.",
      },
      {
        q: "Can you work with limited or older seismic data?",
        a: "Yes. Reinterpreting existing seismic with current well control often sharpens a structural picture considerably without the cost of new acquisition — that's assessed as a first step before any new data is proposed.",
      },
      {
        q: "How does this reduce drilling risk in practical terms?",
        a: "A defensible static model with quantified uncertainty means a well location is chosen because the data supports it, not because it looked reasonable on a map — which directly lowers the odds of a dry hole or an underperforming completion.",
      },
      {
        q: "Do you handle both conventional and unconventional reservoirs?",
        a: "Yes, the structural, stratigraphic and petrophysical methods apply across both, though the specific techniques and the volumetrics approach are adapted to the reservoir type in question.",
      },
    ],
    relatedSlugs: ["reservoir-management", "field-development-planning", "wells-completions"],
  },

  "well-integrity": {
    painPoints: [
      {
        without: "Well integrity issues surface as incidents instead of being caught by a system built to find them first.",
        with: "A structured well integrity management system catches risk before it becomes an incident, a shut-in, or a regulatory finding.",
      },
      {
        without: "Barrier and annulus pressure anomalies get normalized over time instead of investigated.",
        with: "Regular barrier assessment and annulus pressure reviews treat every anomaly as worth understanding, not explaining away.",
      },
      {
        without: "Corrosion and casing condition are assumed rather than evaluated, until a failure forces the question.",
        with: "Corrosion and casing evaluation give you a real answer on well condition before it's forced on you by a failure.",
      },
    ],
    approach: [
      "Well integrity work starts with the management system itself: the structured process that catches a developing problem — a barrier degrading, a pressure trend drifting — while it's still a line on a chart, not an incident report.",
      "Barrier assessment and annulus pressure reviews are run against that system regularly, not only when something looks wrong, because the wells that cause the most expensive problems are often the ones where nothing looked wrong until it suddenly did.",
      "Corrosion and casing evaluation complete the picture, feeding directly into workover, suspension and abandonment planning — so decisions about a well's future are made from an honest assessment of its condition, not a guess.",
    ],
    scopeNotes: {
      "Well integrity management systems": "A structured process that catches developing risk early, while it's still manageable and inexpensive to address.",
      "Barrier assessment & annulus pressure reviews": "Run as routine practice, not only in response to a visible problem — catching drift before it becomes a failure.",
      "Corrosion & casing evaluation": "An honest, current read on well condition, replacing assumption with evidence before a decision is made.",
      "Workover, suspension & abandonment planning": "Built on the actual integrity picture, so the chosen path matches the well's real condition, not a guess.",
    },
    stages: [5], // Sustain
    faq: [
      {
        q: "What triggers the need for a well integrity review?",
        a: "Ideally, a regular surveillance cadence rather than a single trigger — but common prompts include approaching a regulatory review, declining annulus pressure trends, aging infrastructure, or preparing for a workover, suspension or sale.",
      },
      {
        q: "Does this work meet Alberta's regulatory requirements for well integrity management?",
        a: "The assessment is structured around recognized well integrity management practice. Where engineering work must be formally authenticated for a regulatory submission, that specific scope is performed and sealed by appropriately licensed professionals engaged for it — see our professional responsibility note.",
      },
      {
        q: "Can this review help with a late-life or abandonment decision?",
        a: "Yes — corrosion and casing evaluation feed directly into whether a well is a workover, suspension or abandonment candidate, giving you an evidence-based basis for that decision rather than a default assumption.",
      },
      {
        q: "How often should a well integrity review be repeated?",
        a: "It depends on well age, completion type and risk profile, but the review itself includes a recommended surveillance cadence going forward, so it isn't a one-time snapshot.",
      },
    ],
    relatedSlugs: ["well-intervention", "wells-completions", "asset-evaluation-due-diligence"],
  },

  "artificial-lift": {
    painPoints: [
      {
        without: "A lift system gets selected once and left in place long after well conditions have changed around it.",
        with: "ESP, rod pump, PCP and gas lift selection is matched to how the well is actually performing, not how it performed at first.",
      },
      {
        without: "Run-life failures get fixed one at a time, with the same root cause quietly repeating across the field.",
        with: "Run-life and failure root-cause analysis finds the pattern, so the fix addresses the actual cause instead of the latest symptom.",
      },
      {
        without: "Lift systems run at a fixed setting indefinitely, burning energy and shortening equipment life unnecessarily.",
        with: "Lift surveillance and energy efficiency work keeps the system tuned to current conditions, extending run-life and controlling cost.",
      },
    ],
    approach: [
      "Artificial lift work begins with matching the lift method — ESP, rod pump, PCP or gas lift — to what the well is actually producing today, because a system selected for original conditions often stops being the right choice as rates, water cut and pressure shift over the well's life.",
      "Where failures are happening, run-life and failure root-cause analysis looks across the well's full failure history, and often across similar wells in the same field, to find the pattern a single post-mortem would miss — because the same failure repeating isn't bad luck, it's a diagnosable cause.",
      "Ongoing lift surveillance and energy efficiency work keeps the system tuned as conditions continue to change, so run-life gains are sustained rather than a one-time fix that drifts back out of tune within a year.",
    ],
    scopeNotes: {
      "ESP, rod pump, PCP & gas lift selection": "Matched to current well conditions, not the conditions the well was completed under.",
      "Lift design & optimization": "Tuned to extract the production the well can actually deliver, not a generic default setting.",
      "Run-life & failure root-cause analysis": "Looks across failure history and field-wide patterns to find the actual cause, not just the latest symptom.",
      "Lift surveillance & energy efficiency": "Keeps the system tuned as conditions change, so gains in run-life and cost control hold over time.",
    },
    stages: [3, 4], // Execute, Optimize
    faq: [
      {
        q: "How do you decide whether a well needs a different lift method entirely, versus a tune-up of the existing one?",
        a: "That decision comes from comparing current well performance — rate, water cut, pressure — against what the installed lift method can efficiently handle. Where the gap is small, optimization of the existing system is usually the faster, lower-cost path; where it's fundamental, a method change is recommended and justified with the economics behind it.",
      },
      {
        q: "We're seeing repeated ESP or rod pump failures. Can you help identify why?",
        a: "Yes — this is exactly what run-life and failure root-cause analysis is for. It looks at the pattern across multiple failures rather than treating each one as an isolated incident, which is usually where the real, fixable cause becomes visible.",
      },
      {
        q: "Does lift optimization require new equipment?",
        a: "Not always. A significant share of lift optimization gains come from design and operating changes to existing equipment. Where a genuine equipment upgrade is the right answer, it's identified and the economics are laid out alongside the lower-cost alternatives.",
      },
      {
        q: "What does 'lift surveillance' involve on an ongoing basis?",
        a: "Regular monitoring of lift system performance against well conditions, flagging drift before it becomes a failure or a meaningful efficiency loss — the surveillance cadence is scoped with you as part of the engagement.",
      },
    ],
    relatedSlugs: ["production-optimization", "well-intervention", "wells-completions"],
  },

  "field-development-planning": {
    painPoints: [
      {
        without: "A discovery or mature field sits undeveloped because no one has built the economic case to justify the capital.",
        with: "An integrated field development plan turns the resource into a concrete, fundable path forward.",
      },
      {
        without: "Development concepts get chosen early and rarely revisited, locking in a phasing approach that may not be optimal.",
        with: "Concept selection and phasing are evaluated against alternatives before capital is committed, not assumed from the start.",
      },
      {
        without: "Drilling and infill programmes are planned well by well, missing the efficiency of a sequenced, field-wide approach.",
        with: "A coordinated drilling and infill programme design captures sequencing efficiencies a well-by-well approach misses.",
      },
    ],
    approach: [
      "Field development planning starts by building the integrated plan itself — the single document that ties subsurface understanding, well design, facilities and the development sequence together, so every subsequent decision is made against one coherent picture rather than separate work streams that don't quite agree with each other.",
      "Concept selection and phasing are evaluated as genuine alternatives, not a single assumed path — comparing development pace, capital exposure and recovery outcome across realistic options before committing to one.",
      "Drilling and infill programme design, and the economics and investment case behind the plan, close the loop: a development plan that's not just technically sound but built to be defensible in front of the people who approve the capital.",
    ],
    scopeNotes: {
      "Integrated field development plans": "One coherent plan tying subsurface, wells and facilities together, not separate work streams that don't quite agree.",
      "Concept selection & phasing": "Realistic alternatives compared on pace, capital exposure and recovery outcome before a path is chosen.",
      "Drilling & infill programme design": "Sequenced for field-wide efficiency, not planned well by well in isolation.",
      "Economics & investment cases": "Built to be defensible in front of the people who actually approve the capital.",
    },
    stages: [2], // Plan
    faq: [
      {
        q: "Is this suitable for a new discovery, or only for an already-producing field?",
        a: "Both. The same integrated planning discipline applies whether you're moving a new discovery toward first development or re-planning a mature field around infill drilling, workovers or a change in strategy.",
      },
      {
        q: "How do you handle uncertainty in a new discovery with limited data?",
        a: "Concept selection is run against a realistic range of subsurface scenarios rather than a single best-estimate case, so the chosen development path is robust to the genuine uncertainty rather than fragile to one assumption turning out wrong.",
      },
      {
        q: "What does the deliverable actually look like — is it a report, or something we can act on?",
        a: "The plan is built to be actionable: a development concept and phasing decision, a drilling and infill sequence, and an economics case — the set of documents a capital approval process actually needs, not a narrative summary alone.",
      },
      {
        q: "Can you work alongside our existing planning or reservoir engineering team?",
        a: "Yes — this is commonly structured as augmentation to an existing team, bringing senior planning experience to a specific phase or decision rather than replacing the team's own ongoing work.",
      },
    ],
    relatedSlugs: ["reservoir-management", "subsurface-geological", "asset-evaluation-due-diligence"],
  },

  "well-intervention": {
    painPoints: [
      {
        without: "Intervention candidates are picked reactively, chasing the loudest problem instead of the best return.",
        with: "Candidate selection and opportunity ranking identify the interventions that genuinely deliver the strongest return.",
      },
      {
        without: "The intervention method is chosen out of habit rather than fit for the specific well problem.",
        with: "Coiled tubing, slickline, wireline and snubbing are matched to what the specific intervention actually requires.",
      },
      {
        without: "A completed intervention's success or failure is never formally evaluated, so lessons don't carry forward to the next job.",
        with: "Post-job evaluation and return-on-investment analysis turn every intervention into a lesson that improves the next one.",
      },
    ],
    approach: [
      "Intervention planning starts with candidate selection and opportunity ranking — reviewing the well population systematically to find where an intervention will actually move the needle, rather than responding to whichever well is causing the most noise this month.",
      "The intervention method — coiled tubing, slickline, wireline, snubbing, a workover or recompletion, acidizing, scale removal, a sand clean-out, a water or gas shut-off — is matched to the specific mechanical and reservoir problem at hand, not defaulted to whatever's been used before.",
      "Every job closes with post-job evaluation and return-on-investment analysis, so results are measured honestly and what's learned — what worked, what didn't, why — carries forward into how the next candidate is selected and planned.",
    ],
    scopeNotes: {
      "Candidate selection & opportunity ranking": "A systematic review of the well population to find where intervention actually pays off, not just where the noise is loudest.",
      "Coiled tubing, slickline, wireline & snubbing": "The method matched to the specific problem, not defaulted to habit.",
      "Workovers, recompletions & water/gas shut-off": "Addresses the mechanical or reservoir issue directly, planned against the well's actual condition.",
      "Acidizing, scale removal & sand clean-outs": "Targeted treatment based on diagnosed cause, restoring productivity rather than masking the symptom temporarily.",
      "Post-job evaluation & return on investment": "Every job becomes a lesson, measured honestly, that improves how the next candidate is selected and planned.",
    },
    stages: [4], // Optimize
    faq: [
      {
        q: "How do you decide which wells are worth intervening on?",
        a: "Through systematic candidate selection and opportunity ranking across the well population — comparing expected production uplift, intervention cost and risk, so effort goes to the wells where the return genuinely justifies it rather than the ones generating the most attention.",
      },
      {
        q: "What's the difference between a workover and a well intervention?",
        a: "Well intervention is the broader category — it covers everything from a simple slickline or wireline job through to a full workover or recompletion. The right scope depends on the specific well problem, which is part of what candidate diagnosis establishes.",
      },
      {
        q: "How is success measured after an intervention is complete?",
        a: "Through formal post-job evaluation comparing actual production response against the pre-job forecast, plus a return-on-investment calculation — so results are assessed honestly rather than assumed successful by default.",
      },
      {
        q: "Can you help build an intervention programme across multiple wells, not just a single job?",
        a: "Yes — candidate selection and opportunity ranking are typically run across a well population to build a prioritized, multi-well programme, not scoped one well at a time.",
      },
    ],
    relatedSlugs: ["production-optimization", "artificial-lift", "well-integrity"],
  },

  "wells-completions": {
    painPoints: [
      {
        without: "Completion design gets reused from the last well instead of matched to this well's specific reservoir.",
        with: "Completion design and selection are matched to the specific reservoir, targeting long-term productivity, not convenience.",
      },
      {
        without: "Stimulation and fracturing results are accepted without a structured review of what actually drove performance.",
        with: "Stimulation and fracturing reviews identify what's actually driving results, so the next design improves on the last.",
      },
      {
        without: "Completion performance is judged only by first production, missing how the design holds up over the well's life.",
        with: "Completion performance reviews look at productivity over time, not just the headline number from first flow.",
      },
    ],
    approach: [
      "Completions work starts with design and selection that's matched to the specific reservoir and well objective — completion type, fluid system, perforation or stimulation strategy chosen for this well's rock and fluid properties, not carried over from the last pad because it's what was used there.",
      "Stimulation and fracturing reviews look closely at what actually drove the result on completed wells — which design choices correlated with strong performance and which didn't — so each new completion design is an improvement on the last, grounded in evidence rather than habit.",
      "Completion performance reviews extend that discipline across the well's productive life, not just the first weeks of flow, and feed directly into integration with surface facilities so the completion and the surface system are designed to work together rather than as separate decisions.",
    ],
    scopeNotes: {
      "Completion design & selection": "Matched to this well's specific reservoir and fluid properties, not carried over from the last pad.",
      "Stimulation & fracturing reviews": "Identifies what actually drove performance, so the next design is grounded in evidence, not habit.",
      "Completion performance reviews": "Tracks productivity over the well's life, not just the first flow numbers.",
      "Integration with surface facilities": "Completion and surface design treated as one connected decision, not two separate ones.",
    },
    stages: [3], // Execute
    faq: [
      {
        q: "Do you design completions for new wells, or also review completions on existing wells?",
        a: "Both. New-well completion design and selection is one part of the scope; reviewing and diagnosing the performance of existing completions — to inform future design or identify remedial opportunities — is the other.",
      },
      {
        q: "How do you evaluate whether a past stimulation or fracturing job was successful?",
        a: "By comparing design parameters against actual production response across a set of wells, looking for the patterns that correlate with stronger performance — not judging a single job in isolation, which rarely isolates the real cause.",
      },
      {
        q: "Can completion design work be done alongside an operator's existing drilling programme?",
        a: "Yes — this is commonly structured as technical support within an active drilling and completions programme, reviewing or designing specific wells rather than running a separate, parallel process.",
      },
      {
        q: "What's included in 'integration with surface facilities'?",
        a: "Making sure the completion's expected rates, pressures and fluid handling needs are matched to what the surface facilities — separators, flowlines, artificial lift provisions — can actually accommodate, so the two aren't designed in isolation from each other.",
      },
    ],
    relatedSlugs: ["artificial-lift", "well-integrity", "subsurface-geological"],
  },

  "asset-evaluation-due-diligence": {
    painPoints: [
      {
        without: "A transaction decision is made on the seller's numbers alone, with no independent technical check.",
        with: "Technical due diligence gives you an independent read on the asset before capital changes hands.",
      },
      {
        without: "An asset's real condition only becomes clear after the deal closes, when it's too late to reprice it.",
        with: "Asset health checks and benchmarking surface the real condition before the deal closes, while it can still shape terms.",
      },
      {
        without: "Late-life and decommissioning liability gets underestimated, turning into an expensive surprise years later.",
        with: "Late-life and decommissioning strategy puts a realistic number on that liability up front, not after it's already yours.",
      },
    ],
    approach: [
      "Technical due diligence (A&D) starts with an independent, technically grounded review of the asset being considered — production history, reserves, well and facility condition, development upside — built to stand apart from the seller's own representation, because the whole point of due diligence is a second, independent opinion.",
      "Asset health checks and benchmarking compare the target against realistic operating and technical standards, surfacing issues — deferred maintenance, integrity concerns, underperforming wells — that a purely financial review wouldn't catch, while there's still time for those findings to shape price or terms.",
      "Where the asset includes aging infrastructure, late-life and decommissioning strategy puts a realistic, evidence-based number on that future liability, so it's priced into the decision today rather than discovered as a surprise obligation after closing.",
    ],
    scopeNotes: {
      "Technical due diligence (A&D)": "An independent technical opinion, separate from the seller's own representation of the asset.",
      "Asset health checks & benchmarking": "Surfaces real condition issues while there's still time for them to shape price or deal terms.",
      "Opportunity identification": "Flags upside the seller's own data room may not have highlighted, informing what the asset could be worth to you specifically.",
      "Late-life & decommissioning strategy": "A realistic liability estimate priced into the decision now, not discovered as a surprise after closing.",
    },
    stages: [0], // Assess
    faq: [
      {
        q: "How quickly can a technical due diligence review be turned around for a live transaction?",
        a: "Timelines are scoped against your transaction deadline from the outset — due diligence work is, by nature, time-constrained, and the engagement is structured around the data room access and timeline you're working with.",
      },
      {
        q: "What's typically included in an asset health check?",
        a: "A review of well performance against type curves or benchmarks, facility and well integrity condition, and operating cost structure compared to realistic peer standards — the technical picture a financial model alone won't show.",
      },
      {
        q: "Can you help identify upside the seller's data room doesn't highlight?",
        a: "Yes — opportunity identification is specifically about finding development, optimization or recovery upside that may be underrepresented in how the asset is being marketed, which can meaningfully inform what it's actually worth to you.",
      },
      {
        q: "Do you work on both the buy-side and sell-side of a transaction?",
        a: "Yes, both. Sell-side work typically focuses on building a technically defensible data room and identifying issues before a buyer's diligence does; buy-side work focuses on independent verification and risk identification.",
      },
    ],
    relatedSlugs: ["well-integrity", "reservoir-management", "field-development-planning"],
  },

  "management-advisory": {
    painPoints: [
      {
        without: "Cost reduction initiatives cut broadly and risk taking out capability the business still needs.",
        with: "Operating cost reduction programmes are built to cut cost without cutting the capability that protects production.",
      },
      {
        without: "Organization structure reflects history rather than what the current asset portfolio actually requires.",
        with: "Organization and capability reviews align structure to what the business genuinely needs today, not what it inherited.",
      },
      {
        without: "Technical results and business priorities get discussed in separate rooms, so good engineering doesn't translate into good decisions.",
        with: "Strategy, planning and board support connect technical results directly to the decisions leadership actually has to make.",
      },
    ],
    approach: [
      "Management advisory starts from the same technical grounding as the rest of the practice, applied to operating cost reduction: finding the cost that can genuinely come out of the business without eroding the production, safety or integrity performance that protects its value.",
      "Organization and capability reviews look honestly at whether the current structure and skill mix match what the asset portfolio actually needs now, not what made sense several reorganizations ago — and operational excellence and KPI work gives leadership a clear, current read on how the business is actually performing.",
      "All of it feeds into strategy, planning and board support: translating technical and operational findings into the language and the decisions a board or executive team is actually weighing, so good engineering work results in good business decisions, not a report that sits beside them.",
    ],
    scopeNotes: {
      "Operating cost reduction programmes": "Targets cost that can come out without eroding the production, safety or integrity performance protecting asset value.",
      "Organization & capability reviews": "An honest look at whether structure and skills match what the current portfolio needs, not organizational history.",
      "Operational excellence & KPIs": "Gives leadership a current, clear read on how the business is actually performing, not a lagging summary.",
      "Strategy, planning & board support": "Translates technical findings into the decisions a board or executive team is actually weighing.",
    },
    stages: [0, 1, 2, 3, 4, 5], // spans the full lifecycle — executive/strategic, not stage-specific
    faq: [
      {
        q: "Is this advisory for operating companies only, or does it apply to investors as well?",
        a: "Both. Operating companies use it for internal cost, structure and strategy decisions; investors and boards use it for independent perspective on an asset or portfolio they oversee but don't operate day to day.",
      },
      {
        q: "How does a cost reduction programme avoid cutting capability the business still needs?",
        a: "By grounding the review in actual technical and operational understanding of what each function protects — production, safety, integrity — rather than applying a flat percentage cut across the board, which is where capability typically gets damaged.",
      },
      {
        q: "Can this work be brought in for a specific board decision, rather than an ongoing engagement?",
        a: "Yes — strategy, planning and board support is commonly scoped around a specific upcoming decision or board presentation, not only as a continuous advisory relationship.",
      },
      {
        q: "How is this different from a traditional management consultancy?",
        a: "The judgment brought to organization, cost and strategy questions here comes from direct E&P operating and executive experience, not a generalist consulting framework applied to an industry the team hasn't actually worked in.",
      },
    ],
    relatedSlugs: ["asset-evaluation-due-diligence", "field-development-planning", "production-optimization"],
  },
};
