import { CONTACT } from "@/constants/contact";

/** WhatsApp deep link with a prefilled message. */
export function whatsappLink(message: string): string {
  return `${CONTACT.whatsapp.href}?text=${encodeURIComponent(message)}`;
}
