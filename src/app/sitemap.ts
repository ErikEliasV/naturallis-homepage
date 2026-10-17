import type { MetadataRoute } from "next";

import { CATEGORIES, categoryHref } from "@/constants/categories";
import { PRODUCTS, productHref } from "@/constants/products";
import { SITE } from "@/constants/site";

const PAGES = ["/", "/produtos", "/formulas", "/ingredientes", "/a-naturallis", "/contato"];

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, SITE.url).toString();
  return [
    ...PAGES.map((path) => ({ url: url(path), priority: path === "/" ? 1 : 0.8 })),
    ...CATEGORIES.map((category) => ({ url: url(categoryHref(category.slug)), priority: 0.7 })),
    ...PRODUCTS.map((product) => ({ url: url(productHref(product)), priority: 0.6 })),
  ];
}
