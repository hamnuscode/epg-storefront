"use client";

import { FilterPills } from "@/components/ui/FilterPills";
import { cn } from "@/lib/cn";

/**
 * Figma: the row above the listing grid — filter pills at the left, then a
 * category select and a search field at the right. On mobile the select drops
 * away and search takes the full width beside a filter button.
 */
export function GearToolbar({
  filters, filter, onFilter, categories, category, onCategory,
  sports, sport, onSport, query, onQuery,
}: {
  filters: readonly string[];
  filter: string;
  onFilter: (v: string) => void;
  categories: readonly string[];
  category: string;
  onCategory: (v: string) => void;
  /** Collection adds a second, sport-scoped select beside the category one. */
  sports?: readonly string[];
  sport?: string;
  onSport?: (v: string) => void;
  query: string;
  onQuery: (v: string) => void;
}) {
  const control =
    "h-10 border border-line bg-surface-raised px-3 font-sans text-[13px] text-white/80 outline-none transition-colors focus-visible:border-brand-400";

  return (
    <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <FilterPills
        label="Filter by product type"
        options={filters}
        value={filter}
        onChange={onFilter}
        size="sm"
        className="flex-wrap"
      />

      <div className="flex min-w-0 items-center gap-3">
        <label className="hidden sm:block">
          <span className="sr-only">Select category</span>
          <select
            value={category}
            onChange={(e) => onCategory(e.target.value)}
            className={cn(control, "w-[165px] cursor-pointer")}
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>

        {sports && onSport && (
          <label className="hidden sm:block">
            <span className="sr-only">Select sport</span>
            <select value={sport} onChange={(e) => onSport(e.target.value)} className={cn(control, "w-[165px] cursor-pointer")}>
              {sports.map((s) => (<option key={s} value={s}>{s}</option>))}
            </select>
          </label>
        )}

        <label className="relative min-w-0 flex-1 sm:flex-none">
          <span className="sr-only">Search products</span>
          <svg
            width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            aria-hidden className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/45"
          >
            <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search"
            className={cn(control, "w-full min-w-0 pl-8 sm:w-[170px] placeholder:text-white/40")}
          />
        </label>
        <button
          type="button"
          aria-label="More filters"
          className="grid size-9 shrink-0 place-items-center border border-line text-white/70 transition-colors hover:text-white sm:hidden"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M3 6h18M6 12h12M10 18h4" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
