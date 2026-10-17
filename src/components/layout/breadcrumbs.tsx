import Link from "next/link";

import { cn } from "@/utils/cn";

export type Crumb = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: readonly Crumb[];
  className?: string;
};

/** Trail of links to the current page (Figma "Navigation - breadcrumbs"). */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Trilha de navegação" className={cn("font-geist text-body-sm", className)}>
      <ol className="flex flex-wrap items-center gap-3">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-3">
            {index > 0 ? (
              <span aria-hidden className="text-black/40">
                /
              </span>
            ) : null}
            {item.href ? (
              <Link
                href={item.href}
                className="transition-opacity duration-300 ease-power3-out hover:opacity-60"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-black/70">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
