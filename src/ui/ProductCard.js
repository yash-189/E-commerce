import { Link } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import { categoryLabel, price } from "../lib/format";
import { BagIcon, CheckIcon, HeartIcon, StarIcon } from "./Icons";
import Img from "./Img";
import Spinner from "./Spinner";
import { useAction } from "../lib/useAction";

export default function ProductCard({ product, index = 0 }) {
  const { addToCart, toggleWishlist, inWishlist, inCart } = useStore();
  const saved = inWishlist(product.id);
  const added = inCart(product.id);
  const needsSize = product.category.includes("clothing");
  const popular = product.rating?.count >= 300;
  const url = `/product/${product.id}`;
  const [adding, runAdd] = useAction();

  const cartBtn = `inline-flex h-9 w-9 shrink-0 items-center justify-center gap-1.5 rounded-full text-xs font-medium transition sm:w-[6.5rem] ${
    added ? "bg-brand text-white" : "bg-violet-50 text-violet-600 hover:bg-brand hover:text-white active:scale-95"
  }`;

  return (
    <article
      className="rise group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(128,147,241,0.45)]"
      style={{ animationDelay: `${Math.min(index, 8) * 30}ms` }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-[#f7f4fd]">
        <Link to={url} tabIndex={-1} aria-hidden="true">
          <Img
            src={product.image}
            alt=""
            className="aspect-[4/5] !bg-transparent p-6 mix-blend-multiply"
            imgClassName="group-hover:scale-[1.06]"
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
          className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:scale-110 ${
            saved ? "text-pink-500" : "text-gray-600 hover:text-pink-500 sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
          }`}
        >
          <HeartIcon key={saved ? "on" : "off"} filled={saved} width={17} height={17} className={saved ? "pop" : ""} />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-1 pb-1 pt-3 sm:px-1.5 sm:pt-4">
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
          <h3 className="line-clamp-2 text-sm font-medium leading-snug tracking-normal text-gray-900 hover:text-violet-600">
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
              onClick={() => !adding && runAdd(() => addToCart(product), 300, 650)}
              disabled={adding}
              aria-busy={adding}
              aria-label={added ? "Add one more to cart" : "Add to cart"}
              className={cartBtn}
            >
              {adding ? <Spinner className="h-3.5 w-3.5" /> : added ? <CheckIcon width={15} height={15} className="pop" /> : <BagIcon width={15} height={15} />}
              <span className="hidden sm:inline">{adding ? "Adding" : added ? "Added" : "Add"}</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="aspect-[4/5] skeleton rounded-2xl" />
      <div className="px-1 pt-4">
        <div className="h-2.5 w-16 skeleton rounded" />
        <div className="mt-3 h-3 w-full skeleton rounded" />
        <div className="mt-2 h-3 w-2/3 skeleton rounded" />
        <div className="mt-4 flex justify-between">
          <div className="h-5 w-16 skeleton rounded" />
          <div className="h-9 w-16 skeleton rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProductGrid({ products, loading, count = 8 }) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-4">
      {loading
        ? Array.from({ length: count }, (_, i) => <ProductCardSkeleton key={i} />)
        : products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
    </div>
  );
}
