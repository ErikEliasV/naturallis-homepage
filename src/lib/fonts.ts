import { Geist, Montserrat } from "next/font/google";
import localFont from "next/font/local";

export const nohemi = localFont({
  src: [
    { path: "../../public/fonts/nohemi/nohemi-regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/nohemi/nohemi-medium.otf", weight: "500", style: "normal" },
  ],
  variable: "--font-nohemi",
  display: "swap",
});

export const sfPro = localFont({
  src: [
    {
      path: "../../public/fonts/sf-pro-display/sf-pro-display-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/sf-pro-display/sf-pro-display-medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-sf-pro",
  display: "swap",
});

/** Fallback for SF Pro in `--font-sans` only, so it is not preloaded. */
export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
  preload: false,
});

/** Only used on the product bottle label, as in the Figma mockup. */
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-montserrat",
  display: "swap",
});

export const FONT_VARIABLES = [nohemi, sfPro, geist, montserrat]
  .map((font) => font.variable)
  .join(" ");
