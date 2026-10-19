import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/ui/photo";
import { cx } from "@/lib/cx";

// A full-bleed 21:9 banner, same visual family as the home hero slider
// (paper veil under navy text) so arriving here from a service card or the
// header dropdown feels continuous. Server-rendered with the CSS entrance
// keyframes (animate-rise/animate-mask-up), not Reveal/TextReveal — this is
// first-screen content, so it must be visible with no client JavaScript,
// the same rule the home hero follows. Well Intervention (no photo) falls
// back to the deep-navy scope (.theme-deep) instead of a broken image —
// applied to the whole section (not just a background div) since
// theme-deep works by redefining colour custom properties for its own
// descendants: it has to wrap the actual heading/text, or they keep
// inheriting the light theme's navy-on-navy and disappear.
export function ServiceHero({ service, image }) {
  return (
    <section
      className={cx(
        "relative isolate flex min-h-[70svh] items-end overflow-hidden sm:min-h-[75svh]",
        image ? "bg-foreground" : "theme-deep bg-background",
      )}
    >
      {image && (
        <>
          <Photo image={image} alt="" sizes="100vw" fetchPriority="high" className="absolute inset-0" />
          <div aria-hidden="true" className="veil absolute inset-0 z-veil" style={{ "--veil-core": "62%", "--veil-edge": "40%" }} />
        </>
      )}

      <Container className="relative z-hero-content pb-14 pt-32 sm:pb-16 sm:pt-40">
        <div className="max-w-[46rem]">
          <div className="animate-rise" style={{ "--delay": "0s" }}>
            <Eyebrow tone={image ? "ink" : "accent"} rule={false}>
              Services
            </Eyebrow>
          </div>
          <Heading
            level={1}
            size="h1"
            className={cx("animate-mask-up mt-5 max-w-[22ch]", !image && "text-foreground")}
            style={{ "--delay": "0.08s" }}
          >
            {service.name}
          </Heading>
          <div className="animate-rise mt-6" style={{ "--delay": "0.22s" }}>
            <Text variant="lead" className={cx("max-w-[48ch]", image ? "text-foreground" : "text-deep-muted")}>
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
