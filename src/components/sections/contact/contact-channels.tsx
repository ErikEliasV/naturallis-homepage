import { Container } from "@/components/layout/container";
import { CONTACT, SOCIAL_LINKS } from "@/constants/contact";
import { ContactForm } from "@/features/contact/components/contact-form";
import { Reveal } from "@/features/motion/components/reveal";
import { RevealText } from "@/features/motion/components/reveal-text";

/** Channels list next to the contact form. */
export function ContactChannels() {
  return (
    <section aria-labelledby="contact-title" className="py-section">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
        <div className="flex flex-col gap-8">
          <RevealText as="h2" id="contact-title" className="font-display text-display-md">
            Nossos canais
          </RevealText>
          <Reveal as="ul" stagger className="flex flex-col border-t border-black/10">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.href} className="border-b border-black/10">
                <a
                  href={link.href}
                  {...(link.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="flex items-center justify-between py-6 text-title font-medium transition-colors duration-300 ease-power3-out hover:text-forest"
                >
                  {link.label}
                  <span aria-hidden className="text-muted">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </Reveal>
          <Reveal as="dl" className="grid gap-4 text-body-lg">
            <div>
              <dt className="text-muted">Atendimento</dt>
              <dd>Segunda a sábado, em horário comercial</dd>
            </div>
            <div>
              <dt className="text-muted">CNPJ</dt>
              <dd>{CONTACT.cnpj}</dd>
            </div>
          </Reveal>
        </div>
        <Reveal y={60} className="rounded-tile bg-surface p-6 sm:p-10">
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}
