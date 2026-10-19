import { approach } from "@/content/approach";
import { hero } from "@/content/hero";
import { leadership } from "@/content/leadership";
import { legal } from "@/content/legal";
import { services } from "@/content/services";
import { whyUs } from "@/content/why-us";
import { Frame } from "./frame";

// [token, size range, other settings, classes, sample]
const ROWS = [
  ["text-display", "44 to 104 px", "line 0.98, tracking -0.035em, weight 430", "text-display", hero.heading],
  ["text-h1", "38 to 76 px", "line 1.02, tracking -0.03em, weight 450", "text-h1", "Well Integrity Advisory"],
  ["text-h2", "30 to 56 px", "line 1.06, tracking -0.025em, weight 460", "text-h2", services.heading],
  ["text-h3", "22 to 32 px", "line 1.15, tracking -0.015em, weight 500", "text-h3", services.items[3].tagline],
  ["text-h4", "18 to 21 px", "line 1.3, tracking -0.005em, weight 550", "text-h4", whyUs.points[0].title],
  ["text-lead", "19 to 24 px", "Newsreader, line 1.45, weight 380", "font-serif text-lead", services.lead],
  ["text-reading", "17 to 19 px", "Newsreader, line 1.62, weight 400", "font-serif text-reading", leadership.bio[0]],
  ["text-body", "16 px", "line 1.6", "text-body", whyUs.points[1].text],
  ["text-small", "14 px", "line 1.5, muted", "text-small text-muted-foreground", legal.footer],
  ["text-label", "12 px", "tracking 0.14em, weight 560, uppercase", "text-label uppercase text-accent", approach.eyebrow],
  [
    "text-nav",
    "15 px",
    "tracking 0.005em, weight 500",
    "text-nav flex flex-wrap gap-x-8",
    ["Services", "Approach", "About", "Contact"].map((label) => <span key={label}>{label}</span>),
  ],
];

export function TypeSection() {
  return (
    <Frame
      id="type"
      index="01"
      label="Type"
      title="Two families on one fluid scale"
      notes={[
        "Mona Sans sets the display type and the interface. Newsreader carries reading text and quotes. Each size is fluid between a 320 px and a 1440 px screen, so nothing needs a breakpoint.",
        "Both are weight-only variable fonts, about 96 KB together. Headings balance their lines; paragraphs avoid orphans.",
      ]}
    >
      <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
        <div className="bg-background p-8">
          <p className="text-label uppercase text-accent">Mona Sans</p>
          <p className="mt-8 text-display leading-none">Aa</p>
          <p className="mt-6 text-small text-muted-foreground">
            Display and interface. Variable weight 200 to 900.
          </p>
        </div>
        <div className="bg-background p-8">
          <p className="text-label uppercase text-accent">Newsreader</p>
          <p className="mt-8 font-serif text-display leading-none">Aa</p>
          <p className="mt-6 text-small text-muted-foreground">
            Reading text and quotes. Variable weight 200 to 800.
          </p>
        </div>
      </div>

      <div className="mt-16">
        {ROWS.map(([token, size, detail, classes, sample]) => (
          <div
            key={token}
            className="grid gap-4 border-t border-border py-8 sm:grid-cols-[11rem_1fr] sm:gap-10"
          >
            <div className="grid content-start gap-1">
              <p className="text-label uppercase">{token}</p>
              <p className="text-small text-muted-foreground">{size}</p>
              <p className="text-small text-muted-foreground">{detail}</p>
            </div>
            <p className={`${classes} min-w-0`}>{sample}</p>
          </div>
        ))}
        <div className="grid gap-4 border-t border-border py-8 sm:grid-cols-[11rem_1fr] sm:gap-10">
          <div className="grid content-start gap-1">
            <p className="text-label uppercase">Figures</p>
            <p className="text-small text-muted-foreground">tabular, for stats and indexes</p>
          </div>
          <p className="text-h1 tabular-nums">35+ 0123456789</p>
        </div>
      </div>
    </Frame>
  );
}
