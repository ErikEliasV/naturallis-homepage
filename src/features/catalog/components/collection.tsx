"use client";

import Image from "next/image";
import { useLenis } from "lenis/react";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { DURATION, EASE, MEDIA_QUERY, STAGGER } from "@/constants/motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/utils/cn";

import { type Product } from "../types";
import {
  activeFilterCount,
  emptyFilters,
  filterProducts,
  priceCeiling,
  SORT_OPTIONS,
  type SortOption,
  sortProducts,
} from "../utils/collection";
import { FiltersPanel } from "./filters-panel";
import { ProductCard } from "./product-card";

type View = "grid" | "dense";

const VIEWS: readonly { value: View; label: string; icon: string; width: number }[] = [
  { value: "grid", label: "Grade", icon: "/icons/view-grid.svg", width: 17 },
  { value: "dense", label: "Grade compacta", icon: "/icons/view-dense.svg", width: 15 },
];

type CollectionProps = {
  products: readonly Product[];
  /** Adds a category facet (used on the all-products page). */
  showCategories?: boolean;
};

/** Filterable, sortable product grid (Figma "ResultsList"). */
export function Collection({ products, showCategories = false }: CollectionProps) {
  const ceiling = useMemo(() => priceCeiling(products), [products]);
  const [filters, setFilters] = useState(() => emptyFilters(ceiling));
  const [sort, setSort] = useState<SortOption>("best-selling");
  const [view, setView] = useState<View>("grid");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const desktop = useMediaQuery(MEDIA_QUERY.desktop, true);
  const lenis = useLenis();
  const gridRef = useRef<HTMLUListElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const panelId = useId();
  const sortId = useId();

  const visible = useMemo(
    () => sortProducts(filterProducts(products, filters), sort),
    [products, filters, sort],
  );
  const activeCount = activeFilterCount(filters, ceiling);
  const panelVisible = desktop ? sidebarOpen : drawerOpen;
  const gridColumns = sidebarOpen
    ? view === "grid"
      ? "lg:grid-cols-3"
      : "lg:grid-cols-4"
    : view === "grid"
      ? "lg:grid-cols-4"
      : "lg:grid-cols-5";

  useGSAP(
    () => {
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      const grid = gridRef.current;
      if (!grid) return;
      const mm = gsap.matchMedia();
      mm.add(MEDIA_QUERY.motionOk, () => {
        gsap.from(grid.children, {
          autoAlpha: 0,
          y: 20,
          duration: DURATION.enterShort,
          ease: EASE.out,
          stagger: STAGGER.items * 0.4,
        });
      });
      return () => mm.revert();
    },
    { dependencies: [visible, view], scope: gridRef },
  );

  useGSAP(
    () => {
      const drawer = drawerRef.current;
      if (!drawer || desktop) return;
      const reduced = window.matchMedia(MEDIA_QUERY.reducedMotion).matches;
      gsap.to(drawer, {
        x: 0,
        xPercent: drawerOpen ? 0 : -100,
        duration: reduced ? 0 : DURATION.enterShort,
        ease: EASE.inOut,
        onStart: () => {
          if (drawerOpen) gsap.set(drawer, { visibility: "visible" });
        },
        onComplete: () => {
          if (!drawerOpen) gsap.set(drawer, { visibility: "hidden" });
        },
      });
    },
    { dependencies: [drawerOpen, desktop] },
  );

  useEffect(() => {
    if (!lenis || desktop) return;
    if (drawerOpen) lenis.stop();
    else lenis.start();
  }, [drawerOpen, desktop, lenis]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [drawerOpen]);

  const panel = (
    <FiltersPanel
      products={products}
      filters={filters}
      ceiling={ceiling}
      showCategories={showCategories}
      onChange={setFilters}
    />
  );

  return (
    <div className="text-body">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6">
        <div className="flex items-center gap-6">
          <button
            type="button"
            aria-expanded={panelVisible}
            aria-controls={panelId}
            onClick={() => (desktop ? setSidebarOpen((open) => !open) : setDrawerOpen(true))}
            className="flex h-control-shop items-center gap-2 rounded-pill border border-black/20 px-3.75 font-medium transition-colors duration-300 ease-power3-out hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          >
            <Image src="/icons/filter.svg" alt="" width={15} height={14} />
            Filtros{activeCount > 0 ? ` (${activeCount})` : ""}
          </button>
          <p aria-live="polite" className="text-black/70">
            {visible.length} {visible.length === 1 ? "produto" : "produtos"}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-8">
          <div className="flex items-center gap-2">
            <label htmlFor={sortId}>Ordenar por</label>
            <div className="relative">
              <select
                id={sortId}
                value={sort}
                onChange={(event) => setSort(event.target.value as SortOption)}
                className="h-control-shop w-56 cursor-pointer appearance-none rounded-pill bg-white pr-10 pl-4 shadow-[inset_0_0_0_1px_rgb(0_0_0/0.2)] outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--color-forest)]"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <Image
                src="/icons/chevron-right.svg"
                alt=""
                width={12}
                height={12}
                className="pointer-events-none absolute top-1/2 right-4 size-3 -translate-y-1/2 rotate-90"
              />
            </div>
          </div>
          <div role="group" aria-label="Visualização" className="hidden items-center gap-2 lg:flex">
            <span aria-hidden>Ver como</span>
            {VIEWS.map((option) => {
              const selected = view === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={selected}
                  aria-label={option.label}
                  onClick={() => setView(option.value)}
                  className={cn(
                    "flex size-control-shop items-center justify-center rounded-pill border border-black/20 transition-colors duration-300 ease-power3-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest",
                    selected ? "bg-black" : "bg-white hover:bg-black/5",
                  )}
                >
                  <Image
                    src={option.icon}
                    alt=""
                    width={option.width}
                    height={option.width}
                    className={cn(
                      option.value === "grid" ? !selected && "invert" : selected && "invert",
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex items-start gap-12.5">
        {desktop ? (
          sidebarOpen ? (
            <aside id={panelId} aria-label="Filtros" className="w-shop-sidebar shrink-0">
              {panel}
            </aside>
          ) : null
        ) : (
          <div
            ref={drawerRef}
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label="Filtros"
            inert={!drawerOpen}
            className="invisible fixed inset-0 z-60 flex flex-col bg-white"
            style={{ transform: "translateX(-100%)" }}
          >
            <div className="flex items-center justify-between border-b border-black/10 px-gutter py-4">
              <p className="font-display text-heading-lg">Filtros</p>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="rounded-pill px-3 py-2 font-medium hover:bg-black/5"
              >
                Fechar
              </button>
            </div>
            <div data-lenis-prevent className="flex-1 overflow-y-auto px-gutter">
              {panel}
            </div>
            <div className="flex gap-3 border-t border-black/10 px-gutter py-4">
              <Button
                variant="ghost"
                size="shop"
                magnetic={false}
                onClick={() => setFilters(emptyFilters(ceiling))}
              >
                Limpar
              </Button>
              <Button
                variant="ink"
                size="shop"
                magnetic={false}
                className="flex-1"
                onClick={() => setDrawerOpen(false)}
              >
                Ver {visible.length} produtos
              </Button>
            </div>
          </div>
        )}

        <div className="min-w-0 flex-1">
          {visible.length > 0 ? (
            <ul ref={gridRef} className={cn("grid grid-cols-2 gap-x-3.75 gap-y-2.75", gridColumns)}>
              {visible.map((product) => (
                <li key={product.slug}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-start gap-4 rounded-tile bg-surface p-8">
              <p className="font-display text-heading-lg">Nenhum produto com esses filtros.</p>
              <Button variant="ink" size="shop" onClick={() => setFilters(emptyFilters(ceiling))}>
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
