import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CollectionPage } from "@/components/sections/shop/collection-page";
import { CATEGORIES } from "@/constants/categories";
import { productsByCategory } from "@/constants/products";

function findCategory(slug: string) {
  return CATEGORIES.find((category) => category.slug === slug);
}

/** Only the generated pages exist in the static export. */
export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ categoria: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/produtos/[categoria]">): Promise<Metadata> {
  const category = findCategory((await params).categoria);
  if (!category) return {};
  return { title: category.name, description: category.description };
}

export default async function CategoryPage({ params }: PageProps<"/produtos/[categoria]">) {
  const category = findCategory((await params).categoria);
  if (!category) notFound();

  return (
    <CollectionPage
      title={category.name}
      description={category.description}
      breadcrumbs={[
        { label: "Início", href: "/" },
        { label: "Produtos", href: "/produtos" },
        { label: category.name },
      ]}
      products={productsByCategory(category.slug)}
    />
  );
}
