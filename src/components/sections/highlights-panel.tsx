import { Container } from "@/components/layout/container";
import { Reveal } from "@/features/motion/components/reveal";
import { RevealText } from "@/features/motion/components/reveal-text";
import { cn } from "@/utils/cn";

type Highlight = {
  title: string;
  description: string;
};

type HighlightsPanelProps = {
  id: string;
  title: string;
  items: readonly Highlight[];
  className?: string;
};

/** Short highlights on the rounded forest panel (same surface as the Home categories). */
export function HighlightsPanel({ id, title, items, className }: HighlightsPanelProps) {
  const titleId = `${id}-title`;
  return (
    <section
      data-header-theme="dark"
      aria-labelledby={titleId}
      className={cn("relative isolate py-panel-y text-white", className)}
    >
      <div aria-hidden className="absolute inset-0 -z-10 rounded-panel bg-forest" />
      <Container className="flex flex-col gap-panel-gap">
        <RevealText as="h2" id={titleId} className="max-w-[18ch] font-display text-display-md">
          {title}
        </RevealText>
        <Reveal as="ul" stagger className="grid gap-10 md:grid-cols-3">
          {items.map((item) => (
            <li key={item.title} className="flex flex-col gap-4 border-t border-white/20 pt-6">
              <h3 className="font-display text-display-sm text-lime">{item.title}</h3>
              <p className="max-w-[30ch] text-body-lg text-fog">{item.description}</p>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
