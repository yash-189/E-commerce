import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import { CATEGORY_LABELS, categorySlug } from "../lib/format";
import { BagIcon, CloseIcon, HeartIcon, MenuIcon, SearchIcon, UserIcon } from "./Icons";
import { Container } from "./States";

function Badge({ n }) {
  if (!n) return null;
  return (
    <span className="absolute -right-1.5 -top-1.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-indigo-500 px-1 text-[10px] font-semibold text-white">
      {n > 99 ? "99+" : n}
    </span>
  );
}

function SearchBox({ onDone, autoFocus }) {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");

  useEffect(() => {
    setQ(params.get("q") || "");
  }, [params]);

  const submit = (e) => {
    e.preventDefault();
    const term = q.trim();
    navigate(term ? `/shop?q=${encodeURIComponent(term)}` : "/shop");
    onDone?.();
  };

  return (
    <form onSubmit={submit} role="search" className="relative w-full">
      <SearchIcon width={18} height={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search products"
        aria-label="Search products"
        autoFocus={autoFocus}
        maxLength={80}
        className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
      />
    </form>
  );
}

const navClass = ({ isActive }) =>
  `text-sm transition ${isActive ? "font-medium text-indigo-600" : "text-gray-600 hover:text-gray-900"}`;

export default function Header() {
  const { totals, wishlist, user } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <Container className="flex h-16 items-center gap-4 lg:gap-8">
        <button
          type="button"
          className="-ml-2 grid h-10 w-10 place-items-center text-gray-700 md:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <MenuIcon />
        </button>

        <Link to="/" className="text-lg font-bold tracking-tight text-gray-900">
          Fake<span className="text-indigo-500">Shop</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Categories">
          <NavLink to="/shop" end className={navClass}>All</NavLink>
          {Object.keys(CATEGORY_LABELS).map((c) => (
            <NavLink key={c} to={`/shop/${categorySlug(c)}`} className={navClass}>
              {CATEGORY_LABELS[c]}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto hidden max-w-xs flex-1 md:block">
          <SearchBox />
        </div>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <Link to="/wishlist" className="relative hidden h-10 w-10 place-items-center text-gray-700 hover:text-gray-900 sm:grid" aria-label={`Wishlist, ${wishlist.length} items`}>
            <HeartIcon />
            <Badge n={wishlist.length} />
          </Link>
          <Link to={user ? "/account" : "/login"} className="hidden h-10 items-center gap-2 px-2 text-sm text-gray-700 hover:text-gray-900 sm:flex" aria-label={user ? "Your account" : "Sign in"}>
            <UserIcon />
            <span className="hidden max-w-[7rem] truncate lg:inline">{user ? user.name.split(" ")[0] : "Sign in"}</span>
          </Link>
          <Link to="/cart" className="relative grid h-10 w-10 place-items-center text-gray-700 hover:text-gray-900" aria-label={`Cart, ${totals.count} items`}>
            <BagIcon />
            <Badge n={totals.count} />
          </Link>
        </div>
      </Container>

      <div className="border-t border-gray-100 px-4 py-2 md:hidden">
        <SearchBox />
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-gray-900/40" onClick={() => setMenuOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-72 flex-col bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">Fake<span className="text-indigo-500">Shop</span></span>
              <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu" className="grid h-10 w-10 place-items-center">
                <CloseIcon />
              </button>
            </div>
            <p className="mt-6 text-xs font-medium uppercase tracking-wider text-gray-400">Shop</p>
            <nav className="mt-2 flex flex-col">
              <NavLink to="/shop" end className="py-2.5 text-gray-800">All products</NavLink>
              {Object.keys(CATEGORY_LABELS).map((c) => (
                <NavLink key={c} to={`/shop/${categorySlug(c)}`} className="py-2.5 text-gray-800">
                  {CATEGORY_LABELS[c]}
                </NavLink>
              ))}
            </nav>
            <p className="mt-6 text-xs font-medium uppercase tracking-wider text-gray-400">You</p>
            <nav className="mt-2 flex flex-col">
              <Link to="/wishlist" className="py-2.5 text-gray-800">Wishlist ({wishlist.length})</Link>
              <Link to={user ? "/account" : "/login"} className="py-2.5 text-gray-800">{user ? "Account and orders" : "Sign in"}</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
