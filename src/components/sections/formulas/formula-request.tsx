import { Container } from "@/components/layout/container";
import { CONTACT } from "@/constants/contact";
import { FormulaRequestForm } from "@/features/formulas/components/formula-request-form";
import { Reveal } from "@/features/motion/components/reveal";
import { RevealText } from "@/features/motion/components/reveal-text";

/** "Peça sua fórmula" (anchor `#pedido`, linked from the header CTA). */
export function FormulaRequest() {
  return (
    <section
      id="pedido"
      aria-labelledby="formula-request-title"
      className="scroll-mt-header-space py-section"
    >
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
        <div className="flex flex-col gap-6">
          <RevealText as="h2" id="formula-request-title" className="font-display text-display-md">
            Peça sua fórmula
          </RevealText>
          <RevealText as="p" delay={0.1} className="max-w-[36ch] text-lead text-slate">
            Preencha os dados e continue o atendimento pelo WhatsApp com a nossa equipe
            farmacêutica.
          </RevealText>
          <Reveal as="dl" stagger className="mt-4 grid gap-4 text-body-lg">
            <div>
              <dt className="text-muted">Atendimento</dt>
              <dd>Segunda a sábado, em horário comercial</dd>
            </div>
            <div>
              <dt className="text-muted">Prefere conversar direto?</dt>
              <dd>
                <a
                  href={CONTACT.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-forest"
                >
                  Fale com a gente no WhatsApp
                </a>
              </dd>
            </div>
          </Reveal>
        </div>
        <Reveal y={60} className="rounded-tile bg-surface p-6 sm:p-10">
          <FormulaRequestForm />
        </Reveal>
      </Container>
    </section>
  );
}
