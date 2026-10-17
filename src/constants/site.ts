export const SITE = {
  name: "Naturallis",
  /** Public URL (origin + base path) used for canonical URLs, sitemap and social cards. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Sub-path the site is served from (e.g. "/naturallis-homepage" on GitHub Pages). */
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  tagline: "Cuidado que respeita a individualidade",
  description:
    "Fórmulas manipuladas, suplementos e produtos selecionados para fazer parte da sua rotina de cuidado, com qualidade, orientação e atenção a cada detalhe.",
  copyrightYear: 2026,
  designCredit: "THE GRAW",
  summary:
    "Farmácia de manipulação com fórmulas personalizadas, suplementos e produtos selecionados, com orientação farmacêutica em cada etapa.",
} as const;
