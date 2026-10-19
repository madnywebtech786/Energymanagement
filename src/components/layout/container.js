import { cx } from "@/lib/cx";

const SIZES = {
  page: "max-w-page",
  reading: "max-w-reading",
};

// Centres content and gives it the page gutter.
export function Container({ as: Tag = "div", size = "page", className, ...props }) {
  return <Tag className={cx("mx-auto w-full px-gutter", SIZES[size], className)} {...props} />;
}
