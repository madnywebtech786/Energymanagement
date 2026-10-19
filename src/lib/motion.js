// Motion values for the components in src/components/animations.
// The curves mirror --ease-* in globals.css; Motion needs them as arrays.
export const EASE = {
  out: [0.16, 1, 0.3, 1],
  outSoft: [0.25, 1, 0.5, 1],
  inOut: [0.76, 0, 0.24, 1],
};

export const DURATION = {
  fast: 0.25,
  base: 0.6,
  slow: 0.9,
  hero: 1.2,
};

// Delay between words in a text reveal, in seconds.
export const WORD_STAGGER = 0.05;
