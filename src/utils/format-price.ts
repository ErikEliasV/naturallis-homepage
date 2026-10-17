const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

/** Formats a value in reais, e.g. 89.9 → "R$ 89,90". */
export function formatPrice(value: number): string {
  return BRL.format(value);
}
