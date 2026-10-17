import type { MetadataRoute } from "next";

import { CATEGORIES, categoryHref } from "@/constants/categories";
import { PRODUCTS, productHref } from "@/constants/products";
import { absolutePageUrl } from "@/utils/base-path";

const PAGES = ["/", "/produtos", "/formulas", "/ingredientes", "/a-naturallis", "/contato"];

/** Generated once at build time (static export). */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.map((path) => ({ url: absolutePageUrl(path), priority: path === "/" ? 1 : 0.8 })),
    ...CATEGORIES.map((category) => ({
      url: absolutePageUrl(categoryHref(category.slug)),
      priority: 0.7,
    })),
    ...PRODUCTS.map((product) => ({ url: absolutePageUrl(productHref(product)), priority: 0.6 })),
  ];
}
