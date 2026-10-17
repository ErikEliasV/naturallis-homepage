import Image from "next/image";

import { Breadcrumbs, type Crumb } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { Parallax } from "@/features/motion/components/parallax";
import { Reveal } from "@/features/motion/components/reveal";
import { RevealText } from "@/features/motion/components/reveal-text";

type PageIntroProps = {
  title: string;
  lead: string;
  breadcrumbs: readonly Crumb[];
  image?: { src: string; alt: string };
  eyebrow?: string;
};

/**
 * Opening block of the institutional pages: same headline scale as the Home sections
 * (Nohemi display) and a rounded parallax photo like the Skin Line banner.
 */
export function PageIntro({ title, lead, breadcrumbs, image, eyebrow }: PageIntroProps) {
  return (
    <section className="pt-header-space pb-section-sm">
      <Container>
        <Breadcrumbs items={breadcrumbs} className="py-4" />
        <div className="flex flex-col gap-6 pt-section-sm lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-5">
            {eyebrow ? (
              <Reveal
                as="p"
                trigger="mount"
                className="text-body font-medium tracking-eyebrow uppercase"
              >
                {eyebrow}
              </Reveal>
            ) : null}
            <RevealText
              as="h1"
              trigger="mount"
              className="max-w-[14ch] font-display text-display-lg"
            >
              {title}
            </RevealText>
          </div>
          <RevealText
            as="p"
            trigger="mount"
            delay={0.15}
            className="max-w-[34ch] text-lead text-slate"
          >
            {lead}
          </RevealText>
        </div>
        {image ? (
          <Reveal trigger="mount" delay={0.25} y={60} className="mt-section-sm">
            <Parallax
              speed={0.08}
              className="relative aspect-[4/3] rounded-banner sm:aspect-[1760/640]"
              innerClassName="absolute inset-x-0 -inset-y-[10%]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                preload
                sizes="(min-width: 110rem) 110rem, 100vw"
                className="object-cover"
              />
            </Parallax>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
