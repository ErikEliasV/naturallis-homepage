import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { INGREDIENTS } from "@/constants/ingredients";
import { IngredientSlider } from "@/features/ingredients/components/ingredient-slider";
import { Reveal } from "@/features/motion/components/reveal";
import { RevealText } from "@/features/motion/components/reveal-text";

/** "Conheça nossos ingredientes" (Figma "Container" 2803:3989). */
export function HomeIngredients() {
  return (
    <section aria-labelledby="home-ingredients-title" className="py-section">
      <Container width="shop" className="flex flex-col items-center text-center">
        <Reveal as="p" className="pb-5 text-body font-medium tracking-eyebrow uppercase">
          quais ingredientes usamos?
        </Reveal>
        <RevealText as="h2" id="home-ingredients-title" className="font-display text-display-sm">
          Conheça nossos ingredientes
        </RevealText>
      </Container>

      <Reveal className="mt-card-gap">
        <IngredientSlider ingredients={INGREDIENTS} />
      </Reveal>

      <div className="mt-card-gap flex justify-center">
        <Button href="/ingredientes" variant="lime" size="shop">
          Veja todos os ingredientes
        </Button>
      </div>
    </section>
  );
}
