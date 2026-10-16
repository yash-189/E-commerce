import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import { rupees, toInr } from "../lib/format";
import { Container, PageBanner } from "../ui/States";
import Field from "../ui/Field";
import Img from "../ui/Img";
import { OrderSummary } from "./Cart";

const EMPTY = { name: "", phone: "", pincode: "", line1: "", city: "", state: "" };

function loadAddress(email) {
  try {
    return JSON.parse(localStorage.getItem(`fs.address.${email}`)) || null;
  } catch {
    return null;
  }
}

function validate(a) {
  const e = {};
  if (a.name.trim().length < 2) e.name = "Enter the name of the person receiving the order";
  if (!/^[6-9]\d{9}$/.test(a.phone)) e.phone = "Enter a 10-digit mobile number";
  if (!/^[1-9]\d{5}$/.test(a.pincode)) e.pincode = "Enter a 6-digit pincode";
  if (a.line1.trim().length < 6) e.line1 = "Add house number and street";
  if (!a.city.trim()) e.city = "Enter your city";
  if (!a.state.trim()) e.state = "Enter your state";
  return e;
}

const PAYMENTS = [
  { id: "cod", label: "Cash on delivery", note: "Pay when your order arrives" },
  { id: "upi", label: "UPI", note: "Demo only, no money is taken" },
  { id: "card", label: "Credit or debit card", note: "Demo only, no money is taken" },
];

export default function Checkout() {
  const { cart, user, placeOrder } = useStore();
  const navigate = useNavigate();
  const [address, setAddress] = useState(() => ({ ...EMPTY, name: user?.name || "", ...loadAddress(user?.email) }));
  const [errors, setErrors] = useState({});
  const [payment, setPayment] = useState("cod");
  const [submitting, setSubmitting] = useState(false);

  if (cart.length === 0 && !submitting) return <Navigate to="/cart" replace />;

  const onChange = (e) => {
    let { name, value } = e.target;
    if (name === "phone") value = value.replace(/\D/g, "").slice(0, 10);
    if (name === "pincode") value = value.replace(/\D/g, "").slice(0, 6);
    const next = { ...address, [name]: value };
    setAddress(next);
    if (errors[name]) setErrors(validate(next));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (submitting) return;
    const found = validate(address);
    setErrors(found);
    if (Object.keys(found).length) {
      document.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }
    setSubmitting(true);
    try {
      localStorage.setItem(`fs.address.${user.email}`, JSON.stringify(address));
    } catch {}
    setTimeout(() => {
      const order = placeOrder({ address, payment });
      navigate(`/order/${order.id}`, { replace: true, state: { justPlaced: true } });
    }, 700);
  };

  return (
    <>
    <PageBanner title="Checkout" />
    <Container className="py-8 sm:py-10">
      <form onSubmit={onSubmit} noValidate className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
        <div className="space-y-6">
          <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
            <h2 className="font-semibold text-gray-900">1. Delivery address</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" name="name" autoComplete="name" value={address.name} onChange={onChange} error={errors.name} />
              <Field label="Mobile number" name="phone" type="tel" inputMode="numeric" autoComplete="tel-national" value={address.phone} onChange={onChange} error={errors.phone} />
              <Field className="sm:col-span-2" label="House number and street" name="line1" autoComplete="address-line1" value={address.line1} onChange={onChange} error={errors.line1} />
              <Field label="Pincode" name="pincode" inputMode="numeric" autoComplete="postal-code" value={address.pincode} onChange={onChange} error={errors.pincode} />
              <Field label="City" name="city" autoComplete="address-level2" value={address.city} onChange={onChange} error={errors.city} />
              <Field className="sm:col-span-2" label="State" name="state" autoComplete="address-level1" value={address.state} onChange={onChange} error={errors.state} />
            </div>
          </section>

          <fieldset className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
            <legend className="sr-only">Payment method</legend>
            <h2 className="font-semibold text-gray-900">2. Payment</h2>
            <div className="mt-4 space-y-2">
              {PAYMENTS.map((p) => (
                <label
                  key={p.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition ${
                    payment === p.id ? "border-violet-500 bg-violet-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={p.id}
                    checked={payment === p.id}
                    onChange={() => setPayment(p.id)}
                    className="h-4 w-4 accent-violet-500"
                  />
                  <span>
                    <span className="block text-sm font-medium text-gray-900">{p.label}</span>
                    <span className="block text-xs text-gray-500">{p.note}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="lg:sticky lg:top-24">
          <OrderSummary>
            <ul className="mt-4 max-h-60 space-y-3 overflow-y-auto border-t border-gray-100 pt-4">
              {cart.map((i) => (
                <li key={i.key} className="flex items-center gap-3 text-sm">
                  <Img src={i.image} alt="" className="h-12 w-12 shrink-0 rounded border border-gray-100 p-1" />
                  <span className="line-clamp-1 flex-1 text-gray-700">
                    {i.qty} × {i.title}
                    {i.size && ` (${i.size})`}
                  </span>
                  <span className="shrink-0 text-gray-900">{rupees(toInr(i.price) * i.qty)}</span>
                </li>
              ))}
            </ul>
            <button
              type="submit"
              disabled={submitting}
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand font-medium text-white hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
            >
              {submitting && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
              {submitting ? "Placing order" : "Place order"}
            </button>
          </OrderSummary>
        </div>
      </form>
    </Container>
    </>
  );
}
