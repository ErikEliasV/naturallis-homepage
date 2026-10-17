import { type NavLink } from "./navigation";

/*
 * Placeholder contact data: the Figma file lists these channels without values.
 * Replace with the real handles, phone, e-mail and CNPJ before going live.
 */
export const CONTACT = {
  whatsapp: { label: "WhatsApp", href: "https://wa.me/" },
  instagram: { label: "Instagram", href: "https://www.instagram.com/" },
  tiktok: { label: "TikTok", href: "https://www.tiktok.com/" },
  email: { label: "E-mail", href: "mailto:contato@naturallis.com.br" },
  cnpj: "00.000.000/0000-00",
} as const satisfies Record<string, NavLink | string>;

export const SOCIAL_LINKS: readonly NavLink[] = [
  CONTACT.whatsapp,
  CONTACT.instagram,
  CONTACT.tiktok,
  CONTACT.email,
];
