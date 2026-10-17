import { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/cn";

import { Field, FIELD_CONTROL, type FieldProps } from "./field";

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
      {(aria) => (
        <input {...inputProps} {...aria} className={cn(FIELD_CONTROL, "h-control-shop")} />
      )}
    </Field>
  );
}
