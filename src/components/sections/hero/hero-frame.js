// Corner hairlines and a slide counter, like registration marks on a drawing
// sheet. Purely decorative (aria-hidden); the real position is announced by
// the tablist below. `index`/`total` are tabular so digits don't jiggle.
//
// The mark's own size comes from --spacing-mark/--spacing-mark-sm (globals.css),
// the same tokens the hero's content column uses for its own left clearance
// (pl-mark/sm:pl-mark-sm) — one definition for "how big is the bracket",
// read by both the thing drawing it and the thing avoiding it, so they
// cannot drift apart the way two separately hand-picked numbers can.
//
// The frame sits inset from the section edge by one extra step at the bottom
// only, clearing the indicators-and-pause-button bar that the slider pins to
// its own `inset-x-0 bottom-0`; everywhere else it sits flush with the
// gutter.
export function HeroFrame({ index, total }) {
  const corner = "absolute size-mark border-foreground/70 sm:size-mark-sm";
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-gutter top-gutter bottom-32 z-hero-controls sm:bottom-36 lg:bottom-36"
    >
      <span className={corner + " left-0 top-0 border-l border-t"} />
      <span className={corner + " right-0 top-0 border-r border-t"} />
      <span className={corner + " bottom-0 left-0 border-b border-l"} />
      <span className={corner + " bottom-0 right-0 border-b border-r"} />
      <span className="absolute bottom-0 right-0 -translate-x-2 translate-y-full pt-3 text-label tabular-nums text-muted-foreground">
        {String(index).padStart(2, "0")}
        <span className="mx-1 text-border-strong">/</span>
        {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}
