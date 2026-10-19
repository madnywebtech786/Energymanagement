import Image from "next/image";
import { cx } from "@/lib/cx";

// A photograph from the image manifest with the site grade applied (see
// .photo in globals.css). The box takes its size from `className`, for
// example "aspect-banner" or "h-full". `sizes` is required: it tells the
// browser how wide the image is drawn, so it does not fetch more than needed.
// Pass `fetchPriority="high"` for the one image that is the LCP element.
export function Photo({ image, sizes, grade, alt, fetchPriority, className }) {
  return (
    <div className={cx("photo", className)} data-grade={grade ?? image.grade}>
      <Image
        src={image.src}
        alt={alt ?? image.alt}
        sizes={sizes}
        fill
        placeholder="blur"
        fetchPriority={fetchPriority}
        className="object-cover"
        style={{ objectPosition: image.position }}
      />
    </div>
  );
}
