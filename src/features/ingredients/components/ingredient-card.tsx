import Image from "next/image";

import { type Ingredient } from "@/constants/ingredients";
import { cn } from "@/utils/cn";

type IngredientCardProps = {
  ingredient: Ingredient;
  headingLevel?: "h2" | "h3" | "h4";
  className?: string;
};

/** Ingredient tile from the Figma "IconBoxesSlider" (280 × 288). */
export function IngredientCard({
  ingredient,
  headingLevel = "h3",
  className,
}: IngredientCardProps) {
  const Heading = headingLevel;
  return (
    <article
      className={cn(
        "flex h-full flex-col items-center gap-2.5 overflow-hidden rounded-tile bg-surface px-4 pt-6 pb-8 text-center",
        className,
      )}
    >
      <Image src={ingredient.image} alt="" width={80} height={80} className="size-20" />
      <div className="flex flex-col gap-3">
        <Heading className="font-display text-heading-md">{ingredient.name}</Heading>
        <p className="text-body-md text-black/70">{ingredient.description}</p>
      </div>
    </article>
  );
}
