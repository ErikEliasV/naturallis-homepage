import { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/cn";

import { Field, FIELD_CONTROL, type FieldProps } from "./field";

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
          className={cn(FIELD_CONTROL, "min-h-32 resize-y rounded-tile py-4")}
        />
      )}
    </Field>
  );
}
