import type { Metadata } from "next";

import { CollectionPage } from "@/components/sections/shop/collection-page";
import { PRODUCTS } from "@/constants/products";

const DESCRIPTION =
  "Fórmulas manipuladas, suplementos e produtos selecionados para cada momento da sua rotina de cuidado.";

export const metadata: Metadata = {
  title: "Produtos",
  description: DESCRIPTION,
};

export default function ProductsPage() {
  return (
    <CollectionPage
      title="Produtos"
      description={DESCRIPTION}
      breadcrumbs={[{ label: "Início", href: "/" }, { label: "Produtos" }]}
      products={PRODUCTS}
      showCategories
    />
  );
}
