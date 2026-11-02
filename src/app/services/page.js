import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PageHero } from "@/components/shared/page-hero";
import { ServiceGroup } from "@/components/sections/services-index/service-group";
import { services, serviceGroups } from "@/content/services";
import { site } from "@/content/site";

export const metadata = {
  title: `Services | ${site.brand.name}`,
  description: services.lead,
};

const servicesBySlug = new Map(services.items.map((service) => [service.slug, service]));

// Resolves each group's { slug, indexDescription } entries against the full
// service record (for `name`), and assigns a running index number across
// every group whose own `numbered` flag isn't false (default true — see
// serviceGroups in src/content/services.js). The client's explicit choice:
// "Subsurface & reservoir" (numbered: false) shows no number on any of its
// rows, and the count starts fresh at 1 on the next numbered group,
// continuing across group boundaries rather than restarting per group — so
// "Wells, Production & Surface Facilities" (5 items) and "Management"
// (1 item) read as one continuous 1-6, not two separate counts.
function resolveGroups(groups) {
  let nextNumber = 1;
  return groups.map((group) => {
    const isNumbered = group.numbered !== false;
    const items = group.items.map(({ slug, indexDescription }) => ({
      ...servicesBySlug.get(slug),
      indexDescription,
      number: isNumbered ? nextNumber++ : undefined,
    }));
    return { ...group, items };
  });
}

// Grouped, numbered services list (redesigned 2026-11-02 from a 10-card
// grid, matching the client's reference image): three category blocks —
// Subsurface & reservoir, Wells/Production & Surface Facilities, Management
// — each a left-aligned heading/lead beside a right-column 2-up grid of
// services. Replaces the previous ServiceIndexCard grid; see
// src/content/services.js's `serviceGroups` export for the grouping and
// copy source.
export default function ServicesPage() {
  const groups = resolveGroups(serviceGroups);

  return (
    <main>
      <PageHero
        eyebrow={services.eyebrow}
        heading={services.heading}
        lead={services.lead}
        headingWidth="max-w-[20ch]"
        leadWidth="max-w-[48ch]"
        pad="tight"
      />

      <Section tone="paper">
        <Container>
          <div className="flex flex-col gap-16 sm:gap-20">
            {groups.map((group, index) => (
              <div key={group.heading} className={index > 0 ? "border-t border-border pt-16 sm:pt-20" : undefined}>
                <ServiceGroup group={group} />
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
