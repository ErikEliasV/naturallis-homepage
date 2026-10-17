import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/utils/cn";

export type Option = { value: string; label: string; count: number };

/** Facet options with counts; options with no matches are disabled. */
export function CheckboxList({
  options,
  selected,
  onToggle,
}: {
  options: readonly Option[];
  selected: readonly string[];
  onToggle: (value: string) => void;
}) {
  return (
    <ul className="flex flex-col gap-3 pb-6">
      {options.map((option) => {
        const disabled = option.count === 0 && !selected.includes(option.value);
        return (
          <li key={option.value}>
            <label
              className={cn(
                "flex cursor-pointer items-center gap-2 text-black/70",
                disabled && "cursor-not-allowed opacity-50",
              )}
            >
              <Checkbox
                checked={selected.includes(option.value)}
                disabled={disabled}
                onChange={() => onToggle(option.value)}
              />
              <span className="flex-1">{option.label}</span>
              <span aria-label={`${option.count} produtos`}>{option.count}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
