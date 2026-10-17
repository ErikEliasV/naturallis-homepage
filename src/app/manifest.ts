import type { MetadataRoute } from "next";

import { SITE } from "@/constants/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0b2a1b",
    lang: "pt-BR",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
