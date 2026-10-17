import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { type NavLink } from "@/constants/navigation";
import { Reveal } from "@/features/motion/components/reveal";
import { RevealText } from "@/features/motion/components/reveal-text";

type CtaBandProps = {
  title: string;
  text: string;
  primary: NavLink;
  secondary?: NavLink;
};

/** Closing call to action of the institutional pages, on the lime accent. */
export function CtaBand({ title, text, primary, secondary }: CtaBandProps) {
  return (
    <section className="pb-section">
      <Container>
        <Reveal
          y={60}
          className="flex flex-col gap-8 rounded-panel bg-lime px-gutter py-section-sm lg:flex-row lg:items-end lg:justify-between lg:px-section"
        >
          <div className="flex max-w-[34ch] flex-col gap-4">
            <RevealText as="h2" className="font-display text-display-md text-forest">
              {title}
            </RevealText>
            <p className="text-lead text-forest/80">{text}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <div>
              <Button href={primary.href}>{primary.label}</Button>
            </div>
            {secondary ? (
              <div>
                <Button href={secondary.href} variant="light">
                  {secondary.label}
                </Button>
              </div>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
