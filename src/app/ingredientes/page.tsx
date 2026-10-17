import type { Metadata } from "next";

import { CtaBand } from "@/components/sections/cta-band";
import { HighlightsPanel } from "@/components/sections/highlights-panel";
import { IngredientsGrid } from "@/components/sections/ingredients/ingredients-grid";
import { PageIntro } from "@/components/sections/page-intro";
import { INGREDIENT_CRITERIA } from "@/constants/ingredients";
import { FORMULA_CTA } from "@/constants/navigation";

const LEAD =
  "Matérias-primas selecionadas com critério, de fornecedores qualificados, para fórmulas em que você pode confiar.";

export const metadata: Metadata = {
  title: "Ingredientes",
  description: LEAD,
};

export default function IngredientsPage() {
  return (
    <main className="flex flex-col">
      <PageIntro
        eyebrow="Quais ingredientes usamos?"
        title="Conheça nossos ingredientes"
        lead={LEAD}
        breadcrumbs={[{ label: "Início", href: "/" }, { label: "Ingredientes" }]}
        image={{ src: "/images/product/folha.jpg", alt: "Folhas verdes de babosa" }}
      />
      <IngredientsGrid />
      <HighlightsPanel
        id="ingredients-criteria"
        title="Como escolhemos cada ingrediente"
        items={INGREDIENT_CRITERIA}
        className="my-section"
      />
      <CtaBand
        title="Quer saber o que vai na sua fórmula?"
        text="Nossa equipe farmacêutica explica cada ativo e ajuda a montar a combinação certa para você."
        primary={FORMULA_CTA}
        secondary={{ label: "Ver produtos", href: "/produtos" }}
      />
    </main>
  );
}
