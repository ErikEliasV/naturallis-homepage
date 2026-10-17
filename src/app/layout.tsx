import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SITE } from "@/constants/site";
import { PageTransition } from "@/features/transitions/components/page-transition";
import { Preloader } from "@/features/transitions/components/preloader";
import { FONT_VARIABLES } from "@/lib/fonts";
import { SmoothScrollProvider } from "@/lib/lenis/smooth-scroll-provider";

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
    <html lang="pt-BR" className={`${FONT_VARIABLES} antialiased`}>
      <body className="flex min-h-dvh flex-col bg-white font-sans text-ink">
        <SmoothScrollProvider>
          <Header />
          {children}
          <Footer />
          <PageTransition />
          <Preloader />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
