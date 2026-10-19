import heroField from "@/assets/images/hero-1-field.jpg";
import heroStrata from "@/assets/images/hero-2-strata.jpg";
import heroDrawings from "@/assets/images/hero-3-drawings.jpg";
import productionOptimization from "@/assets/images/production-optimization.jpg";
import reservoirManagement from "@/assets/images/reservoir-management.jpg";
import subsurfaceGeological from "@/assets/images/subsurface-geological.jpg";
import wellIntegrity from "@/assets/images/well-integrity.jpg";
import artificialLift from "@/assets/images/artificial-lift.jpg";
import fieldDevelopmentPlanning from "@/assets/images/field-development-planning.jpg";
import wellsCompletions from "@/assets/images/wells-completions.jpg";
import assetEvaluation from "@/assets/images/asset-evaluation-due-diligence.jpg";
import managementAdvisory from "@/assets/images/management-advisory.jpg";
import whyUsOperator from "@/assets/images/why-us-operator.jpg";
import bannerCalgary from "@/assets/images/banner-calgary.jpg";

// Static imports give each photo its width, height and blur placeholder.
// `position` is the CSS object-position focal point used when a photo is
// cropped. `grade` picks a variant of the site's photo grade (see .photo in
// globals.css); photos without one use the base grade. `veil` is the paper
// veil strength (percent, centre and corners) for the three hero photos.
// Credits mirror src/assets/images/CREDITS.md.
// Well Intervention has no photo: its diagram is drawn in Phase 4.
export const images = {
  hero: {
    field: {
      src: heroField,
      alt: "Pumpjack in morning mist beside a green field, with bare poplar trees behind",
      position: "75% 50%",
      grade: "calm",
      veil: { core: 62, edge: 38 },
      credit: {
        author: "Ivan (@ywanphoto)",
        source: "Pexels",
        url: "https://www.pexels.com/photo/255552/",
      },
    },
    strata: {
      src: heroStrata,
      alt: "Close-up of layered rock strata in red-brown and grey-green bands",
      position: "50% 50%",
      veil: { core: 62, edge: 45 },
      credit: {
        author: "Vladimir Konoplev",
        source: "Pexels",
        url: "https://www.pexels.com/photo/11110872/",
      },
    },
    drawings: {
      src: heroDrawings,
      alt: "Hands of colleagues around engineering drawings, one pointing with a pencil",
      position: "50% 55%",
      veil: { core: 62, edge: 40 },
      credit: {
        author: "Anna Shvets",
        source: "Pexels",
        url: "https://www.pexels.com/photo/5324973/",
      },
    },
  },
  services: {
    "production-optimization": {
      src: productionOptimization,
      alt: "Aerial view of large white storage tanks on a desert plain with mountains beyond",
      position: "50% 62%",
      credit: {
        author: "Мирон Гиндин (@2152734488)",
        source: "Pexels",
        url: "https://www.pexels.com/photo/32357268/",
      },
    },
    "reservoir-management": {
      src: reservoirManagement,
      alt: "Hand holding a small white quartz rock sample",
      position: "40% 45%",
      credit: {
        author: "Mark Stebnicki",
        source: "Pexels",
        url: "https://www.pexels.com/photo/17146230/",
      },
    },
    "subsurface-geological": {
      src: subsurfaceGeological,
      alt: "Steeply tilted bands of pale and dark rock in a sunlit cliff face",
      position: "50% 50%",
      credit: {
        author: "Simon",
        source: "Unsplash",
        url: "https://unsplash.com/photos/layered-rock-formations-with-dark-and-light-strata-WAZ6JZ-BqzE",
      },
    },
    "well-integrity": {
      src: wellIntegrity,
      alt: "Red handwheel valves on white-coated pipework",
      position: "50% 25%",
      credit: {
        author: "Arshan Ali",
        source: "Pexels",
        url: "https://www.pexels.com/photo/5711732/",
      },
    },
    "artificial-lift": {
      src: artificialLift,
      alt: "Black and orange pumpjack in a green field with rolling farmland behind",
      position: "45% 55%",
      grade: "calm",
      credit: {
        author: "David Thielen",
        source: "Unsplash",
        url: "https://unsplash.com/photos/black-and-orange-metal-machine-on-green-grass-field-during-daytime-R5Ob28wpWzo",
      },
    },
    "field-development-planning": {
      src: fieldDevelopmentPlanning,
      alt: "Aerial view of a coastal tank farm and industrial site beside a bay under heavy cloud",
      position: "50% 65%",
      credit: {
        author: "Erik Mclean (@introspectivedsgn)",
        source: "Pexels",
        url: "https://www.pexels.com/photo/9407354/",
      },
    },
    "wells-completions": {
      src: wellsCompletions,
      alt: "Drilling rig standing in a ploughed field under a dark overcast sky",
      position: "51% 48%",
      grade: "lift",
      credit: {
        author: "Natalia Grela",
        source: "Unsplash",
        url: "https://unsplash.com/photos/a-drilling-rig-in-the-middle-of-a-field-laDsdizvnIs",
      },
    },
    "asset-evaluation-due-diligence": {
      src: assetEvaluation,
      alt: "Hands resting on printed bar charts, world maps and a flowchart on a wooden table",
      position: "50% 60%",
      grade: "calm",
      credit: {
        author: "RDNE Stock project (@rdne)",
        source: "Pexels",
        url: "https://www.pexels.com/photo/9034283/",
      },
    },
    "management-advisory": {
      src: managementAdvisory,
      alt: "Meeting room with a white oval table and brown leather chairs",
      position: "50% 70%",
      credit: {
        author: "Adrian C",
        source: "Pexels",
        url: "https://www.pexels.com/photo/12270135/",
      },
    },
  },
  whyUs: {
    src: whyUsOperator,
    alt: "Person in a white hard hat walking between large storage tanks and pipework",
    position: "50% 55%",
    grade: "cool",
    credit: {
      author: "Heru Dharma",
      source: "Pexels",
      url: "https://www.pexels.com/photo/36778676/",
    },
  },
  banner: {
    src: bannerCalgary,
    alt: "Calgary skyline and the Calgary Tower beyond a dry grassy hillside under a clear blue sky",
    position: "50% 52%",
    grade: "cool",
    credit: {
      author: "Les Miller (@les-miller-1071837)",
      source: "Pexels",
      url: "https://www.pexels.com/photo/37194143/",
    },
  },
};
