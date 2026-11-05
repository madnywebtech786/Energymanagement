// Masthead and posts for /thought-leadership. Each post is content the
// client hands over verbatim — this file is never drafted on the client's
// behalf the way DRAFT copy elsewhere in src/content is, since the whole
// point of this page is to host his own writing.
//
// `date` is a plain ISO string (YYYY-MM-DD), formatted for display by
// formatPostDate() in feed-entry.js — never new Date() at render time
// beyond parsing this fixed string, and never Date.now()-relative text
// like "2 weeks ago": this route prerenders under Cache Components, which
// forbids non-deterministic values (new Date(), Math.random()) during
// that render.
//
// `readingMinutes` is a plain authored integer, not computed from
// body.length at render time, for the same reason — pick it once when the
// post is added (roughly: total words / 200, rounded to the nearest
// minute, minimum 1) rather than deriving it on every request.
//
// `body` is an array of paragraph strings, matching leadership.bio's own
// shape. body[0] is always visible on the page (it's the post's lead
// paragraph, shown right under the image); body.slice(1), if any, is what
// "See more" reveals. A short post can have only one paragraph — "See
// more" simply doesn't render for it (see FeedEntry in
// src/components/sections/thought-leadership/feed-entry.js).
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
export const thoughtLeadership = {
  eyebrow: "Thought Leadership",
  heading: "Field notes from thirty-five years in E&P.",
  lead: "Observations on reservoirs, wells and the decisions that move them — written as they come up.",
  posts: [
    {
      slug: "reservoir-decline-curves",
      date: "2026-03-02",
      readingMinutes: 4,
      opening:
        "Most reservoir reviews treat decline curves as a forecasting exercise rather than a diagnostic one.",
      body: [
        "The shape of the decline tells you more about what's actually happening downhole than the number it predicts for next quarter. When a well drifts off its expected trajectory, that divergence is the signal worth chasing — not a nuisance to smooth over in the next type curve.",
        "I've seen teams spend weeks refining a forecast's accuracy while the far more useful question — why did this well stop behaving like its neighbours six months ago — goes unasked. The forecast is a by-product. The diagnosis is the work.",
        "None of this requires new tooling. It requires treating the decline curve as evidence first, prediction second.",
      ],
      image: null,
    },
    {
      slug: "field-development-phasing",
      date: "2026-01-28",
      readingMinutes: 3,
      opening:
        "Field development plans that skip a real phasing discussion look optimal on paper and strained by year three.",
      body: [
        "Once the first set of assumptions meets its first surprise, a plan without built-in decision points has nowhere to adapt. The phasing conversation is where that flexibility actually gets designed in, long before a rig ever moves.",
        "The plans that age well are rarely the most optimistic ones. They're the ones that were honest, early, about which assumptions were load-bearing.",
      ],
      image: {
        // The client's own diagram, already in public/ and already used
        // by WhyUsPanel — reused here rather than sourcing a separate
        // photo for this post, matching the diagram's own subject matter
        // directly (field development phasing).
        src: "/12_field_development.webp",
        width: 1511,
        height: 998,
        fit: "contain",
        alt: "Isometric diagram of an integrated field: a well pad feeds a gathering line into a central processing facility, which exports by pipeline",
        tag: "Field development",
      },
    },
  ],
};
