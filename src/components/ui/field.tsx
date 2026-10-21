import { type ReactNode, useId } from "react";

import { cn } from "@/utils/cn";

/** Shared look of text inputs (pill) and textareas. */
export const FIELD_CONTROL =
  "w-full rounded-pill border border-black/10 bg-white px-5 text-body text-ink outline-none transition-colors duration-300 ease-power3-out placeholder:text-black/40 focus-visible:border-forest focus-visible:ring-2 focus-visible:ring-forest/20 aria-invalid:border-promo";

export type FieldProps = {
  label: string;
  error?: string;
  hint?: string;
  className?: string;
};

type ControlAria = {
  id: string;
  "aria-invalid"?: true;
  "aria-describedby"?: string;
};

/** Label, hint and error around a form control; passes the ARIA wiring to it. */
export function Field({
  label,
  error,
  hint,
  required,
  id,
  className,
  children,
}: FieldProps & { required?: boolean; id?: string; children: (aria: ControlAria) => ReactNode }) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const hintId = hint ? `${controlId}-hint` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={controlId} className="text-body-sm font-medium">
        {label}
        {required ? <span aria-hidden> *</span> : null}
      </label>
      {children({
        id: controlId,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
      })}
      {hint ? (
        <p id={hintId} className="text-body-sm text-black/60">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-body-sm text-promo">
          {error}
        </p>
      ) : null}
    </div>
  );
}
