import type { Metadata } from "next";

import { AboutStats } from "@/components/sections/about/about-stats";
import { AboutStory } from "@/components/sections/about/about-story";
import { CtaBand } from "@/components/sections/cta-band";
import { HighlightsPanel } from "@/components/sections/highlights-panel";
import { PageIntro } from "@/components/sections/page-intro";
import { CARE_PILLARS } from "@/constants/home";
import { FORMULA_CTA } from "@/constants/navigation";

const LEAD =
  "Somos uma farmácia de manipulação que une ciência, atenção e ingredientes de qualidade para cuidar de cada pessoa de forma única.";

export const metadata: Metadata = {
  title: "A Naturallis",
  description: LEAD,
};

export default function AboutPage() {
  return (
    <main className="flex flex-col">
      <PageIntro
        eyebrow="A Naturallis"
        title="Cuidado que respeita a individualidade"
        lead={LEAD}
        breadcrumbs={[{ label: "Início", href: "/" }, { label: "A Naturallis" }]}
        image={{
          src: "/images/cuidado-farmaceutica.png",
          alt: "Farmacêutica da Naturallis sorrindo em um jardim",
        }}
      />
      <AboutStory />
      <AboutStats />
      <HighlightsPanel
        id="about-pillars"
        title="O que guia o nosso trabalho"
        items={CARE_PILLARS}
        className="mb-section"
      />
      <CtaBand
        title="Venha nos conhecer"
        text="Fale com a nossa equipe, tire dúvidas e descubra a fórmula certa para a sua rotina."
        primary={{ label: "Fale conosco", href: "/contato" }}
        secondary={FORMULA_CTA}
      />
    </main>
  );
}
