import type { MetadataRoute } from "next";

import { SITE } from "@/constants/site";
import { withBasePath } from "@/utils/base-path";

/** Generated once at build time (static export). */
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.name,
    description: SITE.description,
    start_url: withBasePath("/"),
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0b2a1b",
    lang: "pt-BR",
    icons: [{ src: withBasePath("/icon.svg"), sizes: "any", type: "image/svg+xml" }],
  };
}
