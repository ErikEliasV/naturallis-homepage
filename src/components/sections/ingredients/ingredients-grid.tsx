import { Container } from "@/components/layout/container";
import { INGREDIENTS } from "@/constants/ingredients";
import { IngredientCard } from "@/features/ingredients/components/ingredient-card";
import { Reveal } from "@/features/motion/components/reveal";

/** Every ingredient tile, in the same cards used by the Home slider. */
export function IngredientsGrid() {
  return (
    <section aria-label="Lista de ingredientes" className="py-section-sm">
      <Container width="shop">
        <Reveal
          as="ul"
          stagger
          className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {INGREDIENTS.map((ingredient) => (
            <li key={ingredient.slug}>
              <IngredientCard ingredient={ingredient} headingLevel="h2" />
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
