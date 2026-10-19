import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { cx } from "@/lib/cx";

// One numbered sheet of the review page. By default a sticky title column sits
// on the left with the specimens on the right; `wide` puts the specimens
// underneath at full width.
export function Frame({ id, index, label, title, notes = [], wide = false, children }) {
  return (
    <Section id={id} data-shot={id} ruled>
      <Container>
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
          <header className={wide ? "lg:col-span-12" : "lg:col-span-4"}>
            <div
              className={cx(
                "grid content-start gap-6",
                wide ? "lg:grid-cols-12 lg:gap-x-16" : "lg:sticky lg:top-12",
              )}
            >
              <Eyebrow index={index} className={wide ? "lg:col-span-12" : undefined}>
                {label}
              </Eyebrow>
              <Heading level={2} className={cx("mt-2", wide && "lg:col-span-5")}>
                {title}
              </Heading>
              <div className={cx("grid content-start gap-4", wide && "lg:col-span-7 lg:mt-2")}>
                {notes.map((note) => (
                  <Text key={note} variant="small" muted>
                    {note}
                  </Text>
                ))}
              </div>
            </div>
          </header>
          <div className={cx("min-w-0", wide ? "lg:col-span-12" : "lg:col-span-8")}>{children}</div>
        </div>
      </Container>
    </Section>
  );
}
