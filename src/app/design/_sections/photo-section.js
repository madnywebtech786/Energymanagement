import Image from "next/image";
import { Photo } from "@/components/ui/photo";
import { images } from "@/content/images";
import { Frame } from "./frame";

const PHOTOS = [
  ["Hero 1, field", images.hero.field],
  ["Hero 2, strata", images.hero.strata],
  ["Hero 3, drawings", images.hero.drawings],
  ["Production optimization", images.services["production-optimization"]],
  ["Reservoir management", images.services["reservoir-management"]],
  ["Subsurface and geological", images.services["subsurface-geological"]],
  ["Well integrity", images.services["well-integrity"]],
  ["Artificial lift", images.services["artificial-lift"]],
  ["Field development planning", images.services["field-development-planning"]],
  ["Wells and completions", images.services["wells-completions"]],
  ["Asset evaluation", images.services["asset-evaluation-due-diligence"]],
  ["Management advisory", images.services["management-advisory"]],
  ["Why work with us", images.whyUs],
  ["Banner, Calgary", images.banner],
];

const SIZES = "(min-width: 1024px) 28vw, 90vw";

export function PhotoSection() {
  return (
    <Frame
      id="photography"
      index="05"
      label="Photography"
      title="One grade for fourteen photos"
      notes={[
        "The stock set came from different cameras and light: a deep-blue skyline, a saturated pumpjack, a dark rig. A static grade pulls them into one family: colour held back, contrast softened, a faint navy cast toward the base. It is a CSS filter and overlay, never animated.",
        "Left of each divider is the file as downloaded, right is the grade. Photos that need more get a variant in the manifest (data-grade).",
      ]}
    >
      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
        {PHOTOS.map(([name, image]) => (
          <figure key={name}>
            <div className="relative aspect-photo overflow-hidden">
              <Image
                src={image.src}
                alt=""
                fill
                sizes={SIZES}
                className="object-cover"
                style={{ objectPosition: image.position }}
              />
              <Photo
                image={image}
                alt=""
                sizes={SIZES}
                className="absolute inset-0 [clip-path:inset(0_0_0_50%)]"
              />
              <span aria-hidden="true" className="absolute inset-y-0 left-1/2 z-10 w-px bg-surface" />
              <span className="absolute left-3 top-3 z-10 bg-background px-2 py-1 text-label uppercase">
                Original
              </span>
              <span className="absolute right-3 top-3 z-10 bg-background px-2 py-1 text-label uppercase text-accent">
                Graded
              </span>
            </div>
            <figcaption className="mt-3 flex justify-between gap-4 text-small">
              <span>{name}</span>
              <span className="text-muted-foreground">{image.grade ?? "base grade"}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Frame>
  );
}
