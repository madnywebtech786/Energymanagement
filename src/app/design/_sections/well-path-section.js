import { DrawPath } from "@/components/animations/draw-path";
import { Reveal } from "@/components/animations/reveal";
import { approach } from "@/content/approach";
import { Frame } from "./frame";

// The path: down the vertical section, around a build curve, out along the lateral.
const PATH = "M24 0 V800 C24 920 60 1000 160 1000 H400";
const HEIGHT = 1040;
const RAIL_X = 48; // left edge of the rail inside the demo
const LINE_X = RAIL_X + 24; // where the vertical line sits

// Where each stage sits: [x of its node, y of its node]. Stages 1 to 5 are on
// the vertical section; stage 6 is at the end of the lateral.
const NODES = [
  [LINE_X, 40],
  [LINE_X, 220],
  [LINE_X, 400],
  [LINE_X, 580],
  [LINE_X, 760],
  [RAIL_X + 400, 1000],
];

const DEPTHS = Array.from({ length: 11 }, (_, i) => i * 100);

function Stage({ stage, index, x, y }) {
  const lateral = index === NODES.length - 1;
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute z-2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-graphic bg-background"
        style={{ left: x, top: y }}
      />
      <div
        className="absolute w-[min(26rem,calc(100%-112px))]"
        style={{ left: lateral ? x + 28 : LINE_X + 44, top: y - 12 }}
      >
        <Reveal className="grid gap-2">
          <p className="flex items-baseline gap-3 text-label uppercase">
            <span className="tabular-nums text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-accent">{stage.name}</span>
          </p>
          <p className="text-small text-muted-foreground">{stage.text}</p>
        </Reveal>
      </div>
    </>
  );
}

export function WellPathSection() {
  return (
    <Frame
      id="well-path"
      index="07"
      label="Well path"
      title="One line from surface to sustained performance"
      notes={[
        "The concept for the page rail. A well is drawn as a depth chart: down the vertical section, around the build curve, out along the lateral. Here the six lifecycle stages are the stops on that line, and it draws itself as you scroll.",
        "On the site the rail starts below the hero and runs beside the content on desktop; on phones it becomes a thin progress line. This is a specimen, built from the DrawPath part and a ruled depth scale.",
      ]}
    >
      <div className="hidden lg:block">
        <div className="relative" style={{ height: HEIGHT }}>
          <div aria-hidden="true" className="depth-ticks absolute top-0 h-full w-3.5" style={{ left: RAIL_X }} />
          <div aria-hidden="true" className="absolute inset-y-0 left-0 w-11">
            {DEPTHS.map((depth) => (
              <span
                key={depth}
                className="absolute right-0 -translate-y-1/2 text-[0.625rem] tabular-nums text-muted-foreground"
                style={{ top: depth }}
              >
                {depth}
              </span>
            ))}
          </div>
          <DrawPath
            d={PATH}
            viewBox={`0 0 420 ${HEIGHT}`}
            offset={["start 80%", "end 85%"]}
            className="absolute top-0 h-full w-105"
            style={{ left: RAIL_X }}
          />
          {approach.stages.map((stage, index) => (
            <Stage key={stage.name} stage={stage} index={index} x={NODES[index][0]} y={NODES[index][1]} />
          ))}
        </div>
      </div>
      <p className="text-small text-muted-foreground lg:hidden">
        The rail specimen is shown on desktop widths only. On phones it is a progress line.
      </p>
    </Frame>
  );
}
