import type { Metadata } from "next";

import { FONT_VARIABLES } from "@/lib/fonts";
import { SITE } from "@/constants/site";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE.name,
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${FONT_VARIABLES} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-ink">{children}</body>
    </html>
  );
}
