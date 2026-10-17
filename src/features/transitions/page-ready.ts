/**
 * "Page ready" signal shared by the preloader, the page transition and entrance animations.
 * Entrance animations wait for it so they play as the page is uncovered, not underneath.
 */

type Listener = () => void;

/** Dispatched on `window` when the preloader overlay is gone. */
export const PRELOADER_DONE_EVENT = "naturallis:preloader-done";

let ready = false;
const listeners = new Set<Listener>();

/** Runs `callback` once the page is uncovered (immediately if it already is). */
export function whenPageReady(callback: Listener): () => void {
  if (ready) {
    callback();
    return () => {};
  }
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

export function setPageReady(value: boolean): void {
  ready = value;
  if (!value) return;
  const pending = [...listeners];
  listeners.clear();
  pending.forEach((listener) => listener());
}
