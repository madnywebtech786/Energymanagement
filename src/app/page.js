import { HeroSlider } from "@/components/sections/hero/hero-slider";
import { heroSlides } from "@/components/sections/hero/slides";
import { StatsStrip } from "@/components/sections/stats/stats-strip";
import { ServicesPanel } from "@/components/sections/services/services-panel";
import { ApproachStory } from "@/components/sections/approach/approach-story";
import { WhyUsPanel } from "@/components/sections/why-us/why-us-panel";
import { GuaranteeSection } from "@/components/sections/guarantee/guarantee-section";
import { LeadershipTeaser } from "@/components/sections/leadership/leadership-teaser";
import { HomeFaq } from "@/components/sections/home-faq/home-faq";
import { ContactCta } from "@/components/sections/contact/contact-cta";
import { ContactSection } from "@/components/sections/contact/contact-section";
import { hero } from "@/content/hero";
import { services, serviceGroups } from "@/content/services";
import { approach } from "@/content/approach";
import { whyUs } from "@/content/why-us";
import { guarantee } from "@/content/guarantee";
import { leadership } from "@/content/leadership";
import { homeFaq } from "@/content/home-faq";
import { contact } from "@/content/contact";
import { images } from "@/content/images";

const servicesBySlug = new Map(services.items.map((service) => [service.slug, service]));

// The client's explicit choice: the home page's four featured services are
// "Subsurface & reservoir" (serviceGroups[0] in src/content/services.js),
// not an arbitrary first-four slice of the full list — resolved here to
// full service records (name, description, slug) in that group's order.
const subsurfaceReservoirPreview = serviceGroups[0].items.map(
  ({ slug }) => servicesBySlug.get(slug),
);

export default function HomePage() {
  return (
    <main>
      <HeroSlider slides={heroSlides} />
      <ServicesPanel services={services} previewItems={subsurfaceReservoirPreview} />
      <ApproachStory approach={approach} />
      <StatsStrip stats={hero.stats} />
      <WhyUsPanel whyUs={whyUs} image={images.whyUs} />
      <GuaranteeSection guarantee={guarantee} />
      <LeadershipTeaser leadership={leadership} />
      <HomeFaq faq={homeFaq} />
      <ContactCta cta={contact.cta} />
      <ContactSection contact={contact} />
    </main>
  );
}
