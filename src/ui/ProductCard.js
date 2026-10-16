import { Link } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import { price } from "../lib/format";
import { ArrowIcon, BagIcon, CheckIcon, HeartIcon } from "./Icons";
import Img from "./Img";
import Stars from "./Stars";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, inWishlist, inCart } = useStore();
  const saved = inWishlist(product.id);
  const added = inCart(product.id);
  const needsSize = product.category.includes("clothing");

  const iconBtn = "grid h-8 w-8 shrink-0 place-items-center rounded-full transition sm:h-9 sm:w-9";

  return (
    <article className="group flex h-full flex-col rounded-xl border border-gray-200 bg-white p-3 transition sm:p-4 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-100">
      <Link to={`/product/${product.id}`} className="flex flex-1 flex-col">
        <Img
          src={product.image}
          alt={product.title}
          className="aspect-square p-4"
          imgClassName="transition duration-300 group-hover:scale-105"
        />
        <p className="mt-4 text-xs tracking-widest text-gray-500">{product.category}</p>
        <h3 className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm font-medium text-gray-900">{product.title}</h3>
        <div className="mt-2">
          <Stars rating={product.rating} />
        </div>
        <p className="mt-3 font-semibold text-gray-900">{price(product.price)}</p>
      </Link>

      <div className="mt-4 flex items-center gap-1.5 sm:gap-2">
        <Link
          to={`/product/${product.id}`}
          className="mr-auto inline-flex items-center gap-1 whitespace-nowrap text-xs font-medium text-violet-500 sm:text-sm hover:text-violet-600"
        >
          Buy Now <ArrowIcon width={14} height={14} className="hidden sm:block" />
        </Link>
        {needsSize ? (
          <Link
            to={`/product/${product.id}`}
            aria-label="Choose a size to add to cart"
            title="Choose a size"
            className={`${iconBtn} bg-gray-100 text-gray-700 hover:bg-violet-100 hover:text-violet-600`}
          >
            <BagIcon width={16} height={16} />
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => addToCart(product)}
            aria-label={added ? "Add one more to cart" : "Add to cart"}
            title={added ? "In your cart" : "Add to cart"}
            className={`${iconBtn} ${added ? "bg-brand text-white" : "bg-gray-100 text-gray-700 hover:bg-violet-100 hover:text-violet-600"}`}
          >
            {added ? <CheckIcon width={16} height={16} /> : <BagIcon width={16} height={16} />}
          </button>
        )}
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          aria-pressed={saved}
          className={`${iconBtn} ${saved ? "bg-pink-50 text-pink-500" : "bg-gray-100 text-gray-700 hover:bg-pink-50 hover:text-pink-500"}`}
        >
          <HeartIcon filled={saved} width={16} height={16} />
        </button>
      </div>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4" aria-hidden="true">
      <div className="aspect-square animate-pulse rounded-lg bg-gray-100" />
      <div className="mt-4 h-2.5 w-16 animate-pulse rounded bg-gray-100" />
      <div className="mt-3 h-3 w-full animate-pulse rounded bg-gray-100" />
      <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-gray-100" />
      <div className="mt-4 h-4 w-20 animate-pulse rounded bg-gray-100" />
      <div className="mt-4 flex justify-between">
        <div className="h-4 w-20 animate-pulse rounded bg-gray-100" />
        <div className="h-9 w-20 animate-pulse rounded-full bg-gray-100" />
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
