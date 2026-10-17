import type { MetadataRoute } from "next";

import { absoluteUrl, withBasePath } from "@/utils/base-path";

/** Generated once at build time (static export). */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [withBasePath("/carrinho/"), withBasePath("/conta/")],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
