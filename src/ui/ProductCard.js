import { Link } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import { categoryLabel, price } from "../lib/format";
import { BagIcon, CheckIcon, HeartIcon, StarIcon } from "./Icons";
import Img from "./Img";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, inWishlist, inCart } = useStore();
  const saved = inWishlist(product.id);
  const added = inCart(product.id);
  const needsSize = product.category.includes("clothing");
  const popular = product.rating?.count >= 300;
  const url = `/product/${product.id}`;

  const cartBtn = `inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-full px-3 text-xs font-medium transition sm:px-4 ${
    added ? "bg-brand text-white" : "bg-brand-ink text-white hover:bg-violet-600"
  }`;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-gray-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-100">
      <div className="relative bg-[#f7f4fd]">
        <Link to={url} tabIndex={-1} aria-hidden="true">
          <Img
            src={product.image}
            alt=""
            className="aspect-[4/5] !bg-transparent p-6 mix-blend-multiply"
            imgClassName="transition duration-500 group-hover:scale-105"
          />
        </Link>
        {popular && (
          <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-violet-600 shadow-sm">
            Bestseller
          </span>
        )}
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          aria-pressed={saved}
          className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white shadow-sm transition hover:scale-110 ${
            saved ? "text-pink-500" : "text-gray-600 hover:text-pink-500"
          }`}
        >
          <HeartIcon filled={saved} width={17} height={17} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <div className="flex items-center justify-between gap-2 text-[11px]">
          <span className="font-medium uppercase tracking-wider text-violet-500">{categoryLabel(product.category)}</span>
          {product.rating && (
            <span className="inline-flex items-center gap-0.5 text-gray-500">
              <StarIcon width={11} height={11} className="text-amber-400" />
              {product.rating.rate.toFixed(1)}
            </span>
          )}
        </div>
        <Link to={url} className="mt-1.5 flex-1">
          <h3 className="line-clamp-2 font-sans text-sm font-medium leading-snug tracking-normal text-gray-900 hover:text-violet-600">
            {product.title}
          </h3>
        </Link>
        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="font-display text-lg font-semibold text-gray-900">{price(product.price)}</p>
          {needsSize ? (
            <Link to={url} className={cartBtn} aria-label="Choose a size">
              <BagIcon width={15} height={15} />
              <span className="hidden sm:inline">Select size</span>
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => addToCart(product)}
              aria-label={added ? "Add one more to cart" : "Add to cart"}
              className={cartBtn}
            >
              {added ? <CheckIcon width={15} height={15} /> : <BagIcon width={15} height={15} />}
              <span className="hidden sm:inline">{added ? "Added" : "Add"}</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-gray-100" aria-hidden="true">
      <div className="aspect-[4/5] animate-pulse bg-[#f7f4fd]" />
      <div className="p-4">
        <div className="h-2.5 w-16 animate-pulse rounded bg-gray-100" />
        <div className="mt-3 h-3 w-full animate-pulse rounded bg-gray-100" />
        <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-gray-100" />
        <div className="mt-4 flex justify-between">
          <div className="h-5 w-16 animate-pulse rounded bg-gray-100" />
          <div className="h-9 w-16 animate-pulse rounded-full bg-gray-100" />
        </div>
      </div>
    </div>
  );
}

export function ProductGrid({ products, loading, count = 8 }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
      {loading
        ? Array.from({ length: count }, (_, i) => <ProductCardSkeleton key={i} />)
        : products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
