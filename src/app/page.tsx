import { HomeHero } from "@/components/sections/home/home-hero";
import { HomeProducts } from "@/components/sections/home/home-products";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <HomeHero />
      <HomeProducts />
    </main>
  );
}
