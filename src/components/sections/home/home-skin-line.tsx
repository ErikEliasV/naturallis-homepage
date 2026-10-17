import Link from "next/link";

import { Container } from "@/components/layout/container";
import { categoryHref } from "@/constants/categories";
import { Reveal } from "@/features/motion/components/reveal";
import { WebglImage } from "@/features/webgl/components/webgl-image";

/** "Linha Skin Line" banner (Figma "Group 1"): rounded photo with a WebGL hover effect. */
export function HomeSkinLine() {
  return (
    <section aria-label="Linha Skin Line" className="pb-section">
      <Container>
        <Reveal y={60}>
          <Link
            href={categoryHref("skin-care")}
            data-cursor-label="Ver linha"
            className="relative isolate block aspect-[4/5] overflow-hidden rounded-banner focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest sm:aspect-[1761/899]"
          >
            <div className="absolute top-[-38.61%] left-[-6.4%] -z-10 h-[161.7%] w-[109.22%]">
              <WebglImage
                src="/images/skin-line.png"
                alt="Frascos âmbar da linha Skin Line: óleos, séruns e manteiga corporal"
                sizes="(min-width: 64rem) 100vw, 160vw"
                strength={0.6}
                className="absolute inset-0"
              />
            </div>
            <span className="absolute bottom-banner-inset left-banner-inset inline-flex h-pill-lg items-center rounded-pill bg-stone px-pill-pad text-pill-lg text-white">
              Linha Skin Line
            </span>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
