import { useMemo } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { getProducts } from "../lib/api";
import { useFetch } from "../lib/useFetch";
import { CATEGORY_LABELS, categoryFromSlug, categoryLabel, categorySlug, toInr } from "../lib/format";
import { ProductGrid } from "../ui/ProductCard";
import { Container, EmptyState, ErrorState, PageBanner } from "../ui/States";
import NotFound from "./NotFound";

const SORTS = {
  featured: { label: "Featured", fn: () => 0 },
  "price-asc": { label: "Price: low to high", fn: (a, b) => a.price - b.price },
  "price-desc": { label: "Price: high to low", fn: (a, b) => b.price - a.price },
  rating: { label: "Top rated", fn: (a, b) => b.rating.rate - a.rating.rate },
};

const PRICE_BANDS = {
  "": "Any price",
  "0-999": "Under ₹999",
  "1000-4999": "₹1,000 to ₹4,999",
  "5000-": "₹5,000 and above",
};

function matchesBand(inr, band) {
  if (!band) return true;
  const [min, max] = band.split("-").map((v) => (v ? Number(v) : null));
  return (min === null || inr >= min) && (max === null || inr <= max);
}

export default function Shop() {
  const { category: slug } = useParams();
  const [params, setParams] = useSearchParams();
  const { data, loading, error, retry } = useFetch((o) => getProducts(o));

  const category = slug ? categoryFromSlug(slug) : null;
  const q = (params.get("q") || "").trim();
  const sort = SORTS[params.get("sort")] ? params.get("sort") : "featured";
  const band = PRICE_BANDS[params.get("price")] ? params.get("price") : "";

  const results = useMemo(() => {
    if (!data) return [];
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    return data
      .filter((p) => !category || p.category === category)
      .filter((p) => words.every((w) => `${p.title} ${p.category}`.toLowerCase().includes(w)))
      .filter((p) => matchesBand(toInr(p.price), band))
      .sort(SORTS[sort].fn);
  }, [data, category, q, sort, band]);

  if (slug && !category) return <NotFound />;

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    value ? next.set(key, value) : next.delete(key);
    setParams(next, { replace: true });
  };

  const title = q ? `Results for "${q}"` : category ? categoryLabel(category) : "All products";
  const hasFilters = q || band;

  return (
    <>
    <PageBanner title={category ? categoryLabel(category) : "Explore"} crumb={category ? categoryLabel(category).toLowerCase() : "shop"} />
    <Container className="py-8 sm:py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-medium text-gray-900">{title}</h2>
          <p className="mt-1 text-sm text-gray-500" aria-live="polite">
            {loading ? "Loading products" : `${results.length} ${results.length === 1 ? "product" : "products"}`}
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={band}
            onChange={(e) => update("price", e.target.value)}
            aria-label="Filter by price"
            className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-violet-500"
          >
            {Object.entries(PRICE_BANDS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
          <select
            value={sort}
            onChange={(e) => update("sort", e.target.value === "featured" ? "" : e.target.value)}
            aria-label="Sort products"
            className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-violet-500"
          >
            {Object.entries(SORTS).map(([v, s]) => <option key={v} value={v}>{s.label}</option>)}
          </select>
        </div>
      </div>

      <div className="-mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        {[null, ...Object.keys(CATEGORY_LABELS)].map((c) => {
          const active = c === category;
          const search = params.toString();
          return (
            <Link
              key={c || "all"}
              to={(c ? `/shop/${categorySlug(c)}` : "/shop") + (search ? `?${search}` : "")}
              className={`h-9 shrink-0 rounded-full border px-4 text-sm leading-9 transition ${
                active ? "border-violet-500 bg-violet-50 font-medium text-violet-700" : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
              }`}
            >
              {c ? categoryLabel(c) : "All"}
            </Link>
          );
        })}
      </div>

      <div className="mt-6">
        {error ? (
          <ErrorState onRetry={retry} />
        ) : !loading && results.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300">
            <EmptyState
              title="No products match"
              body={hasFilters ? "Try a different search term or clear the price filter." : "This category is empty right now."}
            >
              {hasFilters && (
                <button
                  type="button"
                  onClick={() => setParams({}, { replace: true })}
                  className="h-10 rounded-lg border border-gray-300 bg-white px-5 text-sm font-medium text-gray-800 hover:border-gray-400"
                >
                  Clear filters
                </button>
              )}
            </EmptyState>
          </div>
        ) : (
          <ProductGrid products={results} loading={loading} />
        )}
      </div>
    </Container>
    </>
  );
}
