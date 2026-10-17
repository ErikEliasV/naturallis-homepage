import type { Metadata } from "next";

import { FormulaFaq } from "@/components/sections/formulas/formula-faq";
import { FormulaRequest } from "@/components/sections/formulas/formula-request";
import { FormulaSteps } from "@/components/sections/formulas/formula-steps";
import { HighlightsPanel } from "@/components/sections/highlights-panel";
import { PageIntro } from "@/components/sections/page-intro";
import { FORMULA_BENEFITS } from "@/constants/formulas";

const LEAD =
  "Manipulamos a sua receita ou desenvolvemos, com orientação farmacêutica, uma fórmula pensada para a sua rotina.";

export const metadata: Metadata = {
  title: "Fórmulas manipuladas",
  description: LEAD,
};

export default function FormulasPage() {
  return (
    <main className="flex flex-col">
      <PageIntro
        eyebrow="Farmácia de manipulação"
        title="Fórmulas feitas para você"
        lead={LEAD}
        breadcrumbs={[{ label: "Início", href: "/" }, { label: "Fórmulas" }]}
        image={{ src: "/images/product/bolhas.jpg", alt: "Textura de gel transparente com bolhas" }}
      />
      <FormulaSteps />
      <HighlightsPanel
        id="formula-benefits"
        title="Por que manipular sua fórmula"
        items={FORMULA_BENEFITS}
      />
      <FormulaRequest />
      <FormulaFaq />
    </main>
  );
}
