import Image from "next/image";

import { Parallax } from "@/features/motion/components/parallax";
import { RevealText } from "@/features/motion/components/reveal-text";

type CategoryBannerProps = {
  title: string;
  description: string;
};

/** Collection header (Figma "ParallaxComponent", 1440 × 330). */
export function CategoryBanner({ title, description }: CategoryBannerProps) {
  return (
    <div className="relative isolate flex min-h-shop-banner items-center justify-center overflow-hidden rounded-tile bg-black/20 px-6 py-12 text-center text-white">
      <Parallax
        speed={0.1}
        className="absolute inset-0 -z-10"
        innerClassName="absolute inset-x-0 -inset-y-[15%]"
      >
        <Image
          src="/images/categoria-banner.jpg"
          alt=""
          fill
          preload
          sizes="(min-width: 90rem) 90rem, 100vw"
          className="object-cover"
        />
      </Parallax>
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/20" />
      <div className="max-w-[43.3em] text-body">
        <RevealText as="h1" trigger="mount" className="font-display text-heading-xl">
          {title}
        </RevealText>
        <RevealText as="p" trigger="mount" delay={0.15} className="pt-4">
          {description}
        </RevealText>
      </div>
    </div>
  );
}
