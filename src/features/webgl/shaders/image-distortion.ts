/**
 * Full-screen image plane.
 * - Mouse: a soft lens ripple around the pointer (uHover fades it in and out).
 * - Scroll: slow zoom, upward drift and a slight RGB split as the section leaves.
 * - Film grain keeps the photo alive while idle.
 * Colors pass through untouched (texture uses NoColorSpace) so the canvas matches the <img>.
 */

export const IMAGE_DISTORTION_VERTEX = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const IMAGE_DISTORTION_FRAGMENT = /* glsl */ `
  precision highp float;

  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;
  uniform vec2 uMouse;
  uniform float uHover;
  uniform float uScroll;
  uniform float uTime;
  uniform float uStrength;
  uniform float uGrain;

  varying vec2 vUv;

  vec2 coverUv(vec2 uv, vec2 resolution, vec2 imageResolution) {
    float screenRatio = resolution.x / resolution.y;
    float imageRatio = imageResolution.x / imageResolution.y;
    vec2 scale = screenRatio < imageRatio
      ? vec2(screenRatio / imageRatio, 1.0)
      : vec2(1.0, imageRatio / screenRatio);
    return (uv - 0.5) * scale + 0.5;
  }

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 uv = vUv;

    float zoom = 1.0 - uScroll * 0.12 * uStrength;
    uv = (uv - 0.5) * zoom + 0.5;
    uv.y += uScroll * 0.06 * uStrength;

    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 toMouse = (uv - uMouse) * aspect;
    float dist = length(toMouse);
    float lens = smoothstep(0.32, 0.0, dist) * uHover;
    float ripple = sin(dist * 28.0 - uTime * 2.4) * 0.5 + 0.5;
    uv -= (toMouse / max(dist, 1e-4)) / aspect * lens * (0.012 + 0.008 * ripple) * uStrength;

    vec2 imageUv = coverUv(uv, uResolution, uImageResolution);
    float split = (0.0025 * lens + 0.004 * uScroll) * uStrength;

    vec3 color = vec3(
      texture2D(uTexture, imageUv + vec2(split, 0.0)).r,
      texture2D(uTexture, imageUv).g,
      texture2D(uTexture, imageUv - vec2(split, 0.0)).b
    );

    color += (hash(vUv * uResolution + fract(uTime)) - 0.5) * uGrain;

    gl_FragColor = vec4(color, 1.0);
  }
`;
