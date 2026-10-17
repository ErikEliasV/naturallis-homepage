import { Container } from "@/components/layout/container";
import { FORMULA_STEPS } from "@/constants/formulas";
import { Reveal } from "@/features/motion/components/reveal";
import { RevealText } from "@/features/motion/components/reveal-text";

function pad(index: number) {
  return String(index + 1).padStart(2, "0");
}

/** Four-step process, numbered like an editorial list. */
export function FormulaSteps() {
  return (
    <section aria-labelledby="formula-steps-title" className="py-section">
      <Container>
        <RevealText as="h2" id="formula-steps-title" className="font-display text-display-md">
          Como funciona
        </RevealText>
        <Reveal
          as="ol"
          stagger
          className="mt-card-gap grid gap-x-8 gap-y-12 border-t border-black/10 pt-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {FORMULA_STEPS.map((step, index) => (
            <li key={step.title} className="flex flex-col gap-4">
              <span className="font-display text-display-sm text-sage">{pad(index)}</span>
              <h3 className="text-title font-medium">{step.title}</h3>
              <p className="max-w-[28ch] text-body-lg text-slate">{step.description}</p>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
