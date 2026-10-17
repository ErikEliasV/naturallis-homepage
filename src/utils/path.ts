/** Removes the trailing slash added by `trailingSlash: true` (keeps the root "/"). */
export function normalizePath(path: string): string {
  return path.length > 1 ? path.replace(/\/$/, "") : path;
}

/** Whether a pathname points to the same page as a link href. */
export function isCurrentPath(pathname: string, href: string): boolean {
  return normalizePath(pathname) === normalizePath(href);
}
