import Logo from "./Logo";
import { Link } from "react-router-dom";
import { Container } from "./States";
import { SOCIALS } from "./Header";

const COLUMNS = [
  { title: "Information", links: [["About us", "/contact"], ["FAQs", "/contact"], ["Contact us", "/contact"]] },
  { title: "Account", links: [["My Account", "/account"], ["Order History", "/account"], ["Wishlist", "/wishlist"]] },
  { title: "Services", links: [["Return Policy", "/contact"], ["Privacy Policy", "/contact"], ["Terms & Condition", "/contact"]] },
];

export default function Footer() {
  return (
    <footer className="mt-20 bg-brand-ink text-gray-400">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-3 max-w-xs text-sm leading-relaxed">
            Clothing, jewellery and electronics at everyday prices, with free delivery over ₹999.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold text-white">{col.title}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {col.links.map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="transition hover:text-violet-300">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col-reverse items-center justify-between gap-4 py-6 text-xs sm:flex-row">
          <div className="flex items-center gap-5">
            {SOCIALS.map(({ label, Icon }) => (
              <span key={label} aria-label={label} className="transition hover:text-violet-300">
                <Icon />
              </span>
            ))}
          </div>
          <p>Copyright © {new Date().getFullYear()} FakeShop. All Rights Reserved</p>
        </Container>
      </div>
    </footer>
  );
}
