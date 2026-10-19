import { notFound } from "next/navigation";
import { SheetHeader } from "./_sections/sheet-header";
import { TypeSection } from "./_sections/type-section";
import { ColourSection } from "./_sections/colour-section";
import { ComponentsSection } from "./_sections/components-section";
import { MotionSection } from "./_sections/motion-section";
import { PhotoSection } from "./_sections/photo-section";
import { VeilSection } from "./_sections/veil-section";
import { WellPathSection } from "./_sections/well-path-section";

export const metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

// Dev-only review page. Delete the whole src/app/design folder before launch.
export default function DesignPage() {
  // Closed in production unless SHOW_DESIGN_PAGE=true is set for that build.
  if (process.env.NODE_ENV === "production" && process.env.SHOW_DESIGN_PAGE !== "true") {
    notFound();
  }

  return (
    <main>
      <SheetHeader />
      <TypeSection />
      <ColourSection />
      <ComponentsSection />
      <MotionSection />
      <PhotoSection />
      <VeilSection />
      <WellPathSection />
    </main>
  );
}
