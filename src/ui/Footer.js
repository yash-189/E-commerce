import { Link } from "react-router-dom";
import { CATEGORY_LABELS, categorySlug } from "../lib/format";
import { Container } from "./States";

export default function Footer() {
  return (
    <footer className="mt-20 bg-gray-800 text-gray-300">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <p className="text-lg font-bold text-white">
            Fake<span className="text-indigo-400">Shop</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-400">
            A demo store built with React and Tailwind. Products come from the Fake Store API, and
            nothing you order here will ship.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Shop</p>
          <ul className="mt-3 space-y-2 text-sm">
            {Object.keys(CATEGORY_LABELS).map((c) => (
              <li key={c}>
                <Link to={`/shop/${categorySlug(c)}`} className="hover:text-white">{CATEGORY_LABELS[c]}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Account</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/account" className="hover:text-white">Orders</Link></li>
            <li><Link to="/wishlist" className="hover:text-white">Wishlist</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Help</p>
          <ul className="mt-3 space-y-2 text-sm text-gray-400">
            <li>Free delivery over ₹999</li>
            <li>7-day returns</li>
            <li>Cash on delivery</li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-gray-700">
        <Container className="py-5 text-xs text-gray-400">© {new Date().getFullYear()} FakeShop. Demo project.</Container>
      </div>
    </footer>
  );
}
