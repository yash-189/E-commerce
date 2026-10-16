import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProduct, getProducts } from "../lib/api";
import { useFetch } from "../lib/useFetch";
import { categoryLabel, categorySlug, price, toInr, FREE_SHIPPING_FROM } from "../lib/format";
import { useStore } from "../store/StoreContext";
import { ProductGrid } from "../ui/ProductCard";
import { Container, ErrorState, SectionTitle } from "../ui/States";
import { HeartIcon } from "../ui/Icons";
import Img from "../ui/Img";
import Stars from "../ui/Stars";
import QtyStepper from "../ui/QtyStepper";
import NotFound from "./NotFound";

const CLOTHING_SIZES = ["S", "M", "L", "XL"];

export default function Product() {
  const { id } = useParams();
  const validId = /^\d+$/.test(id);
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, inWishlist } = useStore();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);

  const { data: product, loading, error, retry } = useFetch(
    (o) => (validId ? getProduct(id, o) : Promise.resolve(null)),
    [id],
  );
  const { data: all } = useFetch((o) => getProducts(o));

  if (!validId || (!loading && !error && !product)) return <NotFound what="product" />;

  if (error) {
    return (
      <Container className="py-16">
        <ErrorState onRetry={retry} message="We couldn't load this product." />
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="grid gap-8 py-10 md:grid-cols-2" aria-busy="true">
        <div className="aspect-square animate-pulse rounded-2xl bg-gray-100" />
        <div className="space-y-4">
          <div className="h-3 w-24 animate-pulse rounded bg-gray-100" />
          <div className="h-7 w-4/5 animate-pulse rounded bg-gray-100" />
          <div className="h-5 w-32 animate-pulse rounded bg-gray-100" />
          <div className="h-24 animate-pulse rounded bg-gray-100" />
          <div className="h-12 animate-pulse rounded-lg bg-gray-100" />
        </div>
      </Container>
    );
  }

  const needsSize = product.category.includes("clothing");
  const saved = inWishlist(product.id);
  const mrp = Math.round(toInr(product.price) * 1.25);
  const related = (all || []).filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const add = (buyNow) => {
    if (needsSize && !size) {
      setSizeError(true);
      return;
    }
    addToCart(product, qty, needsSize ? size : null);
    if (buyNow) navigate("/cart");
  };

  return (
    <Container className="py-8 sm:py-10">
      <nav aria-label="Breadcrumb" className="truncate text-sm text-gray-500">
        <Link to="/" className="hover:text-gray-900">Home</Link>
        <span className="mx-2">/</span>
        <Link to={`/shop/${categorySlug(product.category)}`} className="hover:text-gray-900">{categoryLabel(product.category)}</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.title}</span>
      </nav>

      <div className="mt-6 grid gap-8 md:grid-cols-2 lg:gap-14">
        <div className="md:sticky md:top-24 md:self-start">
          <Img src={product.image} alt={product.title} className="aspect-square rounded-2xl border border-gray-200 p-10 sm:p-16" />
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-violet-600">{categoryLabel(product.category)}</p>
          <h1 className="mt-2 text-2xl font-semibold leading-snug text-gray-900 sm:text-3xl">{product.title}</h1>
          <div className="mt-3"><Stars rating={product.rating} size="md" /></div>

          <div className="mt-6 flex items-baseline gap-3">
            <p className="text-3xl font-bold text-gray-900">{price(product.price)}</p>
            <p className="text-gray-400 line-through">₹{mrp.toLocaleString("en-IN")}</p>
            <p className="text-sm font-semibold text-green-600">20% off</p>
          </div>
          <p className="mt-1 text-xs text-gray-500">Inclusive of all taxes</p>

          {needsSize && (
            <fieldset className="mt-7">
              <legend className="text-sm font-medium text-gray-900">Size</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {CLOTHING_SIZES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={size === s}
                    onClick={() => { setSize(s); setSizeError(false); }}
                    className={`h-11 w-14 rounded-lg border text-sm font-medium transition ${
                      size === s ? "border-violet-500 bg-violet-50 text-violet-700" : "border-gray-300 text-gray-800 hover:border-gray-400"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {sizeError && <p role="alert" className="mt-2 text-sm text-red-600">Choose a size first</p>}
            </fieldset>
          )}

          <div className="mt-7 flex items-center gap-4">
            <span className="text-sm font-medium text-gray-900">Quantity</span>
            <QtyStepper value={qty} onChange={setQty} />
          </div>

          <div className="mt-7 flex gap-3">
            <button type="button" onClick={() => add(false)} className="h-12 flex-1 rounded-xl bg-brand font-medium text-white shadow-lg shadow-violet-100 hover:opacity-90">
              Add to cart
            </button>
            <button type="button" onClick={() => add(true)} className="h-12 flex-1 rounded-xl bg-gray-100 font-medium text-gray-800 hover:bg-gray-200">
              Buy Now
            </button>
            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
              aria-pressed={saved}
              className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border ${saved ? "border-pink-200 bg-pink-50 text-pink-500" : "border-gray-200 bg-gray-100 text-gray-600 hover:text-gray-900"}`}
            >
              <HeartIcon filled={saved} />
            </button>
          </div>

          <ul className="mt-8 divide-y divide-gray-100 rounded-xl border border-gray-200 text-sm">
            <li className="flex justify-between gap-4 px-4 py-3">
              <span className="text-gray-500">Delivery</span>
              <span className="text-right text-gray-900">
                {toInr(product.price) * qty >= FREE_SHIPPING_FROM ? "Free, " : ""}2 to 4 days
              </span>
            </li>
            <li className="flex justify-between gap-4 px-4 py-3">
              <span className="text-gray-500">Returns</span>
              <span className="text-gray-900">7-day easy returns</span>
            </li>
            <li className="flex justify-between gap-4 px-4 py-3">
              <span className="text-gray-500">Payment</span>
              <span className="text-gray-900">Card, UPI or cash on delivery</span>
            </li>
          </ul>

          <div className="mt-8">
            <h2 className="text-sm font-semibold text-gray-900">About this item</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{product.description}</p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <SectionTitle>Explore More</SectionTitle>
          <ProductGrid products={related} />
        </section>
      )}
    </Container>
  );
}
