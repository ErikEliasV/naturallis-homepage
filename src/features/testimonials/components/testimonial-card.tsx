"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { type Testimonial } from "@/constants/home";
import { FROSTED_GLASS } from "@/constants/surfaces";
import { HoverLift } from "@/features/cursor/components/hover-lift";
import { withBasePath } from "@/utils/base-path";
import { cn } from "@/utils/cn";

/** Video testimonial card (Figma "VideoCard", 473 × 631) with a frosted caption bar. */
export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  return (
    <figure
      data-hover-root
      className="relative isolate aspect-[473/631] overflow-hidden rounded-tile bg-black/5"
    >
      <HoverLift y={0} scale={1.04} className="absolute inset-0 -z-10">
        <Image
          src={testimonial.poster}
          alt=""
          fill
          sizes="(min-width: 64rem) 25vw, 75vw"
          className="object-cover"
        />
      </HoverLift>

      {testimonial.video ? (
        <>
          <video
            ref={videoRef}
            src={withBasePath(testimonial.video)}
            poster={withBasePath(testimonial.poster)}
            playsInline
            controls={playing}
            onEnded={() => setPlaying(false)}
            className={cn("absolute inset-0 -z-10 size-full object-cover", !playing && "invisible")}
          />
          {!playing ? (
            <button
              type="button"
              aria-label={`Assistir depoimento: ${testimonial.title}`}
              onClick={() => {
                setPlaying(true);
                void videoRef.current?.play();
              }}
              className="absolute top-5 right-5 flex size-9 items-center justify-center rounded-pill bg-white drop-shadow-chip focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span
                aria-hidden
                className="ml-0.5 border-y-[6px] border-l-[9px] border-y-transparent border-l-black"
              />
            </button>
          ) : null}
        </>
      ) : null}

      <figcaption
        className={cn(
          FROSTED_GLASS,
          "absolute inset-x-0 bottom-0 min-h-26.5 p-5 text-white",
          playing && "hidden",
        )}
      >
        <span
          aria-hidden
          className="absolute inset-x-0 top-1 h-px bg-[linear-gradient(90deg,rgb(255_255_255/0.5),rgb(255_255_255/0.1),rgb(255_255_255/0.5))]"
        />
        <p className="pr-15 font-display text-heading-lg">{testimonial.title}</p>
        <blockquote className="mt-1 text-body-md">“{testimonial.quote}”</blockquote>
        {testimonial.avatar ? (
          <Image
            src={testimonial.avatar}
            alt=""
            width={60}
            height={60}
            className="absolute -top-7.5 right-5 size-15 rounded-pill object-cover shadow-avatar"
          />
        ) : null}
      </figcaption>
    </figure>
  );
}
