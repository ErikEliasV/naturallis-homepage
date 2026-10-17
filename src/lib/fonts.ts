import { Geist, Instrument_Serif } from "next/font/google";
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

export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
});

export const FONT_VARIABLES = [nohemi, sfPro, geist, instrumentSerif]
  .map((font) => font.variable)
  .join(" ");
