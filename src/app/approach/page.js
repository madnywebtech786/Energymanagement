import { PageHero } from "@/components/shared/page-hero";
import { ApproachStory } from "@/components/sections/approach/approach-story";
import { ClosingCta } from "@/components/shared/closing-cta";
import { approach, stageServices } from "@/content/approach";
import { site } from "@/content/site";

export const metadata = {
  title: `Approach | ${site.brand.name}`,
  description: approach.lead,
};

// PageHero, then the same ApproachStory component the home page already
// uses — here with stageServices passed in, so each of the 6 stages also
// lists the services that sit there (derived from each service's own
// stages mapping in service-details.js, see content/approach.js), which
// the home page's shorter preview doesn't show. Closes on the shared CTA.
export default function ApproachPage() {
  return (
    <main>
      <PageHero eyebrow={approach.eyebrow} heading={approach.heading} lead={approach.lead} />
      <ApproachStory approach={approach} stageServices={stageServices} />
      <ClosingCta
        heading="Talk through your asset's lifecycle"
        lead="A confidential conversation about where your asset sits today, and what's next."
        action={{ label: "Discuss your asset", href: "/contact" }}
      />
    </main>
  );
}
