"use client";

import { type RefObject, useEffect, useRef } from "react";
import {
  LinearFilter,
  Mesh,
  NoColorSpace,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  type Texture,
  TextureLoader,
  Vector2,
} from "three";

import { DURATION, EASE, MEDIA_QUERY } from "@/constants/motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { createRenderer, MAX_DPR } from "@/lib/three/renderer";

import { IMAGE_DISTORTION_FRAGMENT, IMAGE_DISTORTION_VERTEX } from "../shaders/image-distortion";

export type ImageDistortionSceneProps = {
  containerRef: RefObject<HTMLElement | null>;
  imageRef: RefObject<HTMLImageElement | null>;
  /** Scales every effect (lens, zoom, split). */
  strength?: number;
};

/**
 * WebGL twin of the fallback <img>: same cover crop, plus pointer and scroll distortion.
 * Renders on the GSAP ticker only while visible; on touch devices it renders on demand.
 */
export default function ImageDistortionScene({
  containerRef,
  imageRef,
  strength = 1,
}: ImageDistortionSceneProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const container = containerRef.current;
    const image = imageRef.current;
    if (!host || !container || !image) return;

    // A fresh canvas per mount: a canvas whose context was lost cannot be reused.
    const canvas = document.createElement("canvas");
    canvas.className = "absolute inset-0 size-full";
    canvas.style.visibility = "hidden";
    host.appendChild(canvas);

    const finePointer = window.matchMedia(MEDIA_QUERY.pointerMotion).matches;
    const renderer = createRenderer(canvas, {
      maxDpr: finePointer ? MAX_DPR.desktop : MAX_DPR.mobile,
    });
    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new PlaneGeometry(2, 2);
    const uniforms = {
      uTexture: { value: null as Texture | null },
      uResolution: { value: new Vector2(1, 1) },
      uImageResolution: { value: new Vector2(1, 1) },
      uMouse: { value: new Vector2(0.5, 0.5) },
      uHover: { value: 0 },
      uScroll: { value: 0 },
      uTime: { value: 0 },
      uStrength: { value: strength },
      uGrain: { value: finePointer ? 0.035 : 0 },
    };
    const material = new ShaderMaterial({
      vertexShader: IMAGE_DISTORTION_VERTEX,
      fragmentShader: IMAGE_DISTORTION_FRAGMENT,
      uniforms,
    });
    scene.add(new Mesh(geometry, material));

    let texture: Texture | undefined;
    let disposed = false;
    const render = () => {
      if (uniforms.uTexture.value) renderer.render(scene, camera);
    };

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      renderer.setSize(width, height, false);
      uniforms.uResolution.value.set(width, height);
      render();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    new TextureLoader().load(image.currentSrc || image.src, (loaded) => {
      if (disposed) {
        loaded.dispose();
        return;
      }
      loaded.colorSpace = NoColorSpace;
      loaded.minFilter = LinearFilter;
      loaded.generateMipmaps = false;
      texture = loaded;
      const source = loaded.image as { width: number; height: number };
      uniforms.uTexture.value = loaded;
      uniforms.uImageResolution.value.set(source.width, source.height);
      render();
      gsap.to(canvas, { autoAlpha: 1, duration: DURATION.enter, ease: EASE.out });
    });

    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => {
        uniforms.uScroll.value = self.progress;
        if (!finePointer) render();
      },
    });

    const pointer = { x: 0.5, y: 0.5, hover: 0 };
    const follow = { duration: DURATION.enterShort, ease: EASE.out };
    const toX = gsap.quickTo(pointer, "x", follow);
    const toY = gsap.quickTo(pointer, "y", follow);
    const toHover = gsap.quickTo(pointer, "hover", follow);
    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      toX((event.clientX - rect.left) / rect.width);
      toY(1 - (event.clientY - rect.top) / rect.height);
      toHover(1);
    };
    const onPointerLeave = () => toHover(0);
    if (finePointer) {
      container.addEventListener("pointermove", onPointerMove);
      container.addEventListener("pointerleave", onPointerLeave);
    }

    const tick = (time: number) => {
      uniforms.uTime.value = time;
      uniforms.uMouse.value.set(pointer.x, pointer.y);
      uniforms.uHover.value = pointer.hover;
      render();
    };
    let running = false;
    const setRunning = (value: boolean) => {
      if (!finePointer || value === running) return;
      running = value;
      if (value) gsap.ticker.add(tick);
      else gsap.ticker.remove(tick);
    };
    const visibility = new IntersectionObserver(([entry]) =>
      setRunning(Boolean(entry?.isIntersecting)),
    );
    visibility.observe(container);

    return () => {
      disposed = true;
      setRunning(false);
      visibility.disconnect();
      resizeObserver.disconnect();
      scrollTrigger.kill();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      gsap.killTweensOf([pointer, canvas]);
      texture?.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    };
  }, [containerRef, imageRef, strength]);

  return <div ref={hostRef} aria-hidden className="pointer-events-none absolute inset-0" />;
}
