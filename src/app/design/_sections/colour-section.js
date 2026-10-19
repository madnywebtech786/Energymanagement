import { contrast } from "../_lib/contrast";
import { Frame } from "./frame";

// Mirrors the tokens in globals.css. [name, token class, hex, role, label colour]
const SWATCHES = [
  ["Paper", "bg-background", "#F6F8FA", "The ground of every page and the hero veil.", "text-foreground"],
  ["Ink", "bg-foreground", "#0B2545", "Headings, body text, hairline drawing. The brand navy.", "text-primary-foreground"],
  ["Muted", "bg-muted-foreground", "#52607A", "Secondary text, captions, index numbers.", "text-primary-foreground"],
  ["Surface", "bg-surface", "#FFFFFF", "Panels and form fields.", "text-foreground"],
  ["Accent", "bg-accent", "#0B7F73", "Teal for text: labels, links, hover.", "text-accent-foreground"],
  ["Signal", "bg-accent-graphic", "#14B8A6", "Teal for lines and marks. Never body text on paper.", "text-deep"],
  ["Danger", "bg-danger", "#B3261E", "Form errors only.", "text-primary-foreground"],
  ["Deep", "bg-deep", "#071A33", "The one dark section, nowhere else.", "text-deep-foreground"],
];

// [foreground, background, what it is, required ratio, decorative only]
const PAIRS = [
  ["#0B2545", "#F6F8FA", "Ink on paper", 4.5],
  ["#52607A", "#F6F8FA", "Muted on paper", 4.5],
  ["#52607A", "#FFFFFF", "Muted on surface", 4.5],
  ["#0B7F73", "#F6F8FA", "Accent text on paper", 4.5],
  ["#FFFFFF", "#0B7F73", "White on accent", 4.5],
  ["#FFFFFF", "#0B2545", "White on primary", 4.5],
  ["#B3261E", "#F6F8FA", "Danger on paper", 4.5],
  ["#EEF3F8", "#071A33", "Deep foreground on deep", 4.5],
  ["#A3B4CB", "#071A33", "Deep muted on deep", 4.5],
  ["#14B8A6", "#071A33", "Signal text on deep", 4.5],
  ["#071A33", "#14B8A6", "Navy arrow on signal", 4.5],
  ["#79879A", "#FFFFFF", "Field edge on surface", 3],
  ["#14B8A6", "#F6F8FA", "Signal line on paper", 3, true],
];

export function ColourSection() {
  return (
    <Frame
      id="colour"
      index="02"
      label="Colour"
      title="Paper, ink and one signal"
      notes={[
        "The brand navy is the ink and the brand teal is the signal, on a cool paper white. Every value is a semantic token in globals.css; components never use a raw colour.",
        "The original teal (#0E9F8E) is 3.1:1 on paper, so text uses #0B7F73 and the brighter teal is kept for lines and marks. Inside a deep section the tokens swap, so the same components restyle themselves.",
      ]}
    >
      <div className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
        {SWATCHES.map(([name, bg, hex, role, ink]) => (
          <div key={name} className="flex flex-col bg-background">
            <div className={`${bg} ${ink} grid h-28 shrink-0 content-end p-3`}>
              <p className="text-label uppercase">{name}</p>
            </div>
            <div className="grid flex-1 content-start gap-1 p-3">
              <p className="text-small tabular-nums">{hex}</p>
              <p className="text-small text-muted-foreground">{role}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2">
        <div className="bg-background p-6">
          <p className="text-label uppercase text-muted-foreground">Hairline</p>
          <div className="mt-6 h-px bg-border" />
          <p className="mt-4 text-small text-muted-foreground">
            Ink at 14%. Section rules and card edges.
          </p>
        </div>
        <div className="bg-background p-6">
          <p className="text-label uppercase text-muted-foreground">Control edge</p>
          <div className="mt-6 h-px bg-border-strong" />
          <p className="mt-4 text-small text-muted-foreground">
            Ink at 55%. Form fields and the secondary button, 3:1 or better.
          </p>
        </div>
      </div>

      <div className="mt-16">
        <p className="text-label uppercase">Contrast</p>
        <div className="mt-6 border-t border-border">
          {PAIRS.map(([fg, bg, name, required, decorative]) => {
            const ratio = contrast(fg, bg);
            const pass = ratio >= required;
            const status = decorative
              ? "decorative only, never carries meaning"
              : pass
                ? `meets ${required}:1`
                : `below ${required}:1`;
            return (
              <div
                key={name}
                className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b border-border py-3"
              >
                <span
                  className="grid size-10 place-items-center text-small font-semibold ring-1 ring-inset ring-border"
                  style={{ color: fg, backgroundColor: bg }}
                >
                  Aa
                </span>
                <p className="text-small">{name}</p>
                <p className="text-small tabular-nums">
                  {ratio.toFixed(2)}:1
                  <span
                    className={
                      decorative ? "ml-3 text-muted-foreground" : pass ? "ml-3 text-accent" : "ml-3 text-danger"
                    }
                  >
                    {status}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="theme-deep mt-16 bg-background p-8 text-foreground">
        <p className="text-label uppercase text-accent">Deep scope</p>
        <p className="mt-6 max-w-[28ch] text-h2">One dark moment, same components.</p>
        <p className="mt-4 max-w-[52ch] font-serif text-lead text-muted-foreground">
          Wrapping a section in the deep scope swaps ink, paper, accent and borders. Nothing inside
          it is restyled by hand.
        </p>
      </div>
    </Frame>
  );
}
