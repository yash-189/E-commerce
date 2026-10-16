import { Link } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import { categoryLabel, price } from "../lib/format";
import { HeartIcon } from "./Icons";
import Img from "./Img";
import Stars from "./Stars";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, inWishlist, inCart } = useStore();
  const saved = inWishlist(product.id);
  const added = inCart(product.id);

  return (
    <article className="group relative flex flex-col rounded-xl border border-gray-200 bg-white p-3 transition hover:border-gray-300 hover:shadow-md sm:p-4">
      <button
        type="button"
        onClick={() => toggleWishlist(product)}
        aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
        aria-pressed={saved}
        className={`absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border bg-white transition ${
          saved ? "border-pink-200 text-pink-600" : "border-gray-200 text-gray-500 hover:text-gray-900"
        }`}
      >
        <HeartIcon filled={saved} width={18} height={18} />
      </button>

      <Link to={`/product/${product.id}`} className="flex flex-1 flex-col focus:outline-none">
        <Img src={product.image} alt={product.title} className="aspect-square p-4 sm:p-6" />
        <p className="mt-3 text-[11px] font-medium uppercase tracking-wider text-gray-400">
          {categoryLabel(product.category)}
        </p>
        <h3 className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm text-gray-800 group-hover:text-indigo-600">
          {product.title}
        </h3>
        <div className="mt-2">
          <Stars rating={product.rating} />
        </div>
        <p className="mt-3 text-base font-semibold text-gray-900">{price(product.price)}</p>
        <span className="absolute inset-0" aria-hidden="true" />
      </Link>

      <button
        type="button"
        onClick={() => addToCart(product)}
        className={`relative z-10 mt-3 h-10 rounded-lg text-sm font-medium transition ${
          added
            ? "border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
            : "bg-indigo-500 text-white hover:bg-indigo-600"
        }`}
      >
        {added ? "Add one more" : "Add to cart"}
      </button>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4" aria-hidden="true">
      <div className="aspect-square animate-pulse rounded-lg bg-gray-100" />
      <div className="mt-4 h-2.5 w-16 animate-pulse rounded bg-gray-100" />
      <div className="mt-3 h-3 w-full animate-pulse rounded bg-gray-100" />
      <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-gray-100" />
      <div className="mt-4 h-4 w-20 animate-pulse rounded bg-gray-100" />
      <div className="mt-4 h-10 animate-pulse rounded-lg bg-gray-100" />
    </div>
  );
}

export function ProductGrid({ products, loading, count = 8 }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
      {loading
        ? Array.from({ length: count }, (_, i) => <ProductCardSkeleton key={i} />)
        : products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
