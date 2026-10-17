import type { Metadata } from "next";

import { AccountActions } from "@/components/sections/account/account-actions";
import { PageIntro } from "@/components/sections/page-intro";

export const metadata: Metadata = {
  title: "Minha conta",
  robots: { index: false },
};

export default function AccountPage() {
  return (
    <main className="flex flex-col">
      <PageIntro
        eyebrow="Minha conta"
        title="Área do cliente"
        lead="Em breve você vai acompanhar pedidos e repetir fórmulas por aqui. Enquanto isso, nossa equipe atende você pelo WhatsApp."
        breadcrumbs={[{ label: "Início", href: "/" }, { label: "Minha conta" }]}
      />
      <AccountActions />
    </main>
  );
}
