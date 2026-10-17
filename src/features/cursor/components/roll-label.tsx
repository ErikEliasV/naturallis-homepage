import { type ReactNode } from "react";

/**
 * Label duplicated in a clipped box. A parent `Magnetic` slides both copies up on hover,
 * so the text appears to roll. The duplicate is hidden from assistive tech.
 */
export function RollLabel({ children }: { children: ReactNode }) {
  return (
    <span className="relative block overflow-hidden">
      <span data-roll className="block">
        {children}
      </span>
      <span data-roll aria-hidden className="absolute inset-x-0 top-full block">
        {children}
      </span>
    </span>
  );
}
