"use client";

import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";

// Rebuilt to match the client's reference design exactly (three screenshots:
// the full profile spread, the credentials card and the publications list —
// see docs/redesign-plan.md's Decisions table for the brainstorming trail).
// Left column: the founder's photo, then a credentials card directly below
// it carrying the structured facts (based, experience, assets, expertise)
// the reference shows as its own distinct panel, not folded into the bio
// prose. Right column: the editorial heading/lead/bio this section already
// had, plus the new selected-publications list beneath it. The photo is a
// plain next/image from /public (the client's own file, leader.jpeg), not
// routed through Photo/the image manifest: that system's desaturating grade
// filter exists to unify 14 different stock photos into one family and was
// a deliberate choice not to apply to an actual portrait of the real
// person (confirmed with the client).
//
// Registration/APEGA status is deliberately absent from the credentials
// card: the client's reference shows that line struck through, read as
// marked for removal, not inclusion. The LinkedIn button falls back to
// aria-disabled with no href when credentials.linkedinUrl is empty — never
// an empty-string href, which Link/Button's internal routing logic is not
// built to accept safely — so this still degrades safely if the URL is ever
// cleared. Hover/focus uses LinkedIn's own brand blue (#0A66C2, the current
// official mark colour) rather than the site's navy, at the client's
// explicit request for "the linkedin colored animation" — the one
// deliberate departure from this component's otherwise site-standard hover
// palette, same color-transition mechanism as every other hover state on
// the site (see ui/button.js's secondary variant), not a new animation
// pattern. White hover text confirmed at 5.69:1 against that blue, above
// the site's 4.5:1 floor, so unlike Button's teal-hover exception this
// needed no contrast workaround. Written as hover:text-primary-foreground
// (resolves to #ffffff here — this section is tone="surface", not
// tone="deep", so the .theme-deep override of that token never applies),
// not hover:text-white: globals.css's @theme strips every default Tailwind
// colour (`--color-*: initial;`) so only this site's own tokens exist —
// text-white silently compiles to nothing (confirmed by grepping the built
// CSS: every other hover:* class on this element was present except that
// one), leaving the hover state on navy text over navy-adjacent blue
// instead of white. LinkedInIcon's `fill="currentColor"` inherits this, so
// one token colours both the label and the icon on hover/focus.
function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.554V9h3.565v11.452z" />
    </svg>
  );
}

function CredentialRow({ label, children }) {
  return (
    <div className="border-t border-border py-4 first:pt-0">
      <Text variant="label" muted>
        {label}
      </Text>
      <Text variant="small" className="mt-1.5 text-foreground">
        {children}
      </Text>
    </div>
  );
}

export function LeadershipTeaser({ leadership }) {
  const { credentials } = leadership;

  return (
    <Section tone="surface">
      <Container>
        <Reveal>
          <Eyebrow>{leadership.eyebrow}</Eyebrow>
        </Reveal>
        <Heading level={2} className="mt-5 max-w-[24ch]">
          <TextReveal>{leadership.heading}</TextReveal>
        </Heading>
        <Reveal delay={0.1}>
          <Text variant="body" muted className="mt-5 max-w-[48ch]">
            {leadership.lead}
          </Text>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <div>
            <Reveal>
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-border">
                <Image
                  src="/leader.jpeg"
                  alt={leadership.name}
                  fill
                  sizes="(min-width: 1024px) 28vw, 90vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={0.08} className="mt-6 rounded-xl border border-border bg-surface p-6">
              <Heading level={3} size="h4">
                {leadership.name}
              </Heading>
              <Text variant="small" className="mt-2 text-accent">
                {leadership.credential}
              </Text>
              <Text variant="small" muted className="mt-1">
                {leadership.formerRole}
              </Text>

              <div className="mt-5">
                <CredentialRow label="Based">{credentials.based}</CredentialRow>
                <CredentialRow label="Experience">{credentials.experience}</CredentialRow>
                <CredentialRow label="Assets">{credentials.assets}</CredentialRow>
                <CredentialRow label="Expertise">{credentials.expertise}</CredentialRow>
              </div>

              <a
                href={credentials.linkedinUrl || undefined}
                target={credentials.linkedinUrl ? "_blank" : undefined}
                rel={credentials.linkedinUrl ? "noopener noreferrer" : undefined}
                aria-disabled={!credentials.linkedinUrl}
                className="mt-6 flex items-center justify-center gap-2 rounded-sm border border-border-strong py-3 text-small font-medium text-foreground transition-colors duration-(--duration-base) ease-out-quart aria-disabled:pointer-events-none aria-disabled:opacity-50 hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-primary-foreground focus-visible:border-[#0A66C2] focus-visible:bg-[#0A66C2] focus-visible:text-primary-foreground"
              >
                <LinkedInIcon className="size-4" />
                Connect on LinkedIn
              </a>
            </Reveal>
          </div>

          <div>
            {leadership.bio.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} delay={0.1 + index * 0.08} className="not-first:mt-5">
                <Text variant="reading" muted className="max-w-[62ch]">
                  {paragraph}
                </Text>
              </Reveal>
            ))}

            <Reveal delay={0.34} className="mt-10 border-t border-border pt-8">
              <Text variant="label" muted>
                {leadership.publications.label}
              </Text>
              <ul className="mt-4 divide-y divide-border">
                {leadership.publications.items.map((pub, index) => (
                  <li key={pub.title} className="py-3 first:pt-0">
                    <Text variant="small" className="font-serif italic text-foreground">
                      "{pub.title}"
                    </Text>
                    <Text variant="small" muted className="mt-1">
                      {pub.venue}
                    </Text>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.4} className="mt-10 border-t border-border pt-8">
              <Text variant="label" muted>
                {leadership.experience.label}
              </Text>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {leadership.experience.employers.map((employer) => (
                  <li key={employer}>
                    <Text
                      as="span"
                      variant="small"
                      className="inline-block rounded-sm border border-border-strong/50 px-3.5 py-2 text-foreground transition-colors duration-(--duration-base) ease-out-quart hover:border-accent hover:text-accent"
                    >
                      {employer}
                    </Text>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
