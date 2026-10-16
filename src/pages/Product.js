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
      <Container className="py-8 sm:py-10" aria-busy="true">
        <div className="h-4 w-64 max-w-full skeleton rounded" />
        <div className="mt-6 grid gap-8 md:grid-cols-2 lg:gap-14">
          <div className="aspect-square skeleton rounded-3xl" />
          <div>
            <div className="h-3 w-24 skeleton rounded" />
            <div className="mt-4 h-8 w-full skeleton rounded" />
            <div className="mt-2 h-8 w-3/5 skeleton rounded" />
            <div className="mt-5 h-5 w-28 skeleton rounded" />
            <div className="mt-8 h-9 w-48 skeleton rounded" />
            <div className="mt-8 flex gap-2">
              {[0, 1, 2, 3].map((i) => <div key={i} className="h-11 w-14 skeleton rounded-full" />)}
            </div>
            <div className="mt-8 flex gap-3">
              <div className="h-12 flex-1 skeleton rounded-full" />
              <div className="h-12 flex-1 skeleton rounded-full" />
            </div>
            <div className="mt-8 space-y-2">
              <div className="h-3 w-full skeleton rounded" />
              <div className="h-3 w-full skeleton rounded" />
              <div className="h-3 w-2/3 skeleton rounded" />
            </div>
          </div>
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
    <Container className="pb-28 pt-8 sm:py-10">
      <nav aria-label="Breadcrumb" className="truncate text-sm text-gray-500">
        <Link to="/" className="hover:text-gray-900">Home</Link>
        <span className="mx-2">/</span>
        <Link to={`/shop/${categorySlug(product.category)}`} className="hover:text-gray-900">{categoryLabel(product.category)}</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.title}</span>
      </nav>

      <div className="mt-6 grid gap-8 md:grid-cols-2 lg:gap-14">
        <div className="md:sticky md:top-24 md:self-start">
          <Img src={product.image} alt={product.title} className="rise aspect-square rounded-3xl !bg-[#f7f4fd] p-10 sm:p-16" imgClassName="mix-blend-multiply transition duration-500 hover:scale-105" />
        </div>

        <div className="rise [animation-delay:80ms]">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-500">{categoryLabel(product.category)}</p>
          <h1 className="mt-2 text-2xl font-medium leading-tight text-gray-900 sm:text-4xl">{product.title}</h1>
          <div className="mt-3"><Stars rating={product.rating} size="md" /></div>

          <div className="mt-6 flex items-baseline gap-3">
            <p className="font-display text-3xl font-semibold text-gray-900">{price(product.price)}</p>
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
                    className={`h-11 w-14 rounded-full border text-sm font-medium transition active:scale-95 ${
                      size === s ? "border-brand-ink bg-brand-ink text-white" : "border-gray-200 text-gray-800 hover:border-gray-900"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {sizeError && <p role="alert" className="rise mt-2 text-sm text-red-600">Choose a size first</p>}
            </fieldset>
          )}

          <div className="mt-7 flex items-center gap-4">
            <span className="text-sm font-medium text-gray-900">Quantity</span>
            <QtyStepper value={qty} onChange={setQty} />
          </div>

          <div className="fixed inset-x-0 bottom-0 z-30 flex gap-3 border-t border-gray-100 bg-white/95 p-3 backdrop-blur sm:static sm:mt-7 sm:border-0 sm:bg-transparent sm:p-0">
            <button type="button" onClick={() => add(false)} className="h-12 flex-1 rounded-full bg-brand font-medium text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 active:scale-[0.98]">
              Add to cart
            </button>
            <button type="button" onClick={() => add(true)} className="h-12 flex-1 rounded-full bg-brand-ink font-medium text-white transition hover:bg-black active:scale-[0.98]">
              Buy Now
            </button>
            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
              aria-pressed={saved}
              className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border transition ${saved ? "border-pink-200 bg-pink-50 text-pink-500" : "border-gray-200 text-gray-600 hover:border-gray-900 hover:text-gray-900"}`}
            >
              <HeartIcon key={saved ? "on" : "off"} filled={saved} className={saved ? "pop" : ""} />
            </button>
          </div>

          <ul className="mt-8 divide-y divide-gray-100 rounded-2xl bg-[#faf8fe] text-sm">
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
          <SectionTitle eyebrow="You may also like">Explore More</SectionTitle>
          <ProductGrid products={related} />
        </section>
      )}
    </Container>
  );
}
