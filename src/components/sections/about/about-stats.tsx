import { Container } from "@/components/layout/container";
import { HERO_STATS } from "@/constants/home";
import { CountUp } from "@/features/motion/components/count-up";
import { Reveal } from "@/features/motion/components/reveal";

/** The Home hero numbers, counted up as a band. */
export function AboutStats() {
  return (
    <section aria-label="A Naturallis em números" className="pb-section">
      <Container>
        <Reveal
          as="ul"
          stagger
          className="grid grid-cols-2 gap-x-8 gap-y-12 border-y border-black/10 py-section-sm lg:grid-cols-4"
        >
          {HERO_STATS.map((stat) => (
            <li key={stat.label} className="flex flex-col">
              <CountUp
                value={stat.value}
                decimals={stat.decimals}
                suffix={stat.suffix}
                className="font-display text-display-xl"
              />
              <span className="text-stat-label text-slate">{stat.label}</span>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
