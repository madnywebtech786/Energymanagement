import { Container } from "@/components/layout/container";
import { Logo } from "@/components/shared/logo";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { site } from "@/content/site";
import { legal } from "@/content/legal";

// A single hairline-topped band, not a multi-column SaaS footer: a
// 16-page consultancy site has a logo, a handful of page links and one
// legal line, not docs/pricing/blog columns to fill.
export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <Logo />

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-nav">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} variant="quiet">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <Container className="border-t border-border py-6">
        <Text variant="small" muted className="max-w-[80ch]">
          {legal.footer}
        </Text>
      </Container>
    </footer>
  );
}
