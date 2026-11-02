"use client";

import { useId, useState } from "react";
import * as m from "motion/react-m";
import { CircleCheck, CircleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { DURATION, EASE } from "@/lib/motion";

const INITIAL = { name: "", company: "", email: "", phone: "", message: "" };

// A controlled form posting to /api/contact — a normal client-side fetch,
// the same pattern any React form uses. No useActionState here: that hook
// binds to a Server Function, and this endpoint is a Route Handler (the
// user's explicit choice over a Server Action), so pending/error/success are
// plain client state tied to fetch instead.
//
// Previously a self-contained dark card (.theme-deep) with its own
// dark-specific ContactField primitive, built when this form only ever sat
// beside a light details card. The client's reference design (2026-11-02)
// shows plain light, bordered fields directly on the page background, no
// dark card — this now uses the site's existing Field/Input/Textarea
// primitives (ui/field.js, ui/controls.js) instead of a second,
// dark-only field implementation; those primitives already existed
// elsewhere in the system but this form had never used them.
export function ContactForm({ copy }) {
  const honeypotId = useId();
  const [values, setValues] = useState(INITIAL);
  const [status, setStatus] = useState("idle"); // idle | pending | success | error
  const [fieldErrors, setFieldErrors] = useState({});

  function update(name) {
    return (event) => setValues((current) => ({ ...current, [name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("pending");
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        setFieldErrors(result.errors ?? {});
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setFieldErrors({});
      setStatus("error");
    }
  }

  const pending = status === "pending";

  if (status === "success") {
    return (
      <m.div
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0% 0)" }}
        transition={{ duration: DURATION.slow, ease: EASE.inOut }}
        role="status"
        className="flex h-full flex-col justify-center rounded-xl border border-border bg-surface p-6 sm:p-10"
      >
        <CircleCheck aria-hidden="true" strokeWidth={1.5} className="size-8 text-accent" />
        <Heading level={3} size="h3" className="mt-4">
          {copy.success.heading}
        </Heading>
        <Text variant="reading" muted className="mt-3 max-w-[46ch]">
          {copy.success.text}
        </Text>
      </m.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Honeypot: off-screen, not display:none, so it stays out of the tab
          order and off-screen readers without tripping an accessibility
          checker that flags hidden-but-rendered content. Named "website"
          rather than "company": the form gained a real, visible Company
          field (below) once the client's reference design called for one,
          so the trap can no longer share that name without catching real
          users who type their own company name — "website" is a common
          honeypot label genuine visitors never fill in, and nothing on
          this form legitimately asks for one. /api/contact's server-side
          check uses the same name. */}
      <div className="absolute left-[-9999px] top-auto" aria-hidden="true">
        <label htmlFor={honeypotId}>Website</label>
        <input
          id={honeypotId}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website ?? ""}
          onChange={update("website")}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label={copy.name.label}
          name="name"
          required
          autoComplete="name"
          maxLength={100}
          value={values.name}
          onChange={update("name")}
          error={fieldErrors.name}
        />
        <Field
          label={copy.company.label}
          name="company"
          autoComplete="organization"
          maxLength={100}
          value={values.company}
          onChange={update("company")}
          error={fieldErrors.company}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label={copy.email.label}
          name="email"
          type="email"
          required
          autoComplete="email"
          maxLength={160}
          value={values.email}
          onChange={update("email")}
          error={fieldErrors.email}
        />
        <Field
          label={copy.phone.label}
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          maxLength={30}
          value={values.phone}
          onChange={update("phone")}
          error={fieldErrors.phone}
        />
      </div>

      <Field
        as="textarea"
        label={copy.message.label}
        name="message"
        required
        hint={!fieldErrors.message ? copy.message.hint : undefined}
        maxLength={2000}
        value={values.message}
        onChange={update("message")}
        error={fieldErrors.message}
      />

      {status === "error" && Object.keys(fieldErrors).length === 0 && (
        <p role="alert" className="flex items-start gap-2 text-small text-danger">
          <CircleAlert aria-hidden="true" strokeWidth={1.5} className="mt-0.5 size-4 shrink-0" />
          {copy.error}
        </p>
      )}

      <div aria-live="polite">
        <Button type="submit" disabled={pending} icon={pending ? null : undefined}>
          {pending ? copy.pending : copy.submit}
        </Button>
      </div>
    </form>
  );
}
