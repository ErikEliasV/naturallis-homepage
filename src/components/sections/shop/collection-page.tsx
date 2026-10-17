import { Breadcrumbs, type Crumb } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { CategoryBanner } from "@/features/catalog/components/category-banner";
import { Collection } from "@/features/catalog/components/collection";
import { type Product } from "@/features/catalog/types";

type CollectionPageProps = {
  title: string;
  description: string;
  breadcrumbs: readonly Crumb[];
  products: readonly Product[];
  showCategories?: boolean;
};

/** Category / all-products page layout (Figma "Skin – Pebble Wellina"). */
export function CollectionPage({
  title,
  description,
  breadcrumbs,
  products,
  showCategories = false,
}: CollectionPageProps) {
  return (
    <main className="flex flex-col pt-header-space pb-section">
      <Container width="shop">
        <Breadcrumbs items={breadcrumbs} className="py-4" />
        <CategoryBanner title={title} description={description} />
        <div className="pt-10">
          <Collection products={products} showCategories={showCategories} />
        </div>
      </Container>
    </main>
  );
}
