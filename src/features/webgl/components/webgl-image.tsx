"use client";

import dynamic from "next/dynamic";
import Image, { type ImageProps } from "next/image";
import { useRef, useState, useSyncExternalStore } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { isWebGLAvailable } from "@/lib/three/renderer";
import { cn } from "@/utils/cn";

const ImageDistortionScene = dynamic(() => import("./image-distortion-scene"), { ssr: false });

const subscribeNever = () => () => {};

type WebglImageProps = Omit<ImageProps, "fill" | "ref" | "onLoad"> & {
  /** Effect intensity passed to the shader. */
  strength?: number;
  /** Classes for the wrapper. It must be positioned (relative/absolute) by the caller. */
  className?: string;
  imageClassName?: string;
};

/**
 * Responsive cover image that upgrades to a WebGL distortion scene when possible.
 * The <img> stays as LCP element and as fallback (no WebGL, reduced motion).
 */
export function WebglImage({
  alt,
  strength,
  className,
  imageClassName,
  ...imageProps
}: WebglImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageReady, setImageReady] = useState(false);
  const reducedMotion = useReducedMotion();
  const webgl = useSyncExternalStore(subscribeNever, isWebGLAvailable, () => false);

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      <Image
        ref={imageRef}
        alt={alt}
        fill
        {...imageProps}
        onLoad={() => setImageReady(true)}
        className={cn("object-cover", imageClassName)}
      />
      {webgl && !reducedMotion && imageReady ? (
        <ImageDistortionScene containerRef={containerRef} imageRef={imageRef} strength={strength} />
      ) : null}
    </div>
  );
}
