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

export type TransformationHighlight = {
  productSlug: string;
  benefits: readonly [string, string];
};

/** Products selectable in the before & after block, with two headline benefits each. */
export const TRANSFORMATION_HIGHLIGHTS: readonly TransformationHighlight[] = [
  {
    productSlug: "termogenico-natural",
    benefits: ["Ativos naturais que apoiam o metabolismo", "Uso prático, uma cápsula pela manhã"],
  },
  {
    productSlug: "colageno-verisol",
    benefits: [
      "Contribui para a firmeza e a hidratação da pele",
      "Peptídeos de colágeno com vitamina C",
    ],
  },
  {
    productSlug: "daily-synbiotic",
    benefits: [
      "Apoia o equilíbrio da microbiota intestinal",
      "Ajuda a reduzir o desconforto digestivo",
    ],
  },
  {
    productSlug: "multivitaminico-diario",
    benefits: ["20 vitaminas e minerais essenciais", "Completa a rotina em uma cápsula ao dia"],
  },
];

export type Testimonial = {
  title: string;
  quote: string;
  poster: string;
  avatar?: string;
  /** Optional video file; the play control only renders when it exists. */
  video?: string;
};

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    title: "Atendimento da equipe.",
    quote: "Depois de um mês, minha pele melhorou muito.",
    poster: "/images/testimonials/atendimento.png",
    avatar: "/images/testimonials/avatar-1.jpg",
  },
  {
    title: "Clareza das informações.",
    quote: "Todas as minhas marcas sumiram.",
    poster: "/images/testimonials/clareza.png",
    avatar: "/images/testimonials/avatar-2.jpg",
  },
  {
    title: "Facilidade para fazer um pedido.",
    quote: "Minha digestão melhorou e a pele acompanhou.",
    poster: "/images/testimonials/pedido.png",
    avatar: "/images/testimonials/avatar-3.jpg",
  },
  {
    title: "Experiência de compra.",
    quote: "É simples, constante e eficaz.",
    poster: "/images/testimonials/compra.jpg",
  },
];
