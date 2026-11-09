// Masthead and posts for /thought-leadership. Each post is content the
// client hands over verbatim — this file is never drafted on the client's
// behalf the way DRAFT copy elsewhere in src/content is, since the whole
// point of this page is to host his own writing.
//
// `date` is a plain ISO string (YYYY-MM-DD). Neither it nor
// `readingMinutes` is rendered on the card any more (removed at the
// client's request — the date/reading-time row was starving the name and
// credential column of width at narrow screens, causing severe text
// wrapping, and the client wanted both gone regardless, not just the
// layout bug fixed). Both fields are kept in the data rather than
// deleted, since they're still meaningful authored metadata (when a post
// was written, a rough read-time estimate) that a future design could
// surface again without re-deriving it — `date` in particular must stay
// a fixed string if it's ever read again: this route prerenders under
// Cache Components, which forbids non-deterministic values (new Date(),
// Math.random()) during render, so no code should ever compute today's
// date or a relative "2 weeks ago" string from it at request time.
// `readingMinutes` is a plain authored integer for the same determinism
// reason, not computed from body/section length at render time — pick it
// once when the post is added.
//
// `body` is an array of paragraph strings, matching leadership.bio's own
// shape. body[0] is always visible on the page (it's the post's lead
// paragraph, shown right under the image); body.slice(1), if any, is what
// "See more" reveals. A short post can have only one paragraph — "See
// more" simply doesn't render for it (see FeedEntry in
// src/components/sections/thought-leadership/feed-entry.js).
//
// `sections` is the alternative to `body` for a "digest" post made of
// several named, co-equal findings rather than one lead idea with
// supporting elaboration (confirmed with the client rather than folding
// headings into body's plain-paragraph shape) — an array of
// `{ heading, text }`. A post has one or the other, never both: FeedEntry
// renders every section in full with no "See more" collapse, since each
// one is a distinct point a reader should see directly, not elaboration
// on an opening hook the way body's first paragraph is. Any code reading
// a post's prose generically (thought-leadership-feed.js's search index)
// has to handle both shapes — check there before adding a third.
//
// `image` is optional — omit the whole key for a text-only post. `src` is
// normally a static import from src/assets/images/ (the site's existing
// image-import convention). It can also be a plain string path into
// public/ for a file the client supplied directly outside that manifest
// system — the same precedent public/leader.jpeg and
// public/12_field_development.webp already set — in which case `width`/
// `height` must be given explicitly (Next can't read a public/ file's
// real dimensions at build time the way a static import lets it).
// `fit` is "cover" (default, omit it) for a photograph that can safely
// crop to fill its frame, or "contain" for a diagram whose full content
// must stay visible uncropped — matching how WhyUsPanel already shows
// 12_field_development.webp at its own real aspect ratio, not cropped.
//
// Worked example (the real values from the "field-development-phasing"
// seed post, kept here once that post itself was removed as placeholder
// content, so this shape has a concrete reference and not just prose):
//
//   image: {
//     src: "/12_field_development.webp",
//     width: 1511,
//     height: 998,
//     fit: "contain",
//     alt: "Isometric diagram of an integrated field: a well pad feeds a gathering line into a central processing facility, which exports by pipeline",
//     tag: "Field development",
//   },
//
// A photograph using the src/assets/images/ static-import convention
// instead (the more common case) omits `width`/`height`/`fit` entirely
// and just passes the imported image plus `alt`/`tag`.
//
// `categories` is a small, deliberately starter set, not a finished
// taxonomy — the client's own direction: build the structure and working
// filter/search functionality now, decide the real category set once real
// posts are being written. Each entry is `{ id, label }`; `id` is the
// stable value a post's own `category` field and the filter UI's URL
// param both reference, `label` is the display text, kept separate so a
// category's wording can be edited later without changing every post that
// already references its `id`. Adding a new category later is just adding
// an entry here, then setting that `id` on whichever posts belong to it —
// no other file needs to change (the filter UI reads this array directly,
// see thought-leadership-feed.js).
export const thoughtLeadership = {
  eyebrow: "Thought Leadership",
  heading: "Field notes from thirty-five years in E&P.",
  lead: "Practical lessons from real wells and real decisions: production turnarounds, faster time-to-cash, well integrity diagnostics, and energy policy work.",
  categories: [
    { id: "reservoir", label: "Reservoir" },
    { id: "field-development", label: "Field Development" },
    { id: "production-capital-efficiency", label: "Production & Capital Efficiency" },
    { id: "exploration-investment-decisions", label: "Exploration & Investment Decisions" },
    { id: "energy-security", label: "Energy Security" },
    { id: "governance-leadership", label: "Governance & Leadership" },
    { id: "developing-young-engineers", label: "Developing Young Engineers" },
  ],
  posts: [
    {
      // No date supplied — defaults to the day added, flag to the client
      // if a different one is wanted. Placed first (newest) per this
      // array's "most recently added first" ordering. The parenthetical
      // in the second section was corrected with the client directly: the
      // original text had an unclosed parenthesis and only 4 disciplines
      // listed despite saying "Five" — the client supplied the exact
      // closing content (confirmed these are the 4 intended items) and,
      // asked separately about the "Five"/4-items mismatch, chose to keep
      // "Five" as written rather than correct it to "Four".
      slug: "governance-and-leadership",
      date: "2026-11-10",
      readingMinutes: 3,
      category: "governance-leadership",
      opening: "Governance and Leadership",
      sections: [
        {
          heading: "Handshake Over Conflict",
          text: "Through weeks of direct CEO-to-CEO meetings without lawyers, resolving decade-old multimillion-dollar disputes.",
        },
        {
          heading: "The Greatest Risk to Capital Projects Isn’t Technical – It’s Governance",
          text: "Five governance disciplines (capable decision-makers, stage-gates that test both the project and the people, independent assurance, “value first, not win the case”).",
        },
        {
          heading: "Power Without Title",
          text: "Securing key joint-venture decisions and resolving complex partner situations.",
        },
        {
          heading: "The Algorithm Won’t Stand on the Rig Floor",
          // A trailing period was added for consistency with every other
          // section's own terminal punctuation in this file — the only
          // change made to this line; no wording was added or altered.
          text: "A practical view of AI in oil and gas.",
        },
      ],
      image: null,
    },
    {
      // No date supplied — same default as above.
      slug: "developing-young-engineers",
      date: "2026-11-10",
      readingMinutes: 4,
      category: "developing-young-engineers",
      opening: "Developing Young Engineers",
      sections: [
        {
          heading: "For Young Engineers: Office Politics 101",
          text: "A six-rule mini-course on workplace politics, built around a simple Situation, Impact, Proposal pattern, that helps engineers handle conflict calmly, protect their reputation and move from complaining to contributing.",
        },
        {
          heading: "All Gas Is Not Born Equal: Tight Gas Needs a Different Production Mindset",
          text: "Introduces the Production Connectivity Index and Dynamic Connectivity Management in tight gas, whether a fracture network stays productive.",
        },
        {
          heading: "The Part of Artificial Lift That’s Rarely Taught",
          text: "Offers a broader definition of artificial lift and a two-gate test, a “Lift Gap” to judge whether a well can flow and an economic check against water cut, helping engineers choose the right lift method.",
        },
      ],
      image: null,
    },
    {
      // Same date-default/reading-time-estimate note as the other two
      // posts below with no date supplied (see their own comments) —
      // flag to the client if a different date is wanted. No longer
      // first in this array (see the two posts above, added in a later
      // session): this array's order is "most recently added first," not
      // date-derived, since all five posts here share only two distinct
      // dates.
      slug: "exploration-and-investment-decisions",
      date: "2026-11-10",
      readingMinutes: 3,
      category: "exploration-investment-decisions",
      opening: "Exploration and Investment Decisions",
      sections: [
        {
          heading: "Buying a Block: Where Can It Break?",
          text: "A six-point pressure test for acquisitions (trap and seal, reservoir quality, charge, data maturity, facilities, and economics and execution) that turns a persuasive story into a risk-ranked buy, conditional-buy, defer or no-buy decision, helping investors avoid paying for blocks that only look brilliant on paper.",
        },
        {
          heading: "The Most Expensive Exploration Mistake Is Refusing to Stop",
          text: "A model-led decision gate for when the primary target fails: test another zone or acidize only when the result can change the investment decision.",
        },
      ],
      image: null,
    },
    {
      // Same no-date-supplied default as above. A single-section post —
      // kept as `sections` rather than folded into a plain body
      // paragraph, since the client labelled "Energy Security" and
      // "Reserves to Resilience" as distinct title/heading roles here
      // too, the same structure as the other two posts, just with one
      // finding instead of several.
      slug: "energy-security",
      date: "2026-11-10",
      readingMinutes: 2,
      category: "energy-security",
      opening: "Energy Security",
      sections: [
        {
          heading: "Reserves to Resilience",
          text: "Five realistic upstream shifts for moving from “reserves on paper” to “resilience in practice”: optimize existing wells before new drilling, fast-track known basins, and enable infrastructure sharing.",
        },
      ],
      image: null,
    },
    {
      // date: no date was given with this post's content, so it defaults
      // to the day it was added — flag to the client if a different date
      // is wanted. No longer first in this array (see the two posts
      // above, added in a later session): this array's order is "most
      // recently added first," not date-derived, since all three
      // November posts here share the same date. readingMinutes is an
      // estimate, not computed from a fixed words-per-minute formula:
      // the two older posts' own numbers (124 words -> 4 min, 80 words
      // -> 3 min) run at roughly 30 wpm, far slower than the file's own
      // comment's "/200" suggestion, so this post's ~6 min follows that
      // same established real rate against its own ~175 words across 4
      // sections, not the comment's literal formula.
      slug: "production-and-capital-efficiency",
      date: "2026-11-10",
      readingMinutes: 6,
      category: "production-capital-efficiency",
      opening: "Production and Capital Efficiency",
      sections: [
        {
          heading: "Engineering Turnarounds of Sick Wells",
          text: "Gas wells written off as dead were turned around through a sidetrack and a rigless intervention, with substantial gas and condensate production.",
        },
        {
          heading: "Designing for Time-to-Cash",
          text: "By planning tie-ins alongside drilling, discoveries reached first hydrocarbons three to six months early, pulling forward about USD 27.7 million in revenue, capturing about USD 1.2 million in time value, and leaving a lean critical-path inventory that guards against future revenue deferral.",
        },
        {
          heading: "Capital Allocation Over Drilling: How Do We Grow Production?",
          text: "Reframes production growth as a capital-allocation test in which every new well must compete with workovers, artificial-lift and ESP fixes, debottlenecking and debt reduction on risk-adjusted free cash flow.",
        },
        {
          heading: "Next USD 500 Million in Gas Value",
          text: "A four-step \"facility-first\" rule for new discoveries (fill existing plants, tie in to nearby spare capacity, relocate idle modular units, and build new only as a last resort) that can replace a USD 80–150 million greenfield plant taking three to five years with a USD 5–15 million tie-in producing within 6–18 months.",
        },
      ],
      image: null,
    },
  ],
};
