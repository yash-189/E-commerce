import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Container } from "./States";
import { SOCIALS } from "./Header";
import { CashIcon, ReturnIcon, ShieldIcon, TruckIcon } from "./Icons";

const COLUMNS = [
  { title: "Shop", links: [["All products", "/shop"], ["Men", "/shop/men"], ["Women", "/shop/women"], ["Jewellery", "/shop/jewelery"], ["Electronics", "/shop/electronics"]] },
  { title: "Account", links: [["My account", "/account"], ["Order history", "/account"], ["Wishlist", "/wishlist"], ["Cart", "/cart"]] },
  { title: "Help", links: [["Contact us", "/contact"], ["Return policy", "/contact"], ["Privacy policy", "/contact"], ["Terms", "/contact"]] },
];

const PROMISES = [
  { Icon: TruckIcon, label: "Free delivery over ₹999" },
  { Icon: ReturnIcon, label: "7-day easy returns" },
  { Icon: CashIcon, label: "Cash on delivery" },
  { Icon: ShieldIcon, label: "Secure checkout" },
];

const PAYMENTS = ["UPI", "Visa", "Mastercard", "RuPay", "COD"];

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden rounded-t-[2rem] bg-brand-ink text-gray-400">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-[#8093f1]/20 blur-3xl" aria-hidden="true" />

      <Container className="relative">
        <ul className="grid grid-cols-2 gap-3 border-b border-white/10 py-8 lg:grid-cols-4">
          {PROMISES.map(({ Icon, label }) => (
            <li key={label} className="flex items-center gap-3 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand text-white">
                <Icon width={18} height={18} />
              </span>
              <span className="text-sm text-gray-200">{label}</span>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 sm:grid-cols-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Clothing, jewellery and electronics at everyday prices, delivered across India.
            </p>
            <div className="mt-6 flex gap-2">
              {SOCIALS.map(({ label, Icon }) => (
                <span
                  key={label}
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-gray-300 ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-brand hover:text-white hover:ring-transparent"
                >
                  <Icon width={16} height={16} />
                </span>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-white">{col.title}</p>
              <ul className="mt-5 space-y-3 text-sm">
                {col.links.map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} className="group inline-flex items-center transition hover:text-white">
                      <span className="h-px w-0 bg-[#b388eb] transition-all duration-300 group-hover:mr-2 group-hover:w-3" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Container>

      <div className="relative border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} FakeShop. All rights reserved.</p>
          <ul className="flex flex-wrap justify-center gap-2" aria-label="Payment methods">
            {PAYMENTS.map((p) => (
              <li key={p} className="rounded-md bg-white/5 px-2.5 py-1 font-medium text-gray-300 ring-1 ring-white/10">{p}</li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
