export type Ingredient = {
  slug: string;
  name: string;
  image: string;
  description: string;
};

/** Ingredient highlights (copy adapted to PT-BR from the Figma slider). */
export const INGREDIENTS: readonly Ingredient[] = [
  {
    slug: "gengibre",
    name: "Gengibre",
    image: "/images/ingredients/gengibre.png",
    description:
      "Raiz tradicional que contribui para o conforto digestivo e ajuda a aliviar o inchaço ocasional.",
  },
  {
    slug: "aloe-vera",
    name: "Aloe vera",
    image: "/images/ingredients/aloe-vera.png",
    description:
      "Conhecida por suas propriedades calmantes, apoia a saúde da mucosa intestinal e o equilíbrio digestivo.",
  },
  {
    slug: "curcuma",
    name: "Cúrcuma",
    image: "/images/ingredients/curcuma.png",
    description:
      "Botânico rico em curcumina, que apoia a resposta inflamatória natural do organismo.",
  },
  {
    slug: "beterraba",
    name: "Beterraba",
    image: "/images/ingredients/beterraba.png",
    description:
      "Naturalmente rica em fitonutrientes, contribui para a circulação e a energia celular.",
  },
  {
    slug: "semente-de-uva",
    name: "Semente de uva",
    image: "/images/ingredients/semente-de-uva.png",
    description:
      "Extrato concentrado em antioxidantes que ajuda a proteger contra o estresse oxidativo e apoia a vitalidade da pele.",
  },
  {
    slug: "semente-de-aipo",
    name: "Semente de aipo",
    image: "/images/ingredients/semente-de-aipo.png",
    description:
      "Tradicionalmente usada para apoiar o equilíbrio de líquidos e o conforto digestivo.",
  },
  {
    slug: "semente-de-jujuba",
    name: "Semente de jujuba",
    image: "/images/ingredients/semente-de-jujuba.png",
    description:
      "Conhecida por suas propriedades calmantes, apoia o relaxamento e um ritmo de sono saudável.",
  },
];

/** Selection criteria shown on the ingredients page. */
export const INGREDIENT_CRITERIA = [
  {
    title: "Origem rastreável",
    description: "Trabalhamos com fornecedores qualificados e documentação de cada lote.",
  },
  {
    title: "Análise de qualidade",
    description: "Matérias-primas conferidas antes de entrar na manipulação.",
  },
  {
    title: "Uso com orientação",
    description: "Indicamos combinações e doses adequadas para cada rotina.",
  },
] as const;
