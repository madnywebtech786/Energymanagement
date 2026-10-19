"use client";

import { useId, useState } from "react";
import * as m from "motion/react-m";
import { CircleCheck, CircleAlert } from "lucide-react";
import { cx } from "@/lib/cx";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { DURATION, EASE } from "@/lib/motion";

const INITIAL = { name: "", email: "", phone: "", message: "" };

// A filled field for the dark card: a translucent surface (--color-surface
// inside .theme-deep is a 5% white wash, see globals.css) rather than a
// bordered box or a bare underline — the label sits above it in the same
// register as the rest of the dark scope's text.
function ContactField({ label, name, type = "text", as = "input", hint, error, required, value, onChange, ...props }) {
  const hintId = hint ? `${name}-hint` : undefined;
  const errorId = error ? `${name}-error` : undefined;
  const Control = as;

  return (
    <div className="grid content-start gap-2">
      <label htmlFor={name} className="text-small font-medium text-deep-foreground">
        {label}
        {required && <span className="ml-1 font-normal text-deep-muted">(required)</span>}
      </label>
      <Control
        id={name}
        name={name}
        type={as === "input" ? type : undefined}
        required={required}
        value={value}
        onChange={onChange}
        aria-invalid={error ? true : undefined}
        aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
        rows={as === "textarea" ? 4 : undefined}
        className={cx(
          "w-full rounded-sm border bg-surface px-4 py-3 text-body text-deep-foreground outline-none transition-colors duration-(--duration-fast) placeholder:text-deep-muted",
          as === "textarea" ? "min-h-28 resize-y" : "",
          error
            ? "border-danger"
            : "border-transparent hover:border-border-strong focus:border-accent-graphic",
        )}
        {...props}
      />
      {hint && (
        <p id={hintId} className="text-small text-deep-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="flex items-start gap-2 text-small text-danger">
          <CircleAlert aria-hidden="true" strokeWidth={1.5} className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

// A controlled form posting to /api/contact — a normal client-side fetch,
// the same pattern any React form uses. No useActionState here: that hook
// binds to a Server Function, and this endpoint is a Route Handler (the
// user's explicit choice over a Server Action), so pending/error/success are
// plain client state tied to fetch instead.
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

  return (
    <div className="theme-deep flex h-full flex-col rounded-xl bg-background p-6 sm:p-10">
      {status === "success" ? (
        <m.div
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: DURATION.slow, ease: EASE.inOut }}
          role="status"
          className="flex flex-1 flex-col justify-center"
        >
          <CircleCheck aria-hidden="true" strokeWidth={1.5} className="size-8 text-accent" />
          <Heading level={3} size="h3" className="mt-4 text-deep-foreground">
            {copy.success.heading}
          </Heading>
          <Text variant="reading" className="mt-3 max-w-[46ch] text-deep-muted">
            {copy.success.text}
          </Text>
        </m.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-6">
          {/* Honeypot: off-screen, not display:none, so it stays out of the
              tab order and off-screen readers without tripping an
              accessibility checker that flags hidden-but-rendered content. */}
          <div className="absolute left-[-9999px] top-auto" aria-hidden="true">
            <label htmlFor={honeypotId}>Company</label>
            <input
              id={honeypotId}
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={values.company ?? ""}
              onChange={update("company")}
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <ContactField
              label={copy.name.label}
              name="name"
              required
              autoComplete="name"
              maxLength={100}
              value={values.name}
              onChange={update("name")}
              error={fieldErrors.name}
            />
            <ContactField
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

          <ContactField
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

          <ContactField
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

          <div aria-live="polite" className="mt-auto pt-1">
            <Button type="submit" disabled={pending} icon={pending ? null : undefined}>
              {pending ? copy.pending : copy.submit}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
