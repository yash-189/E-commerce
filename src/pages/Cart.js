import { Link } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import { categoryLabel, rupees, toInr, FREE_SHIPPING_FROM } from "../lib/format";
import { Container, EmptyState, PageBanner, SectionTitle } from "../ui/States";
import { ProductGrid } from "../ui/ProductCard";
import { getProducts } from "../lib/api";
import { useFetch } from "../lib/useFetch";
import emptyCart from "../assets/emptycart.svg";
import { TrashIcon } from "../ui/Icons";
import Img from "../ui/Img";
import QtyStepper from "../ui/QtyStepper";

export function OrderSummary({ children }) {
  const { totals } = useStore();
  const left = FREE_SHIPPING_FROM - totals.subtotal;

  return (
    <div className="rounded-3xl bg-[#faf8fe] p-6">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
      <dl className="mt-4 space-y-2.5 text-sm">
        <div className="flex justify-between">
          <dt className="text-gray-600">Items ({totals.count})</dt>
          <dd className="text-gray-900">{rupees(totals.subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-600">Delivery</dt>
          <dd className={totals.shipping ? "text-gray-900" : "font-medium text-green-600"}>
            {totals.shipping ? rupees(totals.shipping) : "Free"}
          </dd>
        </div>
        <div className="flex justify-between border-t border-violet-100 pt-3 text-lg font-semibold">
          <dt className="text-gray-900">Total</dt>
          <dd className="text-gray-900">{rupees(totals.total)}</dd>
        </div>
      </dl>
      {totals.subtotal > 0 && (
        <div className="mt-4 rounded-2xl bg-white px-3.5 py-3 text-xs text-violet-800">
          {left > 0 ? `Add ${rupees(left)} more for free delivery.` : "You've unlocked free delivery."}
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-violet-100">
            <div className="h-full rounded-full bg-brand transition-[width] duration-700 ease-out" style={{ width: `${Math.min(100, (totals.subtotal / FREE_SHIPPING_FROM) * 100)}%` }} />
          </div>
        </div>
      )}
      {children}
    </div>
  );
}

export default function Cart() {
  const { cart, totals, setQty, removeFromCart, toggleWishlist, inWishlist, notify } = useStore();
  const { data } = useFetch((o) => getProducts(o));
  const inCartIds = new Set(cart.map((i) => i.id));
  const categories = new Set(cart.map((i) => i.category));
  const related = (data || [])
    .filter((p) => !inCartIds.has(p.id) && (categories.size === 0 || categories.has(p.category)))
    .slice(0, 4);

  const relatedSection = related.length > 0 && (
    <Container className="mt-16">
      <SectionTitle eyebrow="Picked for you">Related to items you viewed</SectionTitle>
      <ProductGrid products={related} />
    </Container>
  );

  if (cart.length === 0) {
    return (
      <>
        <PageBanner title="Shopping cart" crumb="cart" sub="Nothing here yet" />
        <Container>
          <EmptyState title="Your cart is empty!" body="Add something you like and it will show up here." action="Shop now">
            <img src={emptyCart} alt="" className="w-56" />
          </EmptyState>
        </Container>
        {relatedSection}
      </>
    );
  }

  const saveForLater = (item) => {
    if (!inWishlist(item.id)) toggleWishlist(item);
    removeFromCart(item.key);
    notify("Moved to wishlist");
  };

  return (
    <>
    <PageBanner title="Shopping cart" crumb="cart" sub={`${totals.count} ${totals.count === 1 ? "item" : "items"} · ${rupees(totals.total)}`} />
    <Container className="py-8 sm:py-10">
      <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
        <ul className="divide-y divide-gray-100">
          {cart.map((item) => (
            <li key={item.key} className="rise flex gap-4 py-5 first:pt-0">
              <Link to={`/product/${item.id}`} className="shrink-0">
                <Img src={item.image} alt={item.title} className="h-24 w-24 rounded-2xl !bg-[#f7f4fd] p-3 sm:h-32 sm:w-32" imgClassName="mix-blend-multiply" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-violet-500">{categoryLabel(item.category)}</p>
                    <Link to={`/product/${item.id}`} className="mt-0.5 line-clamp-2 text-sm font-medium text-gray-900 hover:text-violet-600">
                      {item.title}
                    </Link>
                  </div>
                  <p className="shrink-0 font-semibold text-gray-900">{rupees(toInr(item.price) * item.qty)}</p>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {item.size && <>Size {item.size}</>}
                  {item.size && item.qty > 1 && " · "}
                  {item.qty > 1 && <>{rupees(toInr(item.price))} each</>}
                </p>
                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-3">
                  <QtyStepper value={item.qty} onChange={(n) => setQty(item.key, n)} />
                  <button type="button" onClick={() => saveForLater(item)} className="text-sm text-gray-600 hover:text-gray-900">
                    Save for later
                  </button>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.key)}
                    className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-red-600"
                    aria-label={`Remove ${item.title}`}
                  >
                    <TrashIcon width={16} height={16} /> Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="lg:sticky lg:top-24">
          <OrderSummary>
            <Link to="/checkout" className="mt-5 flex h-12 items-center justify-center rounded-full bg-brand font-medium text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5">
              Checkout
            </Link>
            <Link to="/shop" className="mt-3 block text-center text-sm text-gray-600 hover:text-gray-900">
              Continue shopping
            </Link>
          </OrderSummary>
        </div>
      </div>
    </Container>
    {relatedSection}
    </>
  );
}
