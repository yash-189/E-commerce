import { Link } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import { categoryLabel, rupees, toInr, FREE_SHIPPING_FROM } from "../lib/format";
import { Container, EmptyState, PageBanner } from "../ui/States";
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
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h2 className="font-semibold text-gray-900">Order summary</h2>
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
        <div className="flex justify-between border-t border-gray-200 pt-3 text-base font-semibold">
          <dt className="text-gray-900">Total</dt>
          <dd className="text-gray-900">{rupees(totals.total)}</dd>
        </div>
      </dl>
      {left > 0 && totals.subtotal > 0 && (
        <div className="mt-4 rounded-lg bg-violet-50 px-3 py-2.5 text-xs text-violet-800">
          Add {rupees(left)} more for free delivery.
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-violet-100">
            <div className="h-full rounded-full bg-violet-500" style={{ width: `${(totals.subtotal / FREE_SHIPPING_FROM) * 100}%` }} />
          </div>
        </div>
      )}
      {children}
    </div>
  );
}

export default function Cart() {
  const { cart, setQty, removeFromCart, toggleWishlist, inWishlist, notify } = useStore();
  const { data } = useFetch((o) => getProducts(o));
  const inCartIds = new Set(cart.map((i) => i.id));
  const categories = new Set(cart.map((i) => i.category));
  const related = (data || [])
    .filter((p) => !inCartIds.has(p.id) && (categories.size === 0 || categories.has(p.category)))
    .slice(0, 4);

  const relatedSection = related.length > 0 && (
    <Container className="mt-16">
      <h2 className="mb-6 text-lg font-medium text-gray-900">Related to items you viewed</h2>
      <ProductGrid products={related} />
    </Container>
  );

  if (cart.length === 0) {
    return (
      <>
        <PageBanner title="Shopping cart" crumb="cart" />
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
    <PageBanner title="Shopping cart" crumb="cart" />
    <Container className="py-8 sm:py-10">
      <h2 className="mb-6 text-lg font-medium text-gray-900">Your Shopping Cart</h2>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
        <ul className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
          {cart.map((item) => (
            <li key={item.key} className="flex gap-4 p-4 sm:p-5">
              <Link to={`/product/${item.id}`} className="shrink-0">
                <Img src={item.image} alt={item.title} className="h-24 w-24 rounded-lg border border-gray-100 p-2 sm:h-28 sm:w-28" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">{categoryLabel(item.category)}</p>
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
            <Link to="/checkout" className="mt-5 flex h-12 items-center justify-center rounded-lg bg-brand font-medium text-white hover:opacity-90">
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
