import { type ComponentPropsWithoutRef, type ElementType } from "react";

import { cn } from "@/utils/cn";

type ContainerProps<T extends ElementType> = {
  as?: T;
  /** `content`: 1760px (Home, 1920 frame). `shop`: 1440px (category and product pages). */
  width?: "content" | "shop";
} & Omit<ComponentPropsWithoutRef<T>, "as">;

const WIDTHS = {
  content: "max-w-content",
  shop: "max-w-shop",
} as const;

/** Centers content with the page gutter; max width applies to the content box. */
export function Container<T extends ElementType = "div">({
  as,
  width = "content",
  className,
  ...props
}: ContainerProps<T>) {
  const Component: ElementType = as ?? "div";
  return (
    <Component
      className={cn("mx-auto box-content w-auto px-gutter", WIDTHS[width], className)}
      {...props}
    />
  );
}
