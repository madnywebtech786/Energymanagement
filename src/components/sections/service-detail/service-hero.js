import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";

// A full-bleed deep-navy banner (.theme-deep), the same no-photo fallback
// Well Intervention used before the client removed service photos sitewide
// — now the only ServiceHero variant, matching the home page's dark wave
// hero in visual register instead of the two different hero languages the
// site used to carry (a photo veil here, a flat dark background there).
// Server-rendered with the CSS entrance keyframes
// (animate-rise/animate-mask-up), not Reveal/TextReveal — this is
// first-screen content, so it must be visible with no client JavaScript,
// the same rule the home hero follows. .theme-deep is applied to the whole
// section (not just a background div) since it works by redefining colour
// custom properties for its own descendants: it has to wrap the actual
// heading/text, or they keep inheriting the light theme's navy-on-navy and
// disappear.
export function ServiceHero({ service }) {
  return (
    <section className="theme-deep relative isolate flex min-h-[70svh] items-end overflow-hidden bg-background sm:min-h-[75svh]">
      <Container className="relative z-hero-content pb-14 pt-32 sm:pb-16 sm:pt-40">
        <div className="max-w-[46rem]">
          <div className="animate-rise" style={{ "--delay": "0s" }}>
            <Eyebrow tone="accent" rule={false}>
              Services
            </Eyebrow>
          </div>
          <Heading
            level={1}
            size="h1"
            className="animate-mask-up mt-5 max-w-[22ch] text-foreground"
            style={{ "--delay": "0.08s" }}
          >
            {service.name}
          </Heading>
          <div className="animate-rise mt-6" style={{ "--delay": "0.22s" }}>
            <Text variant="lead" className="max-w-[48ch] text-deep-muted">
              {service.tagline}
            </Text>
          </div>
          <div className="animate-rise mt-8" style={{ "--delay": "0.3s" }}>
            <Button href="/contact">Discuss this with us</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
