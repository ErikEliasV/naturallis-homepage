import { type ComponentPropsWithoutRef, type ReactNode, useId } from "react";

import { cn } from "@/utils/cn";

const CONTROL =
  "w-full rounded-pill border border-black/10 bg-white px-5 font-geist text-body text-ink outline-none transition-colors duration-300 ease-power3-out placeholder:text-black/40 focus-visible:border-forest focus-visible:ring-2 focus-visible:ring-forest/20 aria-invalid:border-promo";

type FieldProps = {
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

function Field({
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
      <label htmlFor={controlId} className="font-geist text-body-sm font-medium">
        {label}
        {required ? <span aria-hidden> *</span> : null}
      </label>
      {children({
        id: controlId,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
      })}
      {hint ? (
        <p id={hintId} className="font-geist text-body-sm text-black/60">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="font-geist text-body-sm text-promo">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Labelled single-line input with hint and error wiring. */
export function TextField({
  label,
  error,
  hint,
  className,
  id,
  ...inputProps
}: FieldProps & ComponentPropsWithoutRef<"input">) {
  return (
    <Field
      label={label}
      error={error}
      hint={hint}
      className={className}
      id={id}
      required={inputProps.required}
    >
      {(aria) => <input {...inputProps} {...aria} className={cn(CONTROL, "h-control-shop")} />}
    </Field>
  );
}

/** Labelled multi-line input with hint and error wiring. */
export function TextAreaField({
  label,
  error,
  hint,
  className,
  id,
  ...textareaProps
}: FieldProps & ComponentPropsWithoutRef<"textarea">) {
  return (
    <Field
      label={label}
      error={error}
      hint={hint}
      className={className}
      id={id}
      required={textareaProps.required}
    >
      {(aria) => (
        <textarea
          {...textareaProps}
          {...aria}
          className={cn(CONTROL, "min-h-32 resize-y rounded-tile py-4")}
        />
      )}
    </Field>
  );
}
