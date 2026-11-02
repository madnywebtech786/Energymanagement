import { PageHero } from "@/components/shared/page-hero";
import { LeadershipTeaser } from "@/components/sections/leadership/leadership-teaser";
import { WhyUsPanel } from "@/components/sections/why-us/why-us-panel";
import { GuaranteeSection } from "@/components/sections/guarantee/guarantee-section";
import { ProfessionalResponsibility } from "@/components/sections/about/professional-responsibility";
import { AboutFaq } from "@/components/sections/about/about-faq";
import { ClosingCta } from "@/components/shared/closing-cta";
import { about } from "@/content/about";
import { leadership } from "@/content/leadership";
import { whyUs } from "@/content/why-us";
import { guarantee } from "@/content/guarantee";
import { legal } from "@/content/legal";
import { images } from "@/content/images";
import { site } from "@/content/site";

export const metadata = {
  title: `About | ${site.brand.name}`,
  description: about.lead,
};

// Leadership first (who's behind the company is the credibility on a site
// this size), then Why us and Guarantee in the same relative order the
// home page already uses, then the professional-responsibility footnote,
// FAQ and closing CTA. LeadershipTeaser, WhyUsPanel and GuaranteeSection
// are mounted unchanged — they already render their full content on the
// home page, so this page reuses them rather than writing new copy that
// would just restate the same facts differently.
export default function AboutPage() {
  return (
    <main>
      <PageHero eyebrow={about.eyebrow} heading={about.heading} lead={about.lead} />
      <LeadershipTeaser leadership={leadership} />
      <WhyUsPanel whyUs={whyUs} image={images.whyUs} />
      <GuaranteeSection guarantee={guarantee} />
      <ProfessionalResponsibility responsibility={legal.responsibility} apega={legal.responsibility.apega} />
      <AboutFaq faq={about.faq} />
      <ClosingCta
        eyebrow={about.cta.eyebrow}
        heading={about.cta.heading}
        lead={about.cta.lead}
        action={about.cta.action}
      />
    </main>
  );
}
