import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

// A real full-height hero (min-h-[70svh]), content centred vertically —
// a deliberate departure from ServiceHero's own bottom-aligned content,
// the client's explicit choice for this page specifically. Symmetric
// top/bottom padding on the Container (not ServiceHero's asymmetric
// pt-32/pb-14, which was tuned for its own bottom alignment and would
// push centred content off-true-centre if reused here unchanged). Because
// this is genuine first-screen content (it fills most of the viewport
// before any scrolling), it uses the CSS entrance keyframes
// (animate-rise/animate-mask-up) rather than Reveal/TextReveal — those
// two start hidden in server HTML and only animate in once JavaScript
// loads and the element has already scrolled into view, neither true for
// content filling the first screen. .theme-deep is applied directly to
// the section element (not a child), the same requirement ServiceHero's
// own comment documents: the class only re-themes its own descendants, so
// it has to wrap the actual heading/text or they inherit the light
// theme's navy-on-navy and disappear.
export function ThoughtLeadershipMasthead({ thoughtLeadership }) {
  return (
    <section className="theme-deep relative isolate flex min-h-[70svh] items-center overflow-hidden bg-background sm:min-h-[75svh]">
      <Container className="relative py-20 sm:py-24">
        <div className="max-w-[40rem]">
          <div className="animate-rise" style={{ "--delay": "0s" }}>
            <Eyebrow tone="accent" rule={false}>
              {thoughtLeadership.eyebrow}
            </Eyebrow>
          </div>
          <Heading
            level={1}
            className="animate-mask-up mt-5 max-w-[20ch] font-serif text-[clamp(2.3rem,1.5rem+3.4vw,4.1rem)] font-semibold italic leading-[1.05] tracking-tight text-foreground"
            style={{ "--delay": "0.08s" }}
          >
            {thoughtLeadership.heading}
          </Heading>
          <div className="animate-rise mt-6" style={{ "--delay": "0.22s" }}>
            <Text variant="lead" className="max-w-[46ch] text-deep-muted">
              {thoughtLeadership.lead}
            </Text>
          </div>
        </div>
      </Container>
    </section>
  );
}
