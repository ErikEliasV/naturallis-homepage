import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { HERO_STATS } from "@/constants/home";
import { FORMULA_CTA } from "@/constants/navigation";
import { SITE } from "@/constants/site";
import { CountUp } from "@/features/motion/components/count-up";
import { Reveal } from "@/features/motion/components/reveal";
import { RevealText } from "@/features/motion/components/reveal-text";
import { WebglImage } from "@/features/webgl/components/webgl-image";

/** Home hero (Figma "Desktop - 1", top 1201px): pharmacy photo, headline, CTAs and stats. */
export function HomeHero() {
  return (
    <section
      data-header-theme="dark"
      data-webgl-pointer-root
      className="relative isolate flex min-h-dvh flex-col justify-end overflow-hidden pt-header-space pb-section-sm text-white lg:min-h-hero lg:pb-hero-bottom"
    >
      <WebglImage
        src="/images/hero-farmacia.png"
        alt="Interior da farmácia Naturallis com prateleiras de madeira e produtos de cuidado"
        sizes="100vw"
        preload
        strength={1}
        className="absolute inset-0 -z-10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(222.67deg,rgb(0_0_0/0)_13.26%,rgb(0_0_0/0.49)_99.54%)] mix-blend-multiply"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(154.79deg,rgb(0_0_0/0)_35.44%,rgb(0_0_0/0.49)_99.14%)] mix-blend-multiply"
      />

      <Container className="flex flex-col gap-section-sm lg:flex-row lg:items-end lg:justify-between">
        <div className="flex max-w-hero-copy flex-col gap-hero-copy-gap">
          <RevealText as="h1" trigger="mount" className="font-display text-display-lg">
            {SITE.tagline}
          </RevealText>
          <RevealText as="p" trigger="mount" delay={0.15} className="text-lead">
            {SITE.description}
          </RevealText>
          <Reveal stagger trigger="mount" delay={0.3} className="flex flex-wrap gap-4 pt-1">
            <div>
              <Button href="/produtos">Conheça nossos produtos</Button>
            </div>
            <div>
              <Button href={FORMULA_CTA.href} variant="light">
                Solicite sua fórmula
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal
          as="ul"
          stagger
          trigger="mount"
          delay={0.2}
          className="grid grid-cols-2 gap-stats-gap lg:flex lg:flex-col lg:items-end lg:text-right"
        >
          {HERO_STATS.map((stat) => (
            <li key={stat.label} className="flex flex-col">
              <CountUp
                value={stat.value}
                decimals={stat.decimals}
                suffix={stat.suffix}
                trigger="mount"
                delay={0.2}
                className="font-display text-display-xl"
              />
              <span className="text-stat-label">{stat.label}</span>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
