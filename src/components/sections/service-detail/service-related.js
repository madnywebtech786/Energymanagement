import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Link } from "@/components/ui/link";
import { Reveal } from "@/components/animations/reveal";

// Plain text links, not full cards — the related services already got
// their own heavy visual treatment on /services and the home page, so
// repeating that here would be redundant weight rather than useful help.
export function ServiceRelated({ services }) {
  if (services.length === 0) return null;

  return (
    <Section tone="surface">
      <Container>
        <Reveal>
          <Eyebrow>Related services</Eyebrow>
        </Reveal>

        <ul className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} as="li" delay={index * 0.05}>
              <Link href={`/services/${service.slug}`} variant="underline" className="group/link">
                <Heading level={3} size="h4">
                  {service.name}
                </Heading>
              </Link>
              <Text variant="small" muted className="mt-2 max-w-[32ch]">
                {service.tagline}
              </Text>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
