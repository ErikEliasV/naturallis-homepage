import { SITE } from "@/constants/site";

/** Prefixes a root-relative path with the deployment base path. */
export function withBasePath(path: string): string {
  return path.startsWith("/") ? `${SITE.basePath}${path}` : path;
}

/** Removes the deployment base path from a pathname (for router navigation). */
export function stripBasePath(pathname: string): string {
  if (!SITE.basePath || !pathname.startsWith(SITE.basePath)) return pathname;
  return pathname.slice(SITE.basePath.length) || "/";
}

/** Absolute URL of a site path, keeping the base path of `SITE.url`. */
export function absoluteUrl(path: string): string {
  return `${SITE.url.replace(/\/$/, "")}${path}`;
}

/** Absolute URL of a page, with the trailing slash used by the static export. */
export function absolutePageUrl(path: string): string {
  return absoluteUrl(path.endsWith("/") ? path : `${path}/`);
}
