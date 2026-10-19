import { CircleAlert } from "lucide-react";
import { cx } from "@/lib/cx";
import { Input, Textarea } from "./controls";

// A label, a control, an optional hint and an optional error, wired together:
// the label points at the control, and the hint and error are announced with
// it. `name` doubles as the id, so it must be unique within the page.
// Everything else is passed to the control (type, autoComplete, maxLength...).
export function Field({ label, name, hint, error, required, as = "input", className, ...control }) {
  const Control = as === "textarea" ? Textarea : Input;
  const hintId = hint ? `${name}-hint` : undefined;
  const errorId = error ? `${name}-error` : undefined;

  return (
    <div className={cx("grid content-start gap-2", className)}>
      <label htmlFor={name} className="text-small font-medium">
        {label}
        {required && <span className="ml-1 font-normal text-muted-foreground">(required)</span>}
      </label>
      <Control
        id={name}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
        {...control}
      />
      {hint && (
        <p id={hintId} className="text-small text-muted-foreground">
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
