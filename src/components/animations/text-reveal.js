"use client";

import { Fragment } from "react";
import * as m from "motion/react-m";
import { DURATION, EASE, WORD_STAGGER } from "@/lib/motion";

const word = {
  hidden: { y: "108%" },
  shown: { y: "0%", transition: { duration: DURATION.hero, ease: EASE.out } },
};

// Reveals a short heading word by word: each word rises out of a mask when the
// heading scrolls into view. Pass the heading text as the only child. Meant
// for headings of a dozen words or fewer, below the first screen.
export function TextReveal({ children: text, delay = 0, className }) {
  const words = text.split(" ");

  return (
    <m.span
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: WORD_STAGGER, delayChildren: delay } },
      }}
    >
      {words.map((value, index) => (
        <Fragment key={index}>
          {/* The mask has a little vertical padding, cancelled by a negative
              margin, so tight line heights do not clip ascenders or descenders. */}
          <span className="-my-[0.12em] inline-block overflow-hidden py-[0.12em] align-bottom">
            <m.span data-reveal="" variants={word} className="inline-block">
              {value}
            </m.span>
          </span>
          {index < words.length - 1 && " "}
        </Fragment>
      ))}
    </m.span>
  );
}
