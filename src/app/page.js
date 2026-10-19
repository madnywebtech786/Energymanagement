import { HeroSlider } from "@/components/sections/hero/hero-slider";
import { heroSlides } from "@/components/sections/hero/slides";
import { StatsStrip } from "@/components/sections/stats/stats-strip";
import { ServicesPanel } from "@/components/sections/services/services-panel";
import { ApproachStory } from "@/components/sections/approach/approach-story";
import { WhyUsPanel } from "@/components/sections/why-us/why-us-panel";
import { GuaranteeSection } from "@/components/sections/guarantee/guarantee-section";
import { LeadershipTeaser } from "@/components/sections/leadership/leadership-teaser";
import { ContactCta } from "@/components/sections/contact/contact-cta";
import { ContactSection } from "@/components/sections/contact/contact-section";
import { hero } from "@/content/hero";
import { services } from "@/content/services";
import { approach } from "@/content/approach";
import { whyUs } from "@/content/why-us";
import { guarantee } from "@/content/guarantee";
import { leadership } from "@/content/leadership";
import { contact } from "@/content/contact";
import { images } from "@/content/images";

export default function HomePage() {
  return (
    <main>
      <HeroSlider slides={heroSlides} />
      <StatsStrip stats={hero.stats} />
      <ServicesPanel services={services} images={images.services} />
      <ApproachStory approach={approach} />
      <WhyUsPanel whyUs={whyUs} image={images.whyUs} />
      <GuaranteeSection guarantee={guarantee} />
      <LeadershipTeaser leadership={leadership} />
      <ContactCta cta={contact.cta} />
      <ContactSection contact={contact} />
    </main>
  );
}
