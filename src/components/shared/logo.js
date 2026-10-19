import { cx } from "@/lib/cx";
import { site } from "@/content/site";

// The EM monogram, drawn exactly as on the current site. The colours come
// from tokens, so inside a .theme-deep section it inverts by itself.
export function LogoMark({ className }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cx("size-11 shrink-0", className)}>
      <rect width="64" height="64" rx="12" className="fill-primary" />
      <path
        d="M14 46V18h16M14 32h12M14 46h16"
        className="stroke-primary-foreground"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M34 46V18l8 14 8-14v28"
        className="stroke-accent-graphic"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// The monogram with the company name beside it. The name is a brand, so
// browser auto-translate is told to leave it alone.
export function Logo({ className }) {
  return (
    <span className={cx("inline-flex items-center gap-3", className)}>
      <LogoMark />
      <span translate="no" className="grid gap-1 leading-none">
        <span className="text-h4 font-semibold tracking-tight">{site.brand.name}</span>
        <span className="text-[0.625rem] font-medium tracking-[0.16em] text-muted-foreground">
          {site.brand.descriptor}
        </span>
      </span>
    </span>
  );
}
