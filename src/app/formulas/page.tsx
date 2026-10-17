import type { Metadata } from "next";

import { FormulaBenefits } from "@/components/sections/formulas/formula-benefits";
import { FormulaFaq } from "@/components/sections/formulas/formula-faq";
import { FormulaRequest } from "@/components/sections/formulas/formula-request";
import { FormulaSteps } from "@/components/sections/formulas/formula-steps";
import { PageIntro } from "@/components/sections/page-intro";

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
      <FormulaBenefits />
      <FormulaRequest />
      <FormulaFaq />
    </main>
  );
}
