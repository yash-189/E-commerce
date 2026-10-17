import { useEffect, useState } from "react";
import { CheckIcon, PinIcon, ShareIcon, StarIcon, TagIcon } from "./Icons";
import Img from "./Img";
import { useStore } from "../store/StoreContext";

const RECENT_KEY = "fs.recent";

export function useRecentlyViewed(product) {
  const [recent, setRecent] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(RECENT_KEY));
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (!product) return;
    setRecent((list) => {
      const next = [product, ...list.filter((p) => p.id !== product.id)].slice(0, 9);
      try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, [product]);

  return recent.filter((p) => p.id !== product?.id).slice(0, 8);
}

export function ZoomImage({ src, alt }) {
  const [origin, setOrigin] = useState(null);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={() => setOrigin(null)}
      style={origin ? { "--zoom-origin": origin } : undefined}
      className={`rise relative aspect-square cursor-zoom-in overflow-hidden rounded-3xl bg-[#f7f4fd] ${origin ? "is-zooming" : ""}`}
    >
      <Img
        src={src}
        alt={alt}
        className="h-full w-full !bg-transparent p-10 sm:p-16"
        imgClassName="mix-blend-multiply !duration-200"
      />
    </div>
  );
}

export function ShareButton({ title }) {
  const { notify } = useStore();

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      notify("Link copied");
    } catch (e) {
      if (e?.name !== "AbortError") notify("Couldn't share this link");
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-gray-200 px-3.5 text-sm text-gray-700 transition hover:border-violet-300 hover:text-violet-600"
    >
      <ShareIcon width={15} height={15} /> Share
    </button>
  );
}

const OFFERS = [
  { code: "WELCOME10", text: "10% off your first order" },
  { code: "UPI50", text: "Flat ₹50 off on UPI payments above ₹499" },
  { code: "FREESHIP", text: "Free delivery on every order this week" },
];

export function Offers() {
  const { notify } = useStore();
  const [copied, setCopied] = useState(null);

  const copy = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(code);
      notify(`Code ${code} copied`);
    } catch {
      notify(`Use code ${code} at checkout`);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="flex items-center gap-2 text-sm font-medium text-gray-900">
        <TagIcon width={16} height={16} className="text-violet-500" /> Available offers
      </h2>
      <ul className="mt-3 space-y-2">
        {OFFERS.map((o) => (
          <li key={o.code} className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-violet-200 px-3.5 py-2.5 text-sm">
            <span className="text-gray-700">{o.text}</span>
            <button
              type="button"
              onClick={() => copy(o.code)}
              className="w-24 shrink-0 rounded-lg bg-violet-50 py-1 text-center text-xs font-semibold tracking-wider text-violet-600 transition hover:bg-violet-100"
            >
              {copied === o.code ? "Copied" : o.code}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const addDays = (n) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
};

export function DeliveryCheck({ free }) {
  const [pin, setPin] = useState(() => {
    try {
      return localStorage.getItem("fs.pincode") || "";
    } catch {
      return "";
    }
  });
  const [result, setResult] = useState(null);

  const check = (e) => {
    e.preventDefault();
    if (!/^[1-9]\d{5}$/.test(pin)) {
      setResult({ error: "Enter a valid 6-digit pincode" });
      return;
    }
    try {
      localStorage.setItem("fs.pincode", pin);
    } catch {}
    const metro = /^(11|40|56|60|70|50)/.test(pin);
    setResult({ date: addDays(metro ? 2 : 4), metro });
  };

  return (
    <div className="mt-8 rounded-2xl bg-[#faf8fe] p-4">
      <h2 className="flex items-center gap-2 text-sm font-medium text-gray-900">
        <PinIcon width={16} height={16} className="text-violet-500" /> Check delivery
      </h2>
      <form onSubmit={check} className="mt-3 flex gap-2">
        <label htmlFor="pincode" className="sr-only">Pincode</label>
        <input
          id="pincode"
          inputMode="numeric"
          maxLength={6}
          value={pin}
          onChange={(e) => {
            setPin(e.target.value.replace(/\D/g, ""));
            setResult(null);
          }}
          placeholder="Enter pincode"
          aria-invalid={!!result?.error}
          aria-describedby="pincode-result"
          className="h-11 min-w-0 flex-1 rounded-full border border-gray-200 bg-white px-4 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
        />
        <button type="submit" className="h-11 rounded-full px-5 text-sm font-medium text-violet-600 ring-1 ring-violet-300 transition hover:bg-violet-50">
          Check
        </button>
      </form>
      <div id="pincode-result" role="status" className="mt-2 min-h-[1.25rem] text-sm">
        {result?.error && <span className="text-red-600">{result.error}</span>}
        {result?.date && (
          <span className="rise inline-flex items-center gap-1.5 text-gray-700">
            <CheckIcon width={15} height={15} className="text-green-600" />
            Delivery by <b className="font-medium text-gray-900">{result.date}{free ? ", free" : ""}</b>
            {result.metro && <span className="text-gray-500">(express)</span>}
          </span>
        )}
      </div>
    </div>
  );
}

const SPECS = {
  "men's clothing": [["Fit", "Regular"], ["Fabric", "Cotton blend"], ["Care", "Machine wash cold"], ["Origin", "India"]],
  "women's clothing": [["Fit", "Regular"], ["Fabric", "Polyester blend"], ["Care", "Hand wash"], ["Origin", "India"]],
  jewelery: [["Material", "Plated alloy"], ["Finish", "Polished"], ["Packaging", "Gift box"], ["Care", "Keep away from water"]],
  electronics: [["Warranty", "1 year"], ["In the box", "Device, manual"], ["Support", "Brand service centres"], ["Returns", "7 days, if sealed"]],
};

function Reviews({ rating }) {
  if (!rating) return <p className="text-sm text-gray-500">No ratings yet.</p>;
  const { rate, count } = rating;
  const weights = [5, 4, 3, 2, 1].map((s) => Math.max(0.02, 1 - Math.abs(s - rate) / 2.2));
  const total = weights.reduce((a, b) => a + b, 0);

  return (
    <div className="grid gap-8 sm:grid-cols-[180px_1fr] sm:items-center">
      <div className="text-center sm:text-left">
        <p className="font-display text-5xl font-semibold text-gray-900">{rate.toFixed(1)}</p>
        <div className="mt-2 flex justify-center gap-0.5 text-amber-400 sm:justify-start">
          {[1, 2, 3, 4, 5].map((s) => (
            <StarIcon key={s} width={16} height={16} className={s <= Math.round(rate) ? "" : "text-gray-200"} />
          ))}
        </div>
        <p className="mt-1 text-sm text-gray-500">{count.toLocaleString("en-IN")} ratings</p>
      </div>
      <ul className="space-y-2">
        {[5, 4, 3, 2, 1].map((s, i) => {
          const pct = Math.round((weights[i] / total) * 100);
          return (
            <li key={s} className="flex items-center gap-3 text-sm">
              <span className="w-6 text-gray-600">{s}★</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                <span className="block h-full rounded-full bg-brand transition-[width] duration-700" style={{ width: `${pct}%` }} />
              </span>
              <span className="w-10 text-right text-gray-500">{pct}%</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function DetailTabs({ product }) {
  const tabs = [
    ["Description", <p key="d" className="leading-relaxed text-gray-600">{product.description}</p>],
    [
      "Specifications",
      <dl key="s" className="grid gap-x-8 sm:grid-cols-2">
        {(SPECS[product.category] || []).map(([k, v]) => (
          <div key={k} className="flex justify-between border-b border-gray-100 py-3 text-sm">
            <dt className="text-gray-500">{k}</dt>
            <dd className="text-gray-900">{v}</dd>
          </div>
        ))}
      </dl>,
    ],
    [
      "Shipping & returns",
      <ul key="r" className="space-y-2 text-sm text-gray-600">
        <li>Ships in 24 hours. Free delivery on orders over ₹999, otherwise ₹49.</li>
        <li>Easy 7-day returns. Pickup from your doorstep, refund to the original payment method.</li>
        <li>Cash on delivery available on all pincodes we serve.</li>
      </ul>,
    ],
    ["Ratings", <Reviews key="v" rating={product.rating} />],
  ];
  const [active, setActive] = useState(0);

  const onKey = (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = (active + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
    setActive(next);
    document.getElementById(`tab-${next}`)?.focus();
  };

  return (
    <section className="mt-16">
      <div role="tablist" aria-label="Product information" onKeyDown={onKey} className="flex gap-1 overflow-x-auto border-b border-gray-100">
        {tabs.map(([label], i) => (
          <button
            key={label}
            id={`tab-${i}`}
            role="tab"
            type="button"
            aria-selected={active === i}
            aria-controls={`panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            className={`relative shrink-0 px-4 py-3 text-sm transition ${active === i ? "font-medium text-violet-600" : "text-gray-500 hover:text-gray-900"}`}
          >
            {label}
            {active === i && <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand" />}
          </button>
        ))}
      </div>
      <div key={active} id={`panel-${active}`} role="tabpanel" aria-labelledby={`tab-${active}`} className="rise max-w-3xl py-6">
        {tabs[active][1]}
      </div>
    </section>
  );
}
