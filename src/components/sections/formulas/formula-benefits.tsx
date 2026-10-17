import { Container } from "@/components/layout/container";
import { FORMULA_BENEFITS } from "@/constants/formulas";
import { Reveal } from "@/features/motion/components/reveal";
import { RevealText } from "@/features/motion/components/reveal-text";

/** Benefits on the forest panel used by the Home categories section. */
export function FormulaBenefits() {
  return (
    <section
      data-header-theme="dark"
      aria-labelledby="formula-benefits-title"
      className="relative isolate py-panel-y text-white"
    >
      <div aria-hidden className="absolute inset-0 -z-10 rounded-panel bg-forest" />
      <Container className="flex flex-col gap-panel-gap">
        <RevealText
          as="h2"
          id="formula-benefits-title"
          className="max-w-[16ch] font-display text-display-md"
        >
          Por que manipular sua fórmula
        </RevealText>
        <Reveal as="ul" stagger className="grid gap-10 md:grid-cols-3">
          {FORMULA_BENEFITS.map((benefit) => (
            <li key={benefit.title} className="flex flex-col gap-4 border-t border-white/20 pt-6">
              <h3 className="font-display text-display-sm text-lime">{benefit.title}</h3>
              <p className="max-w-[30ch] text-body-lg text-fog">{benefit.description}</p>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
