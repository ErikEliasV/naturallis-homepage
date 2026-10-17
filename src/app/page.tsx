import { HomeCare } from "@/components/sections/home/home-care";
import { HomeCategories } from "@/components/sections/home/home-categories";
import { HomeHero } from "@/components/sections/home/home-hero";
import { HomeIngredients } from "@/components/sections/home/home-ingredients";
import { HomeProducts } from "@/components/sections/home/home-products";
import { HomeSkinLine } from "@/components/sections/home/home-skin-line";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <HomeHero />
      <HomeProducts />
      <HomeSkinLine />
      <HomeCare />
      <HomeIngredients />
      <HomeCategories />
    </main>
  );
}
