import Link from "next/link";

import { Container } from "@/components/layout/container";
import { ACCOUNT_LINKS, FORMULA_CTA } from "@/constants/navigation";
import { Reveal } from "@/features/motion/components/reveal";
import { whatsappLink } from "@/utils/whatsapp";

const ACTIONS = [
  {
    title: "Acompanhar pedido",
    description: "Fale com a nossa equipe para saber o status da sua fórmula ou entrega.",
    href: whatsappLink("Olá! Gostaria de acompanhar o meu pedido."),
    external: true,
  },
  {
    title: "Meu carrinho",
    description: "Revise os produtos escolhidos e finalize o pedido.",
    href: ACCOUNT_LINKS.cart.href,
    external: false,
  },
  {
    title: "Repetir uma fórmula",
    description: "Peça novamente uma fórmula que você já manipulou com a gente.",
    href: FORMULA_CTA.href,
    external: false,
  },
] as const;

/** Shortcuts offered while the customer area is not available. */
export function AccountActions() {
  return (
    <section aria-label="Atalhos do cliente" className="pb-section">
      <Container>
        <Reveal as="ul" stagger className="grid gap-4 md:grid-cols-3">
          {ACTIONS.map((action) => {
            const content = (
              <>
                <span className="font-display text-display-sm">{action.title}</span>
                <span className="max-w-[30ch] text-body-lg text-slate">{action.description}</span>
                <span aria-hidden className="mt-auto text-title text-forest">
                  →
                </span>
              </>
            );
            const className =
              "flex h-full min-h-72 flex-col gap-4 rounded-tile bg-surface p-8 transition-colors duration-300 ease-power3-out hover:bg-lime focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";
            return (
              <li key={action.title}>
                {action.external ? (
                  <a
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {content}
                  </a>
                ) : (
                  <Link href={action.href} className={className}>
                    {content}
                  </Link>
                )}
              </li>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
