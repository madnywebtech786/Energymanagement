import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Photo } from "@/components/ui/photo";
import { approach } from "@/content/approach";
import { guarantee } from "@/content/guarantee";
import { hero } from "@/content/hero";
import { images } from "@/content/images";
import { typeset } from "@/lib/typeset";
import { Frame } from "./frame";

// Slide copy comes from the existing site; only the button labels on slides 2
// and 3 ("See our approach", "How it works") are new. `worst` is the measured
// contrast of navy text over the veiled photo: the 2nd-percentile pixel in the
// text zone, across 1440x900, 1920x1080, 768x1024 and 390x844 crops.
const SLIDES = [
  {
    name: "Slide 1",
    image: images.hero.field,
    eyebrow: hero.eyebrow,
    heading: hero.heading,
    lead: hero.lead,
    actions: [hero.actions.primary, hero.actions.secondary],
    worst: "8.6",
  },
  {
    name: "Slide 2",
    image: images.hero.strata,
    eyebrow: approach.eyebrow,
    heading: approach.heading,
    lead: approach.lead,
    actions: ["See our approach"],
    worst: "10.2",
  },
  {
    name: "Slide 3",
    image: images.hero.drawings,
    eyebrow: guarantee.eyebrow,
    heading: guarantee.heading,
    lead: guarantee.summary,
    note: guarantee.scope,
    actions: ["How it works", hero.actions.secondary],
    worst: "9.2",
  },
];

function Slide({ slide }) {
  const { core, edge } = slide.image.veil;

  return (
    <div className="relative isolate min-h-184 overflow-hidden border border-border">
      <Photo
        image={slide.image}
        alt=""
        sizes="(min-width: 1024px) 90vw, 100vw"
        className="absolute inset-0"
      />
      <div
        aria-hidden="true"
        className="veil absolute inset-0 z-2"
        style={{ "--veil-core": `${core}%`, "--veil-edge": `${edge}%` }}
      />
      <div className="relative z-3 grid h-full min-h-184 place-items-center px-6 py-14 text-center sm:px-16">
        <div className="grid justify-items-center gap-6">
          <Eyebrow rule={false} tone="ink">
            {slide.eyebrow}
          </Eyebrow>
          <p className="max-w-[18ch] text-balance text-display">{typeset(slide.heading)}</p>
          <p className="max-w-[48ch] font-serif text-lead">{typeset(slide.lead)}</p>
          {slide.note && <p className="max-w-[56ch] text-small">{slide.note}</p>}
          <div className="flex flex-wrap justify-center gap-3">
            {slide.actions.map((label, index) => (
              <Button key={label} href="#veil" variant={index === 0 ? "primary" : "secondary"}>
                {label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function VeilSection() {
  return (
    <Frame
      id="veil"
      index="06"
      label="Hero veil"
      title="Paper over the photograph"
      wide
      notes={[
        "The hero is light and high-key: each photo sits under a paper-white veil, strongest behind the text and easing toward the corners, so the picture shows at the edges. The foot of the hero dissolves into the paper of the next section. On a phone the veil is flat, because the text fills the width. Strength is set per photo in the manifest.",
        "Only navy text goes over a photo. Measured on the real pixels, navy stays above 8:1 everywhere, but muted grey falls to 3.5:1 and the teal label to 2.7:1, so the eyebrow here is navy and only its crosshair is teal. Narrow the window to see the phone crop.",
      ]}
    >
      <div className="grid gap-12">
        {SLIDES.map((slide) => (
          <div key={slide.name}>
            <p className="mb-3 flex flex-wrap justify-between gap-x-6 text-label uppercase">
              <span>{slide.name}</span>
              <span className="text-muted-foreground">
                veil {slide.image.veil.core}% centre, {slide.image.veil.edge}% corners. Navy text{" "}
                {slide.worst}:1 worst case
              </span>
            </p>
            <Slide slide={slide} />
          </div>
        ))}
      </div>
    </Frame>
  );
}
