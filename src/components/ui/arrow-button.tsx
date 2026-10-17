import Image from "next/image";
import { type ComponentPropsWithoutRef } from "react";

import { Magnetic } from "@/features/cursor/components/magnetic";
import { cn } from "@/utils/cn";

type ArrowButtonProps = Omit<ComponentPropsWithoutRef<"button">, "children"> & {
  direction: "prev" | "next";
  label: string;
};

/** Circular outlined arrow used by the carousels. */
export function ArrowButton({
  direction,
  label,
  className,
  type = "button",
  ...props
}: ArrowButtonProps) {
  return (
    <Magnetic>
      <button
        type={type}
        aria-label={label}
        className={cn(
          "inline-flex size-arrow-button shrink-0 items-center justify-center rounded-pill border-[1.5px] border-black bg-white transition-colors duration-300 ease-power3-out hover:bg-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest disabled:opacity-40",
          className,
        )}
        {...props}
      >
        <Image
          src="/icons/chevron-right.svg"
          alt=""
          width={39}
          height={39}
          className={cn("size-[65%]", direction === "prev" && "rotate-180")}
        />
      </button>
    </Magnetic>
  );
}
