import Image from "next/image";

import { Container } from "@/components/layout/container";
import { ABOUT_STORY } from "@/constants/about";
import { Parallax } from "@/features/motion/components/parallax";
import { Reveal } from "@/features/motion/components/reveal";
import { RevealText } from "@/features/motion/components/reveal-text";

/** Brand story next to the pharmacy photo. */
export function AboutStory() {
  return (
    <section aria-labelledby="about-story-title" className="py-section">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-6">
          <RevealText as="h2" id="about-story-title" className="font-display text-display-md">
            Nossa história
          </RevealText>
          <Reveal stagger className="flex flex-col gap-5 text-body-lg text-slate">
            {ABOUT_STORY.map((paragraph) => (
              <p key={paragraph} className="max-w-[52ch]">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
        <Reveal y={60}>
          <Parallax
            speed={0.1}
            className="relative aspect-[4/5] rounded-banner"
            innerClassName="absolute inset-x-0 -inset-y-[12%]"
          >
            <Image
              src="/images/hero-farmacia.png"
              alt="Interior da farmácia Naturallis com prateleiras de madeira"
              fill
              sizes="(min-width: 64rem) 50vw, 100vw"
              className="object-cover"
            />
          </Parallax>
        </Reveal>
      </Container>
    </section>
  );
}
