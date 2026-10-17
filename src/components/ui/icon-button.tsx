import Link from "next/link";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";

import { cn } from "@/utils/cn";

export type IconButtonTone = "forest" | "ink";

const TONES: Record<IconButtonTone, string> = {
  forest: "bg-forest hover:bg-ink",
  ink: "bg-ink hover:bg-forest",
};

const BASE =
  "inline-flex size-icon-button shrink-0 items-center justify-center rounded-icon transition-colors duration-300 ease-power3-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";

type IconButtonStyleProps = {
  /** Accessible name: icon-only controls must always describe their action. */
  label: string;
  tone?: IconButtonTone;
  className?: string;
  children: ReactNode;
};

type IconButtonProps = IconButtonStyleProps &
  (
    | (Omit<ComponentPropsWithoutRef<typeof Link>, keyof IconButtonStyleProps> & { href: string })
    | (Omit<ComponentPropsWithoutRef<"button">, keyof IconButtonStyleProps> & {
        href?: undefined;
      })
  );

/** Rounded-square icon control (cart, account) from the Figma header and product cards. */
export function IconButton(props: IconButtonProps) {
  if (props.href !== undefined) {
    const { label, tone = "forest", className, children, ...linkProps } = props;
    return (
      <Link aria-label={label} className={cn(BASE, TONES[tone], className)} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { label, tone = "forest", className, children, type = "button", ...buttonProps } = props;
  return (
    <button
      type={type}
      aria-label={label}
      className={cn(BASE, TONES[tone], className)}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
