import Image from "next/image";
import Link from "next/link";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { LayeredIcon } from "@/components/ui/layered-icon";
import { type Category, categoryHref } from "@/constants/categories";
import { TESTIMONIALS } from "@/constants/home";
import { ICON_CHEVRON_SMALL, ICON_STORE } from "@/constants/icons";
import { PRODUCT_GALLERY, PURCHASE_PERKS } from "@/constants/product-page";
import { BESTSELLERS, PRODUCTS, productHref } from "@/constants/products";
import { SITE } from "@/constants/site";
import { ProductBottle } from "@/features/catalog/components/product-bottle";
import { type Product } from "@/features/catalog/types";
import { Reveal } from "@/features/motion/components/reveal";
import { RevealText } from "@/features/motion/components/reveal-text";
import { AddToCartIconButton } from "@/features/product/components/add-to-cart-icon-button";
import { ComparisonTable } from "@/features/product/components/comparison-table";
import { ProductGallery } from "@/features/product/components/product-gallery";
import { ProductPurchase } from "@/features/product/components/product-purchase";
import { ProductShare } from "@/features/product/components/product-share";
import { formatPrice } from "@/utils/format-price";

const SECTION_TITLE = "font-display text-heading-lg";
const ACCORDION_TRIGGER = "py-5 font-display text-heading-lg";

function relatedProducts(product: Product): Product[] {
  const sameCategory = PRODUCTS.filter(
    (item) => item.category === product.category && item.slug !== product.slug,
  );
  const fallback = BESTSELLERS.filter((item) => item.slug !== product.slug);
  return [...sameCategory, ...fallback]
    .filter((item, index, list) => list.indexOf(item) === index)
    .slice(0, 2);
}

function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: SITE.name },
    category: product.kind,
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: product.price.toFixed(2),
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };
}

type ProductPageProps = {
  product: Product;
  category: Category;
};

/** Product detail page (Figma "Pure Balance – Pebble Wellina"). */
export function ProductPage({ product, category }: ProductPageProps) {
  const onSale = product.compareAtPrice !== undefined;
  const related = relatedProducts(product);

  return (
    <main className="flex flex-col pt-header-space text-body">
      <Container
        width="shop"
        className="grid gap-10 pb-section lg:grid-cols-[784fr_656fr] lg:gap-0"
      >
        <ProductGallery product={product} images={PRODUCT_GALLERY} />

        <div className="flex flex-col gap-6 lg:pr-5 lg:pl-17.5">
          <Breadcrumbs
            items={[
              { label: "Início", href: "/" },
              { label: "Produtos", href: "/produtos" },
              { label: category.name, href: categoryHref(category.slug) },
              { label: product.name },
            ]}
          />

          <div className="flex flex-col items-start gap-3">
            {product.badge ? (
              <Badge tone={product.badge === "promo" ? "promo" : "sage"} size="sm">
                {product.badge === "promo" ? "Promoção" : "Mais Vendidos"}
              </Badge>
            ) : null}
            <RevealText as="h1" trigger="mount" className="font-display text-heading-xl">
              {product.name}
            </RevealText>
            <p className="flex flex-wrap items-baseline gap-x-3 text-heading-lg">
              <span className={onSale ? "text-promo" : undefined}>
                {onSale ? <span className="sr-only">Preço promocional: </span> : null}
                {formatPrice(product.price)}
              </span>
              {onSale ? (
                <s className="text-body text-faint">
                  <span className="sr-only">Preço anterior: </span>
                  {formatPrice(product.compareAtPrice ?? 0)}
                </s>
              ) : null}
            </p>
            <p className="text-black/70">{product.description}</p>
          </div>

          <ProductPurchase product={product} />

          <ul className="flex justify-around gap-10 text-center">
            {PURCHASE_PERKS.map((perk) => (
              <li key={perk.label} className="flex flex-col items-center gap-2">
                <LayeredIcon layers={perk.icon} className="size-8" />
                {perk.label}
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between gap-3 rounded-sm border border-black/10 px-3 py-4">
            <div className="flex items-start gap-3">
              <LayeredIcon layers={ICON_STORE} className="size-8" />
              <div className="flex flex-col gap-1">
                <p className="font-display text-heading-sm">
                  Retirada disponível na loja Naturallis
                </p>
                <p className="text-black/70">Geralmente fica pronto em 24 horas</p>
              </div>
            </div>
            <Link
              href="/contato"
              aria-label="Ver informações da loja"
              className="flex size-7.5 shrink-0 items-center justify-center rounded-pill bg-mist transition-colors duration-300 ease-power3-out hover:bg-lime"
            >
              <LayeredIcon layers={ICON_CHEVRON_SMALL} className="size-3" />
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className={SECTION_TITLE}>Vídeos de clientes</h2>
            <ul className="flex flex-wrap gap-4">
              {TESTIMONIALS.map((testimonial) => (
                <li key={testimonial.title}>
                  <Link
                    href="/#depoimentos"
                    aria-label={`Ver depoimento: ${testimonial.title}`}
                    className="block size-19.5 rounded-pill border border-black/10 p-0.75 transition-colors duration-300 ease-power3-out hover:border-black"
                  >
                    <span className="relative block size-full overflow-hidden rounded-pill">
                      <Image
                        src={testimonial.poster}
                        alt=""
                        fill
                        sizes="4.5rem"
                        className="object-cover"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Accordion
              title="Detalhes do produto"
              defaultOpen
              icon="chevron"
              headingLevel="h2"
              triggerClassName="pb-5 font-display text-heading-lg"
              contentClassName="pb-5"
            >
              <p className="pb-6">{product.description}</p>
              <ul className="list-disc pl-6">
                {product.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </Accordion>
            <Accordion
              title="Principais ingredientes"
              icon="chevron"
              headingLevel="h2"
              triggerClassName={ACCORDION_TRIGGER}
              contentClassName="pb-5"
            >
              <p>{product.ingredients}</p>
            </Accordion>
            <Accordion
              title="Modo de uso"
              icon="chevron"
              headingLevel="h2"
              triggerClassName={ACCORDION_TRIGGER}
              contentClassName="pb-5"
            >
              <p>{product.howToUse}</p>
            </Accordion>
          </div>

          <ProductShare productName={product.name} />

          {related.length > 0 ? (
            <div className="flex flex-col gap-5">
              <h2 className={SECTION_TITLE}>Complete sua rotina</h2>
              <Reveal as="ul" stagger className="flex flex-col gap-2.5">
                {related.map((item) => (
                  <li
                    key={item.slug}
                    className="flex items-center gap-4 rounded-sm bg-surface p-3 pr-5"
                  >
                    <Link
                      href={productHref(item)}
                      aria-label={item.name}
                      className="flex size-32.5 shrink-0 items-center justify-center rounded-sm bg-surface"
                    >
                      <ProductBottle product={item} sizes="4rem" className="w-[36%]" />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <Link href={productHref(item)} className="font-medium hover:underline">
                        {item.name}
                      </Link>
                      <p>{formatPrice(item.price)}</p>
                    </div>
                    <AddToCartIconButton product={item} />
                  </li>
                ))}
              </Reveal>
            </div>
          ) : null}
        </div>
      </Container>

      <ComparisonTable productName={product.name} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd(product)).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}
