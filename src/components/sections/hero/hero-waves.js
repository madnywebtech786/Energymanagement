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

// The well-bore line (added 2026-11-03, client reference: a single bright
// vertical line descending from the top edge into the wave field, like a
// well tying into the strata beneath it). Drawn at the viewBox's exact
// horizontal centre (x=800 of 1600) rather than the current wave path's own
// shape: that path sags into an asymmetric valley around 60% across instead
// of a centred peak, so there is no true "apex" in the existing geometry to
// anchor to (flagged to the client, who chose to keep the waves as they are
// and approximate the line at centre rather than reshape the waves to match
// the reference's symmetric arcs).
//
// Its bottom endpoint must land on the topmost wave line's own y at
// x=WELL_LINE_X, not a guessed constant: a first attempt hardcoded y=60,
// reasoning from START_Y/STEP as if they were absolute screen positions —
// wrong, because START_Y is an offset added to the base path's own y *at
// that x*, and this particular curve sags low (y≈669 of 900) at x=800,
// putting the real topmost line at y≈249, not 60. The client's screenshot
// caught the resulting gap (line floating well above the waves). Fixed by
// sampling the base path's own cubic-bezier geometry at WELL_LINE_X — the
// same curve <path id="hero-wave"> below draws — so the two numbers can
// never drift apart again the way the hardcoded guess did.
const WELL_LINE_X = 800;

function sampleWaveY(targetX) {
  // Mirrors the <path id="hero-wave"> d attribute below as three cubic
  // Bézier segments (absolute C/S commands expanded to their control
  // points) — update this alongside that path if it ever changes.
  const segments = [
    [
      [-200, 480],
      [150, 480],
      [450, 480],
      [650, 600],
    ],
    [
      [650, 600],
      [850, 720],
      [950, 720],
      [1800, 580],
    ],
    [
      [1800, 580],
      [2650, 440],
      [2050, 500],
      [2200, 540],
    ],
  ];
  let closestY = null;
  let closestDx = Infinity;
  for (const [p0, c1, c2, p1] of segments) {
    for (let i = 0; i <= 500; i += 1) {
      const t = i / 500;
      const mt = 1 - t;
      const x = mt ** 3 * p0[0] + 3 * mt * mt * t * c1[0] + 3 * mt * t * t * c2[0] + t ** 3 * p1[0];
      const dx = Math.abs(x - targetX);
      if (dx < closestDx) {
        closestDx = dx;
        const y = mt ** 3 * p0[1] + 3 * mt * mt * t * c1[1] + 3 * mt * t * t * c2[1] + t ** 3 * p1[1];
        closestY = y;
      }
    }
  }
  return closestY;
}

// The topmost repeated line is the base path plus the smallest offset
// (offsets[0] === START_Y); a small overlap past it (+6) so the line
// visually merges into that stroke instead of only just touching it.
const WELL_LINE_BOTTOM = sampleWaveY(WELL_LINE_X) + offsets[0] + 6;

export function HeroWaves() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1600 900"
      preserveAspectRatio="none"
      className="hero-waves absolute inset-0 size-full"
    >
      <defs>
        <path
          id="hero-wave"
          d="M -200 480 C 150 480, 450 480, 650 600 S 950 720, 1800 580 S 2050 500, 2200 540"
        />
      </defs>
      {/* opacity reads a CSS custom property (--hero-waves-opacity, see
          .hero-waves in globals.css) rather than a hardcoded value, so it can
          be raised on small viewports to compensate for sub-pixel stroke
          anti-aliasing making the field look lighter on phones — see that
          rule's own comment for the full mechanism. */}
      <g stroke="var(--color-accent-graphic)" fill="none" strokeWidth="1" opacity="var(--hero-waves-opacity)">
        {offsets.map((y) => (
          <use key={y} href="#hero-wave" y={y} />
        ))}
      </g>
      <line
        x1={WELL_LINE_X}
        y1={0}
        x2={WELL_LINE_X}
        y2={WELL_LINE_BOTTOM}
        stroke="var(--color-accent-graphic)"
        strokeWidth="1.5"
        opacity="0.9"
      />
    </svg>
  );
}
