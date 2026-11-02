// A static field of teal contour lines on deep navy: one wave shape, drawn
// once and repeated at a fixed vertical offset, so every line bends together
// as a single sheet instead of looking independently varied — this is how
// the client's reference image is actually constructed (confirmed by tracing
// it during brainstorming), not a decorative effect added after the fact.
// Purely decorative (aria-hidden); never animated, never swapped between
// slides — the client's explicit instruction was "keep background just
// content moving." preserveAspectRatio="none" stretches the art to fill the
// hero at any viewport width, the same way the outgoing photo hero already
// scales via object-fit: cover.
const REPEAT_COUNT = 34;
const STEP = 24;
const START_Y = -420;

const offsets = Array.from({ length: REPEAT_COUNT }, (_, i) => START_Y + i * STEP);

export function HeroWaves() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1600 900"
      preserveAspectRatio="none"
      className="absolute inset-0 size-full"
    >
      <defs>
        <path
          id="hero-wave"
          d="M -200 480 C 150 480, 450 480, 650 600 S 950 720, 1800 580 S 2050 500, 2200 540"
        />
      </defs>
      <g stroke="var(--color-accent-graphic)" fill="none" strokeWidth="1" opacity="0.4">
        {offsets.map((y) => (
          <use key={y} href="#hero-wave" y={y} />
        ))}
      </g>
    </svg>
  );
}
