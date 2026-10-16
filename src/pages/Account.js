import { useMemo, useState } from "react";
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import { useStore, DEMO_ACCOUNT } from "../store/StoreContext";
import { rupees, toInr } from "../lib/format";
import { EMPTY_ADDRESS, loadAddress, saveAddress, validateAddress } from "../lib/address";
import { ORDER_STEPS, deliveryDate, orderDate, orderProgress } from "../lib/orders";
import { Container, EmptyState } from "../ui/States";
import { BagIcon, CheckIcon, HeartIcon, PinIcon, SearchIcon, UserIcon } from "../ui/Icons";
import success from "../assets/success.png";
import Field from "../ui/Field";
import Img from "../ui/Img";
import NotFound from "./NotFound";

const PAYMENT_LABEL = { cod: "Cash on delivery", upi: "UPI", card: "Card" };

const TABS = [
  { id: "overview", label: "Overview", Icon: UserIcon },
  { id: "orders", label: "Orders", Icon: BagIcon },
  { id: "addresses", label: "Address", Icon: PinIcon },
  { id: "settings", label: "Settings", Icon: CheckIcon },
];

const STATUS_STYLE = {
  Placed: "bg-gray-100 text-gray-700",
  Shipped: "bg-blue-50 text-blue-700",
  "Out for delivery": "bg-amber-50 text-amber-700",
  Delivered: "bg-green-50 text-green-700",
};

function StatusBadge({ order }) {
  const { status } = orderProgress(order);
  return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLE[status]}`}>{status}</span>;
}

function Tracker({ order }) {
  const { step } = orderProgress(order);
  return (
    <ol className="grid grid-cols-4" aria-label="Order progress">
      {ORDER_STEPS.map((label, i) => {
        const done = i <= step;
        return (
          <li key={label} className="relative flex flex-col items-center text-center" aria-current={i === step ? "step" : undefined}>
            {i > 0 && (
              <span className={`absolute right-1/2 top-3.5 h-0.5 w-full -translate-y-1/2 ${i <= step ? "bg-brand" : "bg-gray-200"}`} aria-hidden="true" />
            )}
            <span className={`relative grid h-7 w-7 place-items-center rounded-full text-xs ${done ? "bg-brand text-white" : "bg-gray-100 text-gray-400"}`}>
              {done ? <CheckIcon width={14} height={14} /> : i + 1}
            </span>
            <span className={`mt-2 text-[11px] sm:text-xs ${i === step ? "font-medium text-gray-900" : "text-gray-500"}`}>{label}</span>
          </li>
        );
      })}
    </ol>
  );
}

function Card({ title, action, children, className = "" }) {
  return (
    <section className={`rounded-2xl border border-gray-100 bg-white p-5 sm:p-6 ${className}`}>
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && <h2 className="text-lg font-medium text-gray-900">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

function OrderRow({ order }) {
  return (
    <li>
      <Link
        to={`/order/${order.id}`}
        className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 transition hover:border-violet-200 hover:shadow-sm sm:gap-4 sm:p-4"
      >
        <div className="flex shrink-0 -space-x-3">
          {order.items.slice(0, 3).map((i) => (
            <Img key={i.key} src={i.image} alt="" className="h-12 w-12 rounded-xl border-2 border-white !bg-[#f7f4fd] p-1.5" imgClassName="mix-blend-multiply" />
          ))}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900">{order.id}</p>
          <p className="text-xs text-gray-500">
            {orderDate(order.placedAt)}
            <span className="hidden sm:inline"> · {order.count} {order.count === 1 ? "item" : "items"}</span>
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5 sm:flex-row-reverse sm:items-center sm:gap-4">
          <p className="text-sm font-semibold text-gray-900 sm:w-20 sm:text-right">{rupees(order.total)}</p>
          <StatusBadge order={order} />
        </div>
      </Link>
    </li>
  );
}

function Overview({ orders, go }) {
  const { wishlist, totals } = useStore();
  const spent = orders.reduce((n, o) => n + o.total, 0);
  const active = orders.filter((o) => !orderProgress(o).delivered).length;
  const stats = [
    { label: "Orders", value: orders.length, onClick: () => go("orders") },
    { label: "In transit", value: active, onClick: () => go("orders") },
    { label: "Wishlist", value: wishlist.length, to: "/wishlist" },
    { label: "Total spent", value: rupees(spent) },
  ];

  return (
    <div className="space-y-6">
      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => {
          const body = (
            <>
              <span className="block text-xs text-gray-500">{s.label}</span>
              <span className="mt-1 block font-display text-2xl font-semibold text-gray-900">{s.value}</span>
            </>
          );
          const cls = "block w-full rounded-2xl bg-[#faf8fe] p-4 text-left transition hover:bg-[#f3edfd]";
          return (
            <li key={s.label}>
              {s.to ? <Link to={s.to} className={cls}>{body}</Link> : s.onClick ? <button type="button" onClick={s.onClick} className={cls}>{body}</button> : <div className={cls}>{body}</div>}
            </li>
          );
        })}
      </ul>

      <Card
        title="Recent orders"
        action={orders.length > 3 && <button type="button" onClick={() => go("orders")} className="text-sm font-medium text-violet-600 hover:text-violet-700">View all</button>}
      >
        {orders.length === 0 ? (
          <EmptyState title="No orders yet" body="When you place an order, it will show up here." action="Start shopping" />
        ) : (
          <ul className="space-y-3">{orders.slice(0, 3).map((o) => <OrderRow key={o.id} order={o} />)}</ul>
        )}
      </Card>

      {totals.count > 0 && (
        <Link to="/cart" className="flex items-center justify-between gap-4 rounded-2xl bg-brand-soft p-5 text-white transition hover:opacity-95">
          <span>
            <span className="block font-medium">You have {totals.count} {totals.count === 1 ? "item" : "items"} in your cart</span>
            <span className="block text-sm text-white/85">{rupees(totals.total)} · finish checking out</span>
          </span>
          <BagIcon />
        </Link>
      )}
    </div>
  );
}

function Orders({ orders }) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");
  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return orders.filter((o) => {
      if (filter !== "All" && orderProgress(o).status !== filter) return false;
      if (!term) return true;
      return o.id.toLowerCase().includes(term) || o.items.some((i) => i.title.toLowerCase().includes(term));
    });
  }, [orders, q, filter]);

  if (orders.length === 0) {
    return (
      <Card>
        <EmptyState title="No orders yet" body="When you place an order, it will show up here." action="Start shopping" />
      </Card>
    );
  }

  return (
    <Card title={`Orders (${orders.length})`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search orders</span>
          <SearchIcon width={16} height={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by order ID or product"
            className="h-11 w-full rounded-full border border-gray-200 bg-gray-50/60 pl-10 pr-4 text-sm outline-none focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
          />
        </label>
        <div className="flex gap-2 overflow-x-auto">
          {["All", ...ORDER_STEPS].map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={filter === s}
              onClick={() => setFilter(s)}
              className={`h-9 shrink-0 rounded-full px-3.5 text-xs font-medium transition ${filter === s ? "bg-violet-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      {list.length === 0 ? (
        <p className="py-10 text-center text-sm text-gray-500">
          No orders match.{" "}
          <button type="button" onClick={() => { setQ(""); setFilter("All"); }} className="font-medium text-violet-600">Clear filters</button>
        </p>
      ) : (
        <ul className="mt-5 space-y-3">{list.map((o) => <OrderRow key={o.id} order={o} />)}</ul>
      )}
    </Card>
  );
}

function Addresses() {
  const { user, notify } = useStore();
  const [saved, setSaved] = useState(() => loadAddress(user.email));
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState(saved || { ...EMPTY_ADDRESS, name: user.name });
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const { name } = e.target;
    let { value } = e.target;
    if (name === "phone" || name === "pincode") value = value.replace(/\D/g, "").slice(0, name === "phone" ? 10 : 6);
    const next = { ...values, [name]: value };
    setValues(next);
    if (errors[name]) setErrors(validateAddress(next));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validateAddress(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }
    if (!saveAddress(user.email, values)) {
      notify("Couldn't save, storage is full or blocked");
      return;
    }
    setSaved(values);
    setEditing(false);
    notify("Address saved");
  };

  const remove = () => {
    try {
      localStorage.removeItem(`fs.address.${user.email}`);
    } catch {}
    setSaved(null);
    setValues({ ...EMPTY_ADDRESS, name: user.name });
    notify("Address removed");
  };

  if (editing || !saved) {
    return (
      <Card title={saved ? "Edit address" : "Add a delivery address"}>
        {!saved && !editing && <p className="-mt-2 mb-5 text-sm text-gray-500">Save it once and checkout fills it in for you.</p>}
        <form onSubmit={onSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" name="name" autoComplete="name" value={values.name} onChange={onChange} error={errors.name} />
          <Field label="Mobile number" name="phone" type="tel" inputMode="numeric" autoComplete="tel-national" value={values.phone} onChange={onChange} error={errors.phone} />
          <Field className="sm:col-span-2" label="House number and street" name="line1" autoComplete="address-line1" value={values.line1} onChange={onChange} error={errors.line1} />
          <Field label="Pincode" name="pincode" inputMode="numeric" autoComplete="postal-code" value={values.pincode} onChange={onChange} error={errors.pincode} />
          <Field label="City" name="city" autoComplete="address-level2" value={values.city} onChange={onChange} error={errors.city} />
          <Field className="sm:col-span-2" label="State" name="state" autoComplete="address-level1" value={values.state} onChange={onChange} error={errors.state} />
          <div className="flex gap-3 sm:col-span-2">
            <button type="submit" className="h-11 rounded-full bg-brand px-6 text-sm font-medium text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5">Save address</button>
            {saved && (
              <button type="button" onClick={() => { setValues(saved); setErrors({}); setEditing(false); }} className="h-11 rounded-full px-5 text-sm text-gray-600 hover:text-gray-900">
                Cancel
              </button>
            )}
          </div>
        </form>
      </Card>
    );
  }

  return (
    <Card title="Delivery address">
      <div className="rounded-2xl border border-violet-200 bg-[#faf8fe] p-5 text-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 font-medium text-gray-900">
              {saved.name}
              <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-violet-600">Default</span>
            </p>
            <p className="mt-2 text-gray-600">{saved.line1}</p>
            <p className="text-gray-600">{saved.city}, {saved.state} {saved.pincode}</p>
            <p className="mt-1 text-gray-600">+91 {saved.phone}</p>
          </div>
          <div className="flex shrink-0 gap-3 text-sm font-medium">
            <button type="button" onClick={() => setEditing(true)} className="text-violet-600 hover:text-violet-700">Edit</button>
            <button type="button" onClick={remove} className="text-gray-500 hover:text-red-600">Remove</button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function Settings() {
  const { user, updateProfile, changePassword, notify } = useStore();
  const [name, setName] = useState(user.name);
  const [nameError, setNameError] = useState("");
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [pwErrors, setPwErrors] = useState({});
  const isDemo = user.email === DEMO_ACCOUNT.email;

  const saveName = (e) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setNameError("Name is too short");
      return;
    }
    setNameError("");
    updateProfile({ name });
    notify("Profile updated");
  };

  const savePassword = (e) => {
    e.preventDefault();
    const found = {};
    if (!pw.current) found.current = "Enter your current password";
    if (pw.next.length < 8) found.next = "Use at least 8 characters";
    if (pw.confirm !== pw.next) found.confirm = "Passwords don't match";
    setPwErrors(found);
    if (Object.keys(found).length) return;
    try {
      changePassword({ current: pw.current, next: pw.next });
      setPw({ current: "", next: "", confirm: "" });
      notify("Password changed");
    } catch (err) {
      setPwErrors({ form: err.message });
    }
  };

  const onPw = (e) => {
    setPw({ ...pw, [e.target.name]: e.target.value });
    if (pwErrors[e.target.name] || pwErrors.form) setPwErrors({});
  };

  return (
    <div className="space-y-6">
      <Card title="Profile">
        <form onSubmit={saveName} noValidate className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" name="profile-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} error={nameError} />
          <Field label="Email" name="profile-email" value={user.email} disabled readOnly hint="Email can't be changed" />
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={name.trim() === user.name}
              className="h-11 rounded-full bg-brand px-6 text-sm font-medium text-white transition hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Save changes
            </button>
          </div>
        </form>
      </Card>

      <Card title="Password">
        {isDemo ? (
          <p className="text-sm text-gray-500">The demo account's password is fixed so everyone can sign in. Create your own account to try this.</p>
        ) : (
          <form onSubmit={savePassword} noValidate className="grid gap-4 sm:grid-cols-2">
            {pwErrors.form && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 sm:col-span-2">{pwErrors.form}</p>}
            <Field className="sm:col-span-2" label="Current password" name="current" type="password" autoComplete="current-password" value={pw.current} onChange={onPw} error={pwErrors.current} />
            <Field label="New password" name="next" type="password" autoComplete="new-password" value={pw.next} onChange={onPw} error={pwErrors.next} />
            <Field label="Confirm new password" name="confirm" type="password" autoComplete="new-password" value={pw.confirm} onChange={onPw} error={pwErrors.confirm} />
            <div className="sm:col-span-2">
              <button type="submit" className="h-11 rounded-full border border-violet-300 px-6 text-sm font-medium text-violet-600 transition hover:bg-violet-50">
                Update password
              </button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}

export default function Account() {
  const { user, orders, logout } = useStore();
  const [params, setParams] = useSearchParams();
  const [confirmOut, setConfirmOut] = useState(false);
  const tab = TABS.some((t) => t.id === params.get("tab")) ? params.get("tab") : "overview";
  const go = (id) => setParams(id === "overview" ? {} : { tab: id });
  const since = orders.length ? orderDate(orders[orders.length - 1].placedAt) : null;

  return (
    <Container className="py-8 sm:py-12">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-brand-soft p-6 text-white sm:p-8">
        <div className="flex min-w-0 items-center gap-4">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-xl font-semibold text-violet-600 sm:h-16 sm:w-16 sm:text-2xl">
            {user.name.charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-medium sm:text-3xl">Hi, {user.name.split(" ")[0]}</h1>
            <p className="truncate text-sm text-white/85">{user.email}{since && ` · Customer since ${since}`}</p>
          </div>
        </div>
        {confirmOut ? (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-white/90">Sign out?</span>
            <button type="button" onClick={logout} className="h-9 rounded-full bg-white px-4 font-medium text-violet-600">Yes</button>
            <button type="button" onClick={() => setConfirmOut(false)} className="h-9 rounded-full px-3 text-white/90 hover:text-white">Cancel</button>
          </div>
        ) : (
          <button type="button" onClick={() => setConfirmOut(true)} className="h-10 rounded-full bg-white/15 px-5 text-sm font-medium backdrop-blur transition hover:bg-white/25">
            Sign out
          </button>
        )}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[220px_1fr] lg:items-start">
        <nav aria-label="Account sections" className="-mx-4 flex gap-2 overflow-x-auto px-4 lg:sticky lg:top-24 lg:mx-0 lg:flex-col lg:gap-1 lg:px-0">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => go(id)}
              aria-current={tab === id ? "page" : undefined}
              className={`flex shrink-0 items-center gap-3 rounded-full px-4 py-2.5 text-sm transition lg:rounded-xl ${
                tab === id ? "bg-violet-50 font-medium text-violet-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon width={17} height={17} />
              {label}
              {id === "orders" && orders.length > 0 && (
                <span className="ml-auto rounded-full bg-white px-2 text-xs text-gray-500">{orders.length}</span>
              )}
            </button>
          ))}
          <Link to="/wishlist" className="flex shrink-0 items-center gap-3 rounded-full px-4 py-2.5 text-sm text-gray-600 transition hover:bg-gray-50 hover:text-gray-900 lg:rounded-xl">
            <HeartIcon width={17} height={17} /> Wishlist
          </Link>
        </nav>

        <div className="min-w-0">
          {tab === "overview" && <Overview orders={orders} go={go} />}
          {tab === "orders" && <Orders orders={orders} />}
          {tab === "addresses" && <Addresses />}
          {tab === "settings" && <Settings />}
        </div>
      </div>
    </Container>
  );
}

export function OrderDetail() {
  const { id } = useParams();
  const { orders, addToCart, notify } = useStore();
  const { state } = useLocation();
  const order = orders.find((o) => o.id === id);

  if (!order) return <NotFound what="order" />;

  const { delivered } = orderProgress(order);

  const buyAgain = () => {
    order.items.forEach((i) => addToCart(i, i.qty, i.size));
    notify("Items added to your cart");
  };

  return (
    <Container className="max-w-4xl py-8 sm:py-12">
      {state?.justPlaced && (
        <div className="mb-10 flex flex-col items-center text-center">
          <img src={success} alt="" className="w-40" />
          <p className="mt-4 text-2xl font-medium text-gray-900">Order placed successfully</p>
          <p className="mt-1 text-gray-600">Arriving by {deliveryDate(order.placedAt)}.</p>
        </div>
      )}

      <Link to="/account?tab=orders" className="text-sm text-gray-500 hover:text-violet-600">← All orders</Link>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-medium text-gray-900 sm:text-3xl">Order {order.id}</h1>
            <StatusBadge order={order} />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Placed on {orderDate(order.placedAt)} · {delivered ? "Delivered" : `Arriving by ${deliveryDate(order.placedAt)}`}
          </p>
        </div>
        <div className="flex gap-2 print:hidden">
          <button type="button" onClick={() => window.print()} className="h-10 rounded-full border border-gray-200 px-4 text-sm text-gray-700 transition hover:border-violet-300 hover:text-violet-600">
            Invoice
          </button>
          <button type="button" onClick={buyAgain} className="h-10 rounded-full bg-brand px-5 text-sm font-medium text-white transition hover:-translate-y-0.5">
            Buy again
          </button>
        </div>
      </div>

      <Card className="mt-6">
        <Tracker order={order} />
      </Card>

      <Card title="Items" className="mt-6">
        <ul className="divide-y divide-gray-100">
          {order.items.map((i) => (
            <li key={i.key} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
              <Img src={i.image} alt="" className="h-16 w-16 shrink-0 rounded-xl !bg-[#f7f4fd] p-2" imgClassName="mix-blend-multiply" />
              <div className="min-w-0 flex-1">
                <Link to={`/product/${i.id}`} className="line-clamp-1 text-sm font-medium text-gray-900 hover:text-violet-600">{i.title}</Link>
                <p className="mt-0.5 text-xs text-gray-500">Qty {i.qty}{i.size && ` · Size ${i.size}`}</p>
              </div>
              <p className="shrink-0 text-sm font-medium text-gray-900">{rupees(toInr(i.price) * i.qty)}</p>
            </li>
          ))}
        </ul>
      </Card>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <Card title="Delivering to">
          <div className="text-sm">
            <p className="text-gray-900">{order.address.name}</p>
            <p className="text-gray-600">{order.address.line1}</p>
            <p className="text-gray-600">{order.address.city}, {order.address.state} {order.address.pincode}</p>
            <p className="mt-1 text-gray-600">+91 {order.address.phone}</p>
          </div>
        </Card>
        <Card title="Payment">
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-gray-600">Items</dt><dd>{rupees(order.subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-600">Delivery</dt><dd>{order.shipping ? rupees(order.shipping) : "Free"}</dd></div>
            <div className="flex justify-between border-t border-gray-100 pt-2 font-semibold"><dt>Total</dt><dd>{rupees(order.total)}</dd></div>
            <div className="flex justify-between pt-1 text-gray-600"><dt>Paid with</dt><dd>{PAYMENT_LABEL[order.payment]}</dd></div>
          </dl>
        </Card>
      </div>
    </Container>
  );
}
