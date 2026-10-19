import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Field } from "@/components/ui/field";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { Logo, LogoMark } from "@/components/shared/logo";
import { contact } from "@/content/contact";
import { Cell } from "./cell";
import { Frame } from "./frame";

export function ComponentsSection() {
  return (
    <Frame
      id="components"
      index="03"
      label="Components"
      title="Small parts, one language"
      notes={[
        "Square corners at 2px, hairline edges, labels in tracked capitals and a registration mark to open each section. Depth comes from layering and blur, not drop shadows.",
        "The button borrows a drawing's title block: a label cell and an arrow cell that fills with signal teal on hover or focus. Every target is at least 48 px tall.",
      ]}
    >
      <div className="grid gap-6">
        <Cell label="Button, primary">
          <div className="flex flex-wrap items-center gap-4">
            <Button href="#components">Explore our services</Button>
            <Button href="#components" size="lg">
              Discuss your asset
            </Button>
            <Button href={contact.details.email.href} icon={Mail}>
              Get in touch
            </Button>
            <Button icon={null}>No icon</Button>
            <Button disabled>Disabled</Button>
          </div>
        </Cell>

        <Cell label="Button, secondary">
          <div className="flex flex-wrap items-center gap-4">
            <Button href="#components" variant="secondary">
              See our approach
            </Button>
            <Button href="#components" variant="secondary" size="lg">
              How it works
            </Button>
            <Button variant="secondary" icon={null}>
              No icon
            </Button>
            <Button variant="secondary" disabled>
              Disabled
            </Button>
          </div>
        </Cell>

        <Cell label="Deep scope" tone="deep">
          <div className="grid gap-8">
            <div className="flex flex-wrap items-center gap-4">
              <Button href="#components">Discuss your asset</Button>
              <Button href="#components" variant="secondary">
                How it works
              </Button>
            </div>
            <Eyebrow index="03">Our promise</Eyebrow>
            <Text variant="lead" className="max-w-[40ch]">
              Not satisfied with our work? Don&apos;t pay for it.
            </Text>
            <LogoMark />
          </div>
        </Cell>

        <Cell label="Links">
          <Text variant="reading" className="max-w-[56ch]">
            Write to{" "}
            <Link href={contact.details.email.href}>{contact.details.email.value}</Link> or call{" "}
            <Link href={contact.details.phone.href}>{contact.details.phone.value}</Link>. The{" "}
            <Link href="#components" variant="quiet" className="font-medium">
              quiet link
            </Link>{" "}
            has no underline until you hover it.
          </Text>
        </Cell>

        <Cell label="Eyebrow and headings">
          <div className="grid gap-8">
            <Eyebrow index="01">Services</Eyebrow>
            <Eyebrow rule={false}>End-to-end approach</Eyebrow>
            <div className="grid gap-4">
              <Heading level={2} size="h2">
                Level is the outline, size is the look
              </Heading>
              <Text variant="small" muted>
                A heading takes a level for the document outline and a size for how it looks, so
                the page order stays correct while the design stays free.
              </Text>
            </div>
          </div>
        </Cell>

        <Cell label="Logo">
          <div className="flex flex-wrap items-center gap-10">
            <LogoMark className="size-14" />
            <Logo />
          </div>
        </Cell>

        <Cell label="Form fields">
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Name" name="demo-name" required autoComplete="name" />
            <Field
              label="Email"
              name="demo-email"
              type="email"
              required
              autoComplete="email"
              hint="We reply from the address on file."
            />
            <Field
              label="Email, with an error"
              name="demo-email-error"
              type="email"
              defaultValue="sikandar@"
              error="Enter a full email address, such as name@company.com."
            />
            <Field
              label="Telephone, disabled"
              name="demo-phone"
              disabled
              defaultValue={contact.details.phone.value}
            />
            <Field
              as="textarea"
              label="Message"
              name="demo-message"
              required
              className="sm:col-span-2"
              hint="Describe the asset and the question. Nothing is sent from this page."
            />
          </div>
        </Cell>
      </div>
    </Frame>
  );
}
