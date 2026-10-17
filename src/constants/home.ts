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
