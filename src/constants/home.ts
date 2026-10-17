import { type CategorySlug } from "./categories";

export type HeroStat = {
  value: number;
  decimals?: number;
  suffix: string;
  label: string;
};

export const HERO_STATS: readonly HeroStat[] = [
  { value: 500, suffix: "+", label: "Clientes atendidos" },
  { value: 30, suffix: "+", label: "anos de mercado" },
  { value: 18, suffix: "+", label: "Fórmulas próprias" },
  { value: 4.9, decimals: 1, suffix: "/5", label: "Avaliação no Google" },
];

export type CarePillar = {
  title: string;
  description: string;
};

export const CARE_PILLARS: readonly CarePillar[] = [
  {
    title: "Cuidado individualizado",
    description: "Atenção às necessidades específicas de cada pessoa.",
  },
  {
    title: "Qualidade dos ingredientes",
    description: "Seleção criteriosa de matérias-primas e fornecedores.",
  },
  {
    title: "Manipulação responsável",
    description: "Processos conduzidos conforme os requisitos técnicos aplicáveis.",
  },
  {
    title: "Orientação farmacêutica",
    description: "Informação e suporte para esclarecer dúvidas sobre produtos e fórmulas.",
  },
  {
    title: "Transparência em cada etapa",
    description: "Informações claras sobre produtos, pedidos e atendimento.",
  },
];

export type CategoryFilter = {
  slug: CategorySlug;
  icon: string;
};

/** Category chips of the "Encontre o que faz sentido" panel. */
export const HOME_CATEGORY_FILTERS: readonly CategoryFilter[] = [
  { slug: "saude-e-bem-estar", icon: "/icons/categories/saude-e-bem-estar.svg" },
  { slug: "saude-da-mulher", icon: "/icons/categories/saude-da-mulher.svg" },
  { slug: "sono-e-relaxamento", icon: "/icons/categories/sono-e-relaxamento.svg" },
  { slug: "vitaminas-e-minerais", icon: "/icons/categories/vitaminas-e-minerais.svg" },
];
