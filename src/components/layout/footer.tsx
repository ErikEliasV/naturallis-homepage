import Image from "next/image";

import { HealthCta } from "@/components/sections/health-cta";
import { CATEGORIES, categoryHref, FOOTER_CATEGORY_SLUGS } from "@/constants/categories";
import { CONTACT, SOCIAL_LINKS } from "@/constants/contact";
import { NAV_LINKS, type NavLink } from "@/constants/navigation";
import { SITE } from "@/constants/site";
import { Reveal } from "@/features/motion/components/reveal";

import { Container } from "./container";
import { FooterColumn } from "./footer-column";

const FOOTER_CATEGORIES: readonly NavLink[] = CATEGORIES.filter((category) =>
  FOOTER_CATEGORY_SLUGS.includes(category.slug),
).map((category) => ({ label: category.name, href: categoryHref(category.slug) }));

/** Global footer: health CTA, oversized wordmark and link columns. */
export function Footer() {
  return (
    <footer className="mt-auto">
      <HealthCta />

      <div data-header-theme="dark" className="bg-forest pt-footer-top pb-footer-bottom text-white">
        <Container>
          <Reveal y={80}>
            <Image
              src="/brand/logo-footer.svg"
              alt="Naturallis"
              width={1728}
              height={384}
              className="h-auto w-[98.2%]"
            />
          </Reveal>

          <Reveal
            stagger
            className="mt-footer-gap grid gap-x-8 gap-y-12 text-body-lg sm:grid-cols-2 lg:grid-cols-[minmax(0,32.6fr)_minmax(0,25.2fr)_minmax(0,25.2fr)_auto]"
          >
            <p className="max-w-[21.4em]">{SITE.summary}</p>
            <FooterColumn title="Links rápidos" links={NAV_LINKS} />
            <FooterColumn title="Produtos" links={FOOTER_CATEGORIES} />
            <FooterColumn title="Naturallis" links={SOCIAL_LINKS}>
              <li>CNPJ {CONTACT.cnpj}</li>
            </FooterColumn>
          </Reveal>

          <div className="mt-footer-credit flex flex-col gap-2 text-body-lg sm:flex-row sm:justify-between">
            <p>Design by {SITE.designCredit}</p>
            <p>
              © {SITE.copyrightYear} {SITE.name}. Todos os direitos reservados.
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
