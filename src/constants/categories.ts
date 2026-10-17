export type CategorySlug =
  | "emagrecimento"
  | "saude-e-bem-estar"
  | "saude-da-mulher"
  | "sono-e-relaxamento"
  | "vitaminas-e-minerais"
  | "dia-a-dia"
  | "skin-care";

export type Category = {
  slug: CategorySlug;
  name: string;
  description: string;
};

export const CATEGORIES: readonly Category[] = [
  {
    slug: "emagrecimento",
    name: "Emagrecimento",
    description: "Fórmulas e suplementos que apoiam o metabolismo e o controle de peso.",
  },
  {
    slug: "saude-e-bem-estar",
    name: "Saúde e bem-estar",
    description: "Cuidado diário para o corpo e a mente, com ingredientes selecionados.",
  },
  {
    slug: "saude-da-mulher",
    name: "Saúde da mulher",
    description: "Suporte para cada fase da vida, com orientação farmacêutica.",
  },
  {
    slug: "sono-e-relaxamento",
    name: "Sono e relaxamento",
    description: "Ativos que ajudam a manter o ritmo do sono e a sensação de calma.",
  },
  {
    slug: "vitaminas-e-minerais",
    name: "Vitaminas e minerais",
    description: "Nutrientes essenciais para completar a sua rotina.",
  },
  {
    slug: "dia-a-dia",
    name: "Dia a dia",
    description: "Produtos práticos para acompanhar a rotina de quem cuida de si.",
  },
  {
    slug: "skin-care",
    name: "Skin Care",
    description: "Cuidados que deixam a rotina de beleza simples, eficaz e radiante.",
  },
];

export function categoryHref(slug: CategorySlug): string {
  return `/produtos/${slug}`;
}

/** Categories highlighted in the footer, in the order shown in the Figma file. */
export const FOOTER_CATEGORY_SLUGS: readonly CategorySlug[] = [
  "emagrecimento",
  "saude-e-bem-estar",
  "dia-a-dia",
  "skin-care",
];
