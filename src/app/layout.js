import { Mona_Sans, Newsreader } from "next/font/google";
import { MotionProvider } from "@/components/animations/motion-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { site } from "@/content/site";
import "./globals.css";

export const ensureStatic = "navigation";

// Mona Sans carries the interface and the display type. Newsreader is for
// reading text and quotes. Both are weight-only variable fonts (about 96 KB
// together): the width and optical-size axes cost another 130 KB for a gain
// that is hard to see at these sizes.
const monaSans = Mona_Sans({
  subsets: ["latin"],
  variable: "--font-mona-sans",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata = {
  title: site.title,
  description: site.description,
};

// themeColor tints the phone's browser bar to match the page. It has to be a
// literal, so it repeats --color-background from globals.css.
export const viewport = {
  themeColor: "#f6f8fa",
  colorScheme: "light",
};

// Scroll reveals start hidden; without JavaScript they must show as normal.
const showRevealsWithoutJs =
  "[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}[data-draw]{stroke-dasharray:none!important;stroke-dashoffset:0!important}";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${monaSans.variable} ${newsreader.variable}`}>
      <head>
        <noscript>
          <style>{showRevealsWithoutJs}</style>
        </noscript>
      </head>
      <body className="min-h-dvh bg-background font-sans text-body text-foreground antialiased">
        <MotionProvider>
          <Header />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
