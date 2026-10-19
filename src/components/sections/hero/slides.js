import { approach } from "@/content/approach";
import { guarantee } from "@/content/guarantee";
import { hero } from "@/content/hero";
import { images } from "@/content/images";

// The three hero slides. Copy is unchanged from src/content except where
// noted — this only arranges it for the slider. Only the call-to-action
// labels on slides 2 and 3 ("See our approach", "How it works") are new;
// everything else already existed in hero.js, approach.js or guarantee.js.
// hrefs are plain route paths, resolved by <Button>'s own internal/external
// split.
//
// Slide 1 and 3's headings are shortened from the full sentence in their
// source file, at the user's request (2026-10-19): same impression, fewer
// words for the hero's display size. The source files (hero.js,
// guarantee.js) are untouched — those full sentences are still what /about
// and the rest of the site use; only this slider gets the short version.
// Slide 3's reuses "VALUE"/"GUARANTEE" from guarantee.seal.lines, so it
// isn't new wording, just a shorter arrangement of the same two words.
export const heroSlides = [
  {
    key: "overview",
    image: images.hero.field,
    eyebrow: hero.eyebrow,
    heading: "Integrated E&P advisory",
    lead: hero.lead,
    actions: [hero.actions.primary, hero.actions.secondary],
    hrefs: ["/services", "/contact"],
  },
  {
    key: "approach",
    image: images.hero.strata,
    eyebrow: approach.eyebrow,
    heading: approach.heading,
    lead: approach.lead,
    actions: ["See our approach"],
    hrefs: ["/approach"],
  },
  {
    key: "guarantee",
    image: images.hero.drawings,
    eyebrow: guarantee.eyebrow,
    heading: "Our value guarantee",
    lead: guarantee.summary,
    note: guarantee.scope,
    actions: ["How it works", hero.actions.secondary],
    hrefs: ["/about#guarantee", "/contact"],
  },
];
