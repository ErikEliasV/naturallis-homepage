import type { Metadata } from "next";

import { ContactChannels } from "@/components/sections/contact/contact-channels";
import { PageIntro } from "@/components/sections/page-intro";

const LEAD =
  "Tire dúvidas, agende uma conversa gratuita com a nossa equipe farmacêutica ou acompanhe o seu pedido.";

export const metadata: Metadata = {
  title: "Contato",
  description: LEAD,
};

export default function ContactPage() {
  return (
    <main className="flex flex-col">
      <PageIntro
        eyebrow="Contato"
        title="Fale com a Naturallis"
        lead={LEAD}
        breadcrumbs={[{ label: "Início", href: "/" }, { label: "Contato" }]}
      />
      <ContactChannels />
    </main>
  );
}
