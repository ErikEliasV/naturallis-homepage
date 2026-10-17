"use client";

import { useId, useMemo } from "react";

import { Accordion } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { CATEGORIES } from "@/constants/categories";
import { cn } from "@/utils/cn";
import { formatPrice } from "@/utils/format-price";

import { type Product } from "../types";
import { type Availability, type CollectionFilters, countBy, toggle } from "../utils/collection";

const FACET_TRIGGER = "pt-6 pb-3 font-serif text-heading-sm";
const RANGE =
  "pointer-events-none absolute inset-0 w-full appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-pill [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-black [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-pill [&::-webkit-slider-thumb]:bg-black";
const PRICE_INPUT =
  "h-control-shop w-full min-w-0 rounded-pill bg-mist px-4 text-black/70 outline-none focus-visible:ring-2 focus-visible:ring-forest";

type Option = { value: string; label: string; count: number };

function CheckboxList({
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

type FiltersPanelProps = {
  products: readonly Product[];
  filters: CollectionFilters;
  ceiling: number;
  showCategories: boolean;
  onChange: (filters: CollectionFilters) => void;
};

/** Facets of the collection sidebar (Figma "Form"): availability, price, size, type. */
export function FiltersPanel({
  products,
  filters,
  ceiling,
  showCategories,
  onChange,
}: FiltersPanelProps) {
  const minId = useId();
  const maxId = useId();

  const counts = useMemo(
    () => ({
      availability: countBy(products, (product) => [product.inStock ? "in-stock" : "out-of-stock"]),
      kinds: countBy(products, (product) => [product.kind]),
      capsules: countBy(products, (product) => product.sizes.map((size) => String(size.capsules))),
      categories: countBy(products, (product) => [product.category]),
    }),
    [products],
  );

  const availabilityOptions: Option[] = [
    { value: "in-stock", label: "Em estoque", count: counts.availability.get("in-stock") ?? 0 },
    {
      value: "out-of-stock",
      label: "Esgotado",
      count: counts.availability.get("out-of-stock") ?? 0,
    },
  ];
  const capsuleOptions: Option[] = [...counts.capsules.keys()]
    .sort((a, b) => Number(a) - Number(b))
    .map((value) => ({
      value,
      label: `${value} cápsulas`,
      count: counts.capsules.get(value) ?? 0,
    }));
  const kindOptions: Option[] = [...counts.kinds.entries()]
    .sort(([a], [b]) => a.localeCompare(b, "pt-BR"))
    .map(([value, count]) => ({ value, label: value, count }));
  const categoryOptions: Option[] = CATEGORIES.map((category) => ({
    value: category.slug,
    label: category.name,
    count: counts.categories.get(category.slug) ?? 0,
  }));

  const minPct = ceiling > 0 ? (filters.minPrice / ceiling) * 100 : 0;
  const maxPct = ceiling > 0 ? (filters.maxPrice / ceiling) * 100 : 100;
  const setPrice = (min: number, max: number) =>
    onChange({
      ...filters,
      minPrice: Math.max(0, Math.min(min, max)),
      maxPrice: Math.min(ceiling, Math.max(min, max)),
    });

  return (
    <div className="font-geist text-body">
      <Accordion
        title="Disponibilidade"
        defaultOpen
        triggerClassName="pb-3 font-serif text-heading-sm"
      >
        <CheckboxList
          options={availabilityOptions}
          selected={filters.availability}
          onToggle={(value) =>
            onChange({
              ...filters,
              availability: toggle(filters.availability, value as Availability),
            })
          }
        />
      </Accordion>

      <Accordion title="Preço" defaultOpen triggerClassName={FACET_TRIGGER}>
        <div className="flex flex-col gap-5 pb-6">
          <p className="text-black/70">O maior preço é {formatPrice(ceiling)}</p>
          <div className="relative h-4">
            <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 bg-black/10" />
            <div
              className="absolute top-1/2 h-1 -translate-y-1/2 bg-black"
              style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }}
            />
            <input
              type="range"
              aria-label="Preço mínimo"
              min={0}
              max={ceiling}
              value={filters.minPrice}
              onChange={(event) => setPrice(Number(event.target.value), filters.maxPrice)}
              className={RANGE}
            />
            <input
              type="range"
              aria-label="Preço máximo"
              min={0}
              max={ceiling}
              value={filters.maxPrice}
              onChange={(event) => setPrice(filters.minPrice, Number(event.target.value))}
              className={RANGE}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label htmlFor={minId} className="flex items-center gap-2">
              <span>R$</span>
              <input
                id={minId}
                type="number"
                inputMode="decimal"
                min={0}
                max={ceiling}
                value={filters.minPrice}
                onChange={(event) => setPrice(Number(event.target.value), filters.maxPrice)}
                className={PRICE_INPUT}
                aria-label="Preço mínimo em reais"
              />
            </label>
            <label htmlFor={maxId} className="flex items-center gap-2">
              <span>R$</span>
              <input
                id={maxId}
                type="number"
                inputMode="decimal"
                min={0}
                max={ceiling}
                value={filters.maxPrice}
                onChange={(event) => setPrice(filters.minPrice, Number(event.target.value))}
                className={PRICE_INPUT}
                aria-label="Preço máximo em reais"
              />
            </label>
          </div>
        </div>
      </Accordion>

      <Accordion title="Tamanho" defaultOpen triggerClassName={FACET_TRIGGER}>
        <CheckboxList
          options={capsuleOptions}
          selected={filters.capsules.map(String)}
          onToggle={(value) =>
            onChange({ ...filters, capsules: toggle(filters.capsules, Number(value)) })
          }
        />
      </Accordion>

      <Accordion title="Tipo" defaultOpen triggerClassName={FACET_TRIGGER}>
        <CheckboxList
          options={kindOptions}
          selected={filters.kinds}
          onToggle={(value) => onChange({ ...filters, kinds: toggle(filters.kinds, value) })}
        />
      </Accordion>

      {showCategories ? (
        <Accordion title="Categoria" defaultOpen triggerClassName={FACET_TRIGGER}>
          <CheckboxList
            options={categoryOptions}
            selected={filters.categories}
            onToggle={(value) =>
              onChange({
                ...filters,
                categories: toggle(
                  filters.categories,
                  value as CollectionFilters["categories"][number],
                ),
              })
            }
          />
        </Accordion>
      ) : null}
    </div>
  );
}
