import { Suspense } from "react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ThoughtLeadershipMasthead } from "@/components/sections/thought-leadership/masthead";
import { ThoughtLeadershipFeed } from "@/components/sections/thought-leadership/thought-leadership-feed";
import { FeedEntry } from "@/components/sections/thought-leadership/feed-entry";
import { ClosingCta } from "@/components/shared/closing-cta";
import { thoughtLeadership } from "@/content/thought-leadership";
import { site } from "@/content/site";

export const metadata = {
  title: `Thought Leadership | ${site.brand.name}`,
  description: thoughtLeadership.lead,
};

const LIST_SELECTOR = "[data-thought-leadership-list]";

// Masthead, then the search/category controls, then a single-column feed
// of posts (newest first, in the order thoughtLeadership.posts is
// authored — this page does not sort by date itself), then the shared
// closing CTA every other secondary page on this site already ends on.
// No detail route: each post's full text expands in place via FeedEntry's
// own "See more" toggle.
//
// The <ul> of FeedEntry components is rendered directly, right here, in
// server HTML — every post's real content, with zero JavaScript required
// to read it, exactly as before this page had any filtering at all.
// ThoughtLeadershipFeed (the search box, category multi-select, and the
// actual filtering logic) is a separate component, wrapped in <Suspense>
// because it reads useSearchParams — but it owns none of the post
// markup, only which of these already-rendered <li data-slug> elements
// stay visible (toggled via direct DOM access, see
// thought-leadership-feed.js's own comment for why rendering the posts
// inside the Suspense boundary was tried first and reverted: it made
// post content JS-only, confirmed against a real production build).
export default function ThoughtLeadershipPage() {
  return (
    <main>
      <ThoughtLeadershipMasthead thoughtLeadership={thoughtLeadership} />

      <Section tone="paper">
        <Container>
          <div className="mx-auto max-w-4xl">
            <Suspense fallback={null}>
              <ThoughtLeadershipFeed
                posts={thoughtLeadership.posts}
                categories={thoughtLeadership.categories}
                listSelector={LIST_SELECTOR}
              />
            </Suspense>

            <ul
              data-thought-leadership-list
              // data-filtering is set directly on this element by
              // ThoughtLeadershipFeed (a plain DOM mutation, since this
              // list is server HTML outside that component's own render
              // tree — see its comment) during the one genuinely async
              // window in this feed, the 300ms search debounce. The dim
              // reads as "about to change", not a fabricated spinner over
              // work that already finished.
              className="mt-8 flex flex-col gap-6 opacity-100 transition-opacity duration-(--duration-base) data-[filtering=true]:opacity-40 sm:mt-10 sm:gap-8"
            >
              {thoughtLeadership.posts.map((post) => (
                <FeedEntry key={post.slug} post={post} />
              ))}
            </ul>
          </div>
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
