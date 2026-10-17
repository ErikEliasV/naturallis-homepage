import { WebGLRenderer } from "three";

/** Device pixel ratio ceilings: full quality on desktop, lighter on touch devices. */
export const MAX_DPR = { desktop: 2, mobile: 1.25 } as const;

let webglSupport: boolean | undefined;

/** Cached WebGL capability check (client only). */
export function isWebGLAvailable(): boolean {
  if (webglSupport !== undefined) return webglSupport;
  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    webglSupport = Boolean(context);
    context?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}

type CreateRendererOptions = {
  maxDpr: number;
};

/** Transparent renderer bound to an existing canvas, with a capped pixel ratio. */
export function createRenderer(canvas: HTMLCanvasElement, { maxDpr }: CreateRendererOptions) {
  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxDpr));
  return renderer;
}
