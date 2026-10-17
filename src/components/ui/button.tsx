import Link from "next/link";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";

import { Magnetic } from "@/features/cursor/components/magnetic";
import { RollLabel } from "@/features/cursor/components/roll-label";
import { cn } from "@/utils/cn";

export type ButtonVariant = "primary" | "light" | "mist" | "lime" | "ink" | "ghost";
export type ButtonSize = "lg" | "md" | "sm" | "shop";

const BASE =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-pill font-medium whitespace-nowrap transition-colors duration-300 ease-power3-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest disabled:pointer-events-none disabled:opacity-50";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-forest text-white hover:bg-ink",
  light: "bg-cloud text-graphite hover:bg-mist",
  mist: "bg-mist text-graphite hover:bg-cloud",
  lime: "bg-lime text-black hover:bg-ink hover:text-white",
  ink: "bg-ink text-white hover:bg-forest",
  ghost: "bg-transparent text-graphite hover:bg-mist",
};

const SIZES: Record<ButtonSize, string> = {
  lg: "h-control-lg px-pad-lg text-button-lg",
  md: "h-control-md px-pad-md text-nav",
  sm: "h-control-sm px-pad-sm text-label",
  shop: "h-control-shop px-6 text-button",
};

type ButtonStyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Follows the pointer on desktop. Defaults to true. */
  magnetic?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsLinkProps = ButtonStyleProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof ButtonStyleProps> & { href: string };

type ButtonAsButtonProps = ButtonStyleProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof ButtonStyleProps> & { href?: undefined };

export type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

export function buttonClassName(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "lg",
  className?: string,
) {
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}

/** Pill button from the Figma design system. Renders a Next link when `href` is set. */
export function Button(props: ButtonProps) {
  let element: ReactNode;

  if (props.href !== undefined) {
    const { variant, size, magnetic, className, children, ...linkProps } = props;
    element = (
      <Link className={buttonClassName(variant, size, className)} {...linkProps}>
        <RollLabel>{children}</RollLabel>
      </Link>
    );
  } else {
    const { variant, size, magnetic, className, children, type = "button", ...buttonProps } = props;
    element = (
      <button type={type} className={buttonClassName(variant, size, className)} {...buttonProps}>
        <RollLabel>{children}</RollLabel>
      </button>
    );
  }

  return props.magnetic === false ? element : <Magnetic>{element}</Magnetic>;
}
