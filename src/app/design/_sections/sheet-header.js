import { Container } from "@/components/layout/container";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { Logo } from "@/components/shared/logo";

const SHEETS = [
  ["type", "Type"],
  ["colour", "Colour"],
  ["components", "Components"],
  ["motion", "Motion"],
  ["photography", "Photography"],
  ["veil", "Hero veil"],
  ["well-path", "Well path"],
];

function TitleCell({ label, children, className = "" }) {
  return (
    <div className={`border-b border-r border-border p-5 ${className}`}>
      <p className="text-label uppercase text-muted-foreground">{label}</p>
      <p className="mt-2 text-h4">{children}</p>
    </div>
  );
}

// The title block of the sheet, like the one in the corner of a drawing.
export function SheetHeader() {
  return (
    <header data-shot="header">
      <Container className="pb-16 pt-10 lg:pb-24">
        <div className="grid grid-cols-2 border-l border-t border-border sm:grid-cols-4 lg:grid-cols-[2.2fr_1fr_1fr_1fr]">
          <div className="col-span-2 flex items-center border-b border-r border-border p-5 sm:col-span-4 lg:col-span-1">
            <Logo />
          </div>
          <TitleCell label="Document">Design system</TitleCell>
          <TitleCell label="Phase">1 of 8</TitleCell>
          <TitleCell label="Status" className="col-span-2 sm:col-span-1">
            For review
          </TitleCell>
        </div>

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12">
          <Heading level={1} size="display" className="lg:col-span-9">
            Design system
          </Heading>
          <div className="grid content-end gap-6 lg:col-span-3">
            <Text variant="reading" muted>
              Type, colour, components, motion, photography and the hero veil. Dev only: this page
              returns 404 in production and is removed before launch.
            </Text>
          </div>
        </div>

        <nav aria-label="Sheets" className="mt-14 border-t border-border pt-6">
          <ol className="flex flex-wrap gap-x-8 gap-y-3 text-nav">
            {SHEETS.map(([id, label], index) => (
              <li key={id}>
                <Link href={`#${id}`} variant="quiet" className="inline-flex gap-2">
                  <span className="tabular-nums text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </Container>
    </header>
  );
}
