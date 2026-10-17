"use client";

import Image from "next/image";

import { cn } from "@/utils/cn";

type QuantityStepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  /** Product name, used to label the controls. */
  label: string;
  className?: string;
};

const STEP_BUTTON =
  "flex h-full w-10.5 items-center justify-center disabled:opacity-30 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-forest";

/** Pill quantity input with − / + buttons (Figma "QuantitySelectorComponent", 115 × 50). */
export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  label,
  className,
}: QuantityStepperProps) {
  const clamp = (next: number) => Math.min(max, Math.max(min, Number.isFinite(next) ? next : min));

  return (
    <div
      className={cn(
        "flex h-control-shop w-28.75 items-center rounded-pill border border-black/10 bg-white font-geist text-body",
        className,
      )}
    >
      <button
        type="button"
        aria-label={`Diminuir quantidade de ${label}`}
        disabled={value <= min}
        onClick={() => onChange(clamp(value - 1))}
        className={cn(STEP_BUTTON, "pl-3")}
      >
        <Image src="/icons/minus.svg" alt="" width={11} height={2} className="w-3" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        aria-label={`Quantidade de ${label}`}
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(clamp(Number(event.target.value)))}
        className="w-full min-w-0 appearance-none bg-transparent text-center outline-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button
        type="button"
        aria-label={`Aumentar quantidade de ${label}`}
        disabled={value >= max}
        onClick={() => onChange(clamp(value + 1))}
        className={cn(STEP_BUTTON, "relative pr-3")}
      >
        <span className="relative flex size-3 items-center justify-center">
          <Image src="/icons/minus.svg" alt="" width={11} height={2} className="w-full" />
          <Image
            src="/icons/plus-stem.svg"
            alt=""
            width={2}
            height={11}
            className="absolute h-full w-auto"
          />
        </span>
      </button>
    </div>
  );
}
