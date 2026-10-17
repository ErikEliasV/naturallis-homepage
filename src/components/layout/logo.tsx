import Image from "next/image";

import { cn } from "@/utils/cn";

const LOGO_SRC = {
  dark: "/brand/logo-dark.svg",
  light: "/brand/logo-light.svg",
} as const;

type LogoProps = {
  /** `dark` for light backgrounds, `light` for dark backgrounds. */
  tone: keyof typeof LOGO_SRC;
  className?: string;
  preload?: boolean;
};

/** Naturallis wordmark exported from Figma (210 × 46.6). Decorative: label the wrapping link. */
export function Logo({ tone, className, preload = false }: LogoProps) {
  return (
    <Image
      src={LOGO_SRC[tone]}
      alt=""
      width={210}
      height={47}
      preload={preload}
      className={cn("h-auto w-full", className)}
    />
  );
}
