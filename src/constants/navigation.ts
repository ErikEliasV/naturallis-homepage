export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: readonly NavLink[] = [
  { label: "Início", href: "/" },
  { label: "Produtos", href: "/produtos" },
  { label: "Fórmulas", href: "/formulas" },
  { label: "Ingredientes", href: "/ingredientes" },
  { label: "A Naturallis", href: "/a-naturallis" },
  { label: "Contato", href: "/contato" },
];

export const FORMULA_CTA: NavLink = { label: "Peça sua fórmula", href: "/formulas#pedido" };

export const ACCOUNT_LINKS = {
  cart: { label: "Carrinho", href: "/carrinho" },
  account: { label: "Minha conta", href: "/conta" },
} as const satisfies Record<string, NavLink>;

/** Pixels scrolled before the header switches to its compact, backed style. */
export const HEADER_SCROLLED_AFTER = 24;

/** Pixels scrolled before the header starts hiding on scroll down. */
export const HEADER_HIDE_AFTER = 160;

/** Top padding (px) kept visible when the header is compact. */
export const HEADER_COMPACT_TOP = 16;
