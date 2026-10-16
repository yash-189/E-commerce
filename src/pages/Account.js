import { Link, useLocation, useParams } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import { rupees, toInr } from "../lib/format";
import { Container, EmptyState, PageTitle } from "../ui/States";
import { CheckIcon } from "../ui/Icons";
import Img from "../ui/Img";
import NotFound from "./NotFound";

const PAYMENT_LABEL = { cod: "Cash on delivery", upi: "UPI", card: "Card" };

const date = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

function deliveryBy(iso) {
  const d = new Date(iso);
  d.setDate(d.getDate() + 4);
  return d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" });
}

export function OrderDetail() {
  const { id } = useParams();
  const { orders } = useStore();
  const { state } = useLocation();
  const order = orders.find((o) => o.id === id);

  if (!order) return <NotFound what="order" />;

  return (
    <Container className="max-w-3xl py-8 sm:py-12">
      {state?.justPlaced && (
        <div className="mb-8 flex items-start gap-4 rounded-xl border border-green-200 bg-green-50 p-5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-green-600 text-white">
            <CheckIcon />
          </span>
          <div>
            <p className="font-semibold text-green-900">Order placed</p>
            <p className="mt-0.5 text-sm text-green-800">Arriving by {deliveryBy(order.placedAt)}.</p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Order {order.id}</h1>
          <p className="mt-1 text-sm text-gray-500">Placed on {date(order.placedAt)}</p>
        </div>
        <Link to="/account" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">All orders</Link>
      </div>

      <ul className="mt-6 divide-y divide-gray-100 rounded-xl border border-gray-200 bg-white">
        {order.items.map((i) => (
          <li key={i.key} className="flex items-center gap-4 p-4">
            <Img src={i.image} alt="" className="h-16 w-16 shrink-0 rounded-lg border border-gray-100 p-1.5" />
            <div className="min-w-0 flex-1">
              <Link to={`/product/${i.id}`} className="line-clamp-1 text-sm font-medium text-gray-900 hover:text-indigo-600">{i.title}</Link>
              <p className="mt-0.5 text-xs text-gray-500">Qty {i.qty}{i.size && ` · Size ${i.size}`}</p>
            </div>
            <p className="shrink-0 text-sm font-medium text-gray-900">{rupees(toInr(i.price) * i.qty)}</p>
          </li>
        ))}
      </ul>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5 text-sm">
          <p className="font-semibold text-gray-900">Delivering to</p>
          <p className="mt-2 text-gray-700">{order.address.name}</p>
          <p className="text-gray-600">{order.address.line1}</p>
          <p className="text-gray-600">{order.address.city}, {order.address.state} {order.address.pincode}</p>
          <p className="mt-1 text-gray-600">+91 {order.address.phone}</p>
        </div>
        <dl className="space-y-2 rounded-xl border border-gray-200 bg-white p-5 text-sm">
          <div className="flex justify-between"><dt className="text-gray-600">Items</dt><dd>{rupees(order.subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-gray-600">Delivery</dt><dd>{order.shipping ? rupees(order.shipping) : "Free"}</dd></div>
          <div className="flex justify-between border-t border-gray-100 pt-2 font-semibold"><dt>Total</dt><dd>{rupees(order.total)}</dd></div>
          <div className="flex justify-between pt-1 text-gray-600"><dt>Paid with</dt><dd>{PAYMENT_LABEL[order.payment]}</dd></div>
        </dl>
      </div>

      <Link to="/shop" className="mt-8 inline-flex h-11 items-center rounded-lg bg-indigo-500 px-6 text-sm font-medium text-white hover:bg-indigo-600">
        Continue shopping
      </Link>
    </Container>
  );
}

export default function Account() {
  const { user, orders, logout } = useStore();

  return (
    <Container className="max-w-4xl py-8 sm:py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageTitle sub={user.email}>Hi, {user.name.split(" ")[0]}</PageTitle>
        <button type="button" onClick={logout} className="h-10 rounded-lg border border-gray-300 px-4 text-sm text-gray-700 hover:border-gray-400">
          Sign out
        </button>
      </div>

      <h2 className="text-lg font-semibold text-gray-900">Your orders</h2>
      {orders.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-gray-300">
          <EmptyState title="No orders yet" body="When you place an order, it will show up here." action="Start shopping" />
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {orders.map((o) => (
            <li key={o.id}>
              <Link to={`/order/${o.id}`} className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-indigo-300">
                <div className="flex -space-x-3">
                  {o.items.slice(0, 3).map((i) => (
                    <Img key={i.key} src={i.image} alt="" className="h-12 w-12 rounded-lg border-2 border-white p-1 shadow-sm" />
                  ))}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">{o.id}</p>
                  <p className="text-xs text-gray-500">
                    {date(o.placedAt)} · {o.count} {o.count === 1 ? "item" : "items"}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-semibold text-gray-900">{rupees(o.total)}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
