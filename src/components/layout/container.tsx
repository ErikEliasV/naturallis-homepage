import { type ComponentPropsWithoutRef, type ElementType } from "react";

import { cn } from "@/utils/cn";

type ContainerProps<T extends ElementType> = {
  as?: T;
  /** `content`: 1760px (Home, 1920 frame). `shop`: 1440px (category and product pages). */
  width?: "content" | "shop";
} & Omit<ComponentPropsWithoutRef<T>, "as">;

const WIDTHS = {
  content: "max-w-[calc(var(--container-content)+2*var(--spacing-gutter))]",
  shop: "max-w-[calc(var(--container-shop)+2*var(--spacing-gutter))]",
} as const;

/** Centers content with the page gutter; the max width excludes the gutter. */
export function Container<T extends ElementType = "div">({
  as,
  width = "content",
  className,
  ...props
}: ContainerProps<T>) {
  const Component: ElementType = as ?? "div";
  return (
    <Component className={cn("mx-auto w-full px-gutter", WIDTHS[width], className)} {...props} />
  );
}
