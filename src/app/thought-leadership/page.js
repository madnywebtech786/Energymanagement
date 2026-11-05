import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ThoughtLeadershipMasthead } from "@/components/sections/thought-leadership/masthead";
import { FeedEntry } from "@/components/sections/thought-leadership/feed-entry";
import { ClosingCta } from "@/components/shared/closing-cta";
import { thoughtLeadership } from "@/content/thought-leadership";
import { site } from "@/content/site";

export const metadata = {
  title: `Thought Leadership | ${site.brand.name}`,
  description: thoughtLeadership.lead,
};

// Masthead, then a single-column feed of posts (newest first, in the
// order thoughtLeadership.posts is authored — this page does not sort by
// date itself), then the shared closing CTA every other secondary page on
// this site already ends on. No detail route: each post's full text
// expands in place via FeedEntry's own "See more" toggle — the deliberate
// choice over a per-post page, matching the real LinkedIn feed mechanic.
export default function ThoughtLeadershipPage() {
  return (
    <main>
      <ThoughtLeadershipMasthead thoughtLeadership={thoughtLeadership} />

      <Section tone="paper">
        <Container>
          <ul className="mx-auto flex max-w-4xl flex-col">
            {thoughtLeadership.posts.map((post) => (
              <FeedEntry key={post.slug} post={post} />
            ))}
          </ul>
        </Container>
      </Section>

      <ClosingCta
        heading="Read more of the thinking behind our work"
        lead="These notes are drawn from the same engineering and advisory practice behind every engagement we take on."
        action={{ label: "Discuss your asset", href: "/contact" }}
      />
    </main>
  );
}
