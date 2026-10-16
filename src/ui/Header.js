import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import { CATEGORY_LABELS, categorySlug } from "../lib/format";
import Logo from "./Logo";
import {
  BagIcon, ChevronIcon, CloseIcon, FacebookIcon, HeartIcon, InstagramIcon,
  LinkedinIcon, MenuIcon, SearchIcon, TwitterIcon, UserIcon,
} from "./Icons";
import { Container } from "./States";

export const SOCIALS = [
  { label: "Facebook", Icon: FacebookIcon },
  { label: "Twitter", Icon: TwitterIcon },
  { label: "Instagram", Icon: InstagramIcon },
  { label: "LinkedIn", Icon: LinkedinIcon },
];

function Count({ n }) {
  if (!n) return null;
  return (
    <span className="absolute -right-1 -top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-brand px-1 text-[10px] font-semibold text-white">
      {n > 99 ? "99+" : n}
    </span>
  );
}

function SearchBox({ className = "" }) {
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
  };

  return (
    <form onSubmit={submit} role="search" className={`relative ${className}`}>
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search here"
        aria-label="Search products"
        maxLength={80}
        className="h-10 w-full rounded-full border border-transparent bg-gray-100 pl-4 pr-11 text-sm outline-none transition focus:border-violet-300 focus:bg-white focus:ring-2 focus:ring-violet-100"
      />
      <button type="submit" aria-label="Search" className="absolute right-1 top-1 grid h-8 w-8 place-items-center rounded-full text-gray-500 hover:text-violet-600">
        <SearchIcon width={18} height={18} />
      </button>
    </form>
  );
}

function CategoryMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const active = location.pathname.startsWith("/shop");
  const item = "block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-600";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`inline-flex items-center gap-1 text-sm transition ${active ? "text-violet-500" : "text-gray-700 hover:text-violet-500"}`}
      >
        Category <ChevronIcon width={16} height={16} className={`transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-3 w-52 rounded-xl border border-gray-100 bg-white p-2 shadow-xl shadow-violet-100">
          <Link to="/shop" className={item}>All products</Link>
          {Object.keys(CATEGORY_LABELS).map((c) => (
            <Link key={c} to={`/shop/${categorySlug(c)}`} className={item}>{CATEGORY_LABELS[c]}</Link>
          ))}
        </div>
      )}
    </div>
  );
}

const navClass = ({ isActive }) => `text-sm transition ${isActive ? "text-violet-500" : "text-gray-700 hover:text-violet-500"}`;

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

  const iconLink = "relative grid h-10 w-10 place-items-center rounded-full text-gray-700 transition hover:bg-violet-50 hover:text-violet-600";

  return (
    <header className="sticky top-0 z-40 bg-white/95 shadow-sm backdrop-blur">
      <div className="hidden border-b border-gray-100 sm:block">
        <Container className="flex h-8 items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            {SOCIALS.map(({ label, Icon }) => (
              <span key={label} aria-label={label} className="text-gray-400 transition hover:text-violet-500">
                <Icon width={14} height={14} />
              </span>
            ))}
          </div>
          <p>Free delivery on orders over ₹999</p>
        </Container>
      </div>

      <Container className="flex h-16 items-center gap-6">
        <button type="button" className="-ml-2 grid h-10 w-10 place-items-center text-gray-700 md:hidden" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <MenuIcon />
        </button>

        <Link to="/" className="shrink-0" aria-label="FakeShop home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          <NavLink to="/" end className={navClass}>Home</NavLink>
          <CategoryMenu />
          <NavLink to="/contact" className={navClass}>Contact</NavLink>
        </nav>

        <SearchBox className="ml-auto hidden w-full max-w-sm md:block" />

        <div className="ml-auto flex items-center md:ml-0">
          <Link to="/wishlist" className={`${iconLink} hidden sm:grid`} aria-label={`Wishlist, ${wishlist.length} items`}>
            <HeartIcon />
            <Count n={wishlist.length} />
          </Link>
          <Link to="/cart" className={iconLink} aria-label={`Cart, ${totals.count} items`}>
            <BagIcon />
            <Count n={totals.count} />
          </Link>
          <Link to={user ? "/account" : "/login"} className={iconLink} aria-label={user ? "Your account" : "Sign in"} title={user ? user.name : "Sign in"}>
            {user ? (
              <span className="grid h-8 w-8 place-items-center rounded-full bg-brand text-xs font-semibold text-white">
                {user.name.charAt(0).toUpperCase()}
              </span>
            ) : (
              <UserIcon />
            )}
          </Link>
        </div>
      </Container>

      <div className="px-4 pb-3 md:hidden">
        <SearchBox />
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-brand-ink/50" onClick={() => setMenuOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-72 flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between bg-brand-soft px-5 py-5 text-white">
              <span className="text-lg font-medium">{user ? `Hi, ${user.name.split(" ")[0]}` : "Welcome"}</span>
              <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu" className="grid h-10 w-10 place-items-center">
                <CloseIcon />
              </button>
            </div>
            <nav className="flex flex-col px-5 py-4">
              <NavLink to="/" end className="py-2.5 text-gray-800">Home</NavLink>
              <p className="mt-3 text-xs font-medium uppercase tracking-wider text-gray-400">Category</p>
              <NavLink to="/shop" end className="py-2.5 text-gray-800">All products</NavLink>
              {Object.keys(CATEGORY_LABELS).map((c) => (
                <NavLink key={c} to={`/shop/${categorySlug(c)}`} className="py-2.5 text-gray-800">{CATEGORY_LABELS[c]}</NavLink>
              ))}
              <div className="my-3 border-t border-gray-100" />
              <Link to="/wishlist" className="py-2.5 text-gray-800">Wishlist ({wishlist.length})</Link>
              <Link to={user ? "/account" : "/login"} className="py-2.5 text-gray-800">{user ? "My orders" : "Login"}</Link>
              <NavLink to="/contact" className="py-2.5 text-gray-800">Contact</NavLink>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
