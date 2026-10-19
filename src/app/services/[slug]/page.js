import { Suspense } from "react";
import { notFound } from "next/navigation";
import { services } from "@/content/services";
import { serviceDetails } from "@/content/service-details";
import { approach } from "@/content/approach";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { ServiceHero } from "@/components/sections/service-detail/service-hero";
import { ServicePainPoints } from "@/components/sections/service-detail/service-pain-points";
import { ServiceApproach } from "@/components/sections/service-detail/service-approach";
import { ServiceScope } from "@/components/sections/service-detail/service-scope";
import { ServiceLifecycle } from "@/components/sections/service-detail/service-lifecycle";
import { ServiceFaq } from "@/components/sections/service-detail/service-faq";
import { ServiceRelated } from "@/components/sections/service-detail/service-related";
import { ServiceClosingCta } from "@/components/sections/service-detail/service-closing-cta";

const getService = (slug) => services.items.find((item) => item.slug === slug);

export function generateStaticParams() {
  return services.items.map(({ slug }) => ({ slug }));
}

// Canonical/OG urls are relative on purpose: no production domain is
// confirmed anywhere in the codebase yet (checked — nothing sets
// metadataBase on the root layout either), and a wrong canonical is worse
// than a missing one. Next.js resolves these against metadataBase once
// it's set there; until then they resolve against the request origin.
// Revisit when the real domain is known (see docs/redesign-plan.md, Phase 8
// SEO checklist).
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  const detail = serviceDetails[slug];
  const description = detail?.painPoints?.[0]?.with ?? service.tagline;
  const path = `/services/${slug}`;

  return {
    title: `${service.name} | ${site.brand.name}`,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: service.name,
      description,
      url: path,
      type: "website",
    },
  };
}

export default function ServicePage({ params }) {
  return (
    <Suspense>
      <Service params={params} />
    </Suspense>
  );
}

async function Service({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const detail = serviceDetails[slug];
  const image = images.services[slug];
  const relatedServices = (detail?.relatedSlugs ?? [])
    .map((relatedSlug) => getService(relatedSlug))
    .filter(Boolean);

  // `url` is intentionally omitted: schema.org's Service.url expects an
  // absolute address, and no production domain is confirmed anywhere in
  // this codebase yet — an absent field is safer than a guessed one. Add
  // it once the real domain is known (see the metadataBase note above
  // generateMetadata).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.tagline,
    provider: {
      "@type": "ProfessionalService",
      name: site.name,
      areaServed: "Calgary, Alberta, Canada",
    },
    ...(detail?.faq && {
      mainEntity: detail.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    }),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <ServiceHero service={service} image={image} />

      {detail?.painPoints && <ServicePainPoints points={detail.painPoints} />}
      {detail?.approach && <ServiceApproach paragraphs={detail.approach} />}

      <ServiceScope bullets={service.bullets} scopeNotes={detail?.scopeNotes} />

      {detail?.stages && (
        <ServiceLifecycle stages={approach.stages} activeIndexes={detail.stages} />
      )}

      {detail?.faq && <ServiceFaq faq={detail.faq} />}

      <ServiceRelated services={relatedServices} />

      <ServiceClosingCta serviceName={service.name} />
    </main>
  );
}
