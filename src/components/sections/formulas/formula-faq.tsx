import { Container } from "@/components/layout/container";
import { Accordion } from "@/components/ui/accordion";
import { FORMULA_FAQ } from "@/constants/formulas";
import { Reveal } from "@/features/motion/components/reveal";
import { RevealText } from "@/features/motion/components/reveal-text";

/** Common questions about compounded formulas. */
export function FormulaFaq() {
  return (
    <section aria-labelledby="formula-faq-title" className="pb-section">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
        <RevealText as="h2" id="formula-faq-title" className="font-display text-display-md">
          Perguntas frequentes
        </RevealText>
        <Reveal stagger className="border-t border-black/10">
          {FORMULA_FAQ.map((item) => (
            <Accordion
              key={item.question}
              title={item.question}
              triggerClassName="py-6 text-title font-medium"
              contentClassName="max-w-[60ch] pb-6 text-body-lg text-slate"
            >
              <p>{item.answer}</p>
            </Accordion>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
