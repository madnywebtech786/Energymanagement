import { CountUp } from "@/components/animations/count-up";
import { ImageMask } from "@/components/animations/image-mask";
import { Magnetic } from "@/components/animations/magnetic";
import { Parallax } from "@/components/animations/parallax";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/ui/photo";
import { Text } from "@/components/ui/text";
import { hero } from "@/content/hero";
import { images } from "@/content/images";
import { whyUs } from "@/content/why-us";
import { Cell } from "./cell";
import { Frame } from "./frame";
import { Replay } from "./replay";

const SIZES = "(min-width: 1024px) 44vw, 90vw";

export function MotionSection() {
  return (
    <Frame
      id="motion"
      index="04"
      label="Motion"
      title="Few moves, all deliberate"
      notes={[
        "One easing family and three durations. Only transform, opacity and clip-path move. Reveals play once, when they scroll into view.",
        "Anything in the first screen uses CSS keyframes so it shows before JavaScript loads. Reduced motion turns every reveal into an instant state and stills parallax and the magnetic pull.",
      ]}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Cell label="CSS entrance, no JS">
          <Replay>
            <div className="grid gap-3">
              <p className="animate-rise text-h3" style={{ "--delay": "0s" }}>
                {hero.stats[1].value}
              </p>
              <p className="animate-rise text-small text-muted-foreground" style={{ "--delay": "0.12s" }}>
                {hero.stats[1].label}
              </p>
              <div className="animate-rise" style={{ "--delay": "0.24s" }}>
                <Button size="md" variant="secondary" icon={null}>
                  Staggered with --delay
                </Button>
              </div>
            </div>
          </Replay>
        </Cell>

        <Cell label="Reveal">
          <Replay>
            <Reveal>
              <p className="text-h4">{whyUs.points[0].title}</p>
              <Text variant="small" muted className="mt-2">
                {whyUs.points[0].text}
              </Text>
            </Reveal>
          </Replay>
        </Cell>

        <Cell label="Text reveal" className="sm:col-span-2">
          <Replay>
            <p className="text-h2">
              <TextReveal>{whyUs.heading}</TextReveal>
            </p>
          </Replay>
        </Cell>

        <Cell label="Image mask">
          <Replay>
            <ImageMask className="aspect-photo">
              <Photo image={images.services["well-integrity"]} sizes={SIZES} className="size-full" />
            </ImageMask>
          </Replay>
        </Cell>

        <Cell label="Parallax, scroll the page">
          <Parallax className="aspect-photo" distance={0.1}>
            <Photo image={images.services["wells-completions"]} sizes={SIZES} className="size-full" />
          </Parallax>
        </Cell>

        <Cell label="Count up">
          <Replay>
            <p className="text-display">
              <CountUp to={35} suffix="+" />
            </p>
            <Text variant="small" muted className="mt-3">
              {hero.stats[0].label}
            </Text>
          </Replay>
        </Cell>

        <Cell label="Magnetic">
          <div className="grid min-h-32 place-items-center">
            <Magnetic>
              <Button variant="secondary" icon={null} size="lg">
                Move the pointer here
              </Button>
            </Magnetic>
          </div>
        </Cell>
      </div>
    </Frame>
  );
}
