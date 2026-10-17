import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

import { toInr, FREE_SHIPPING_FROM, SHIPPING_FEE } from "../lib/format";
import { DEMO_ADDRESS, demoOrders } from "../lib/demoOrders";
import { loadAddress, saveAddress } from "../lib/address";

const StoreContext = createContext(null);
export const MAX_QTY = 10;
export const DEMO_ACCOUNT = { name: "Demo Shopper", email: "demo@fakeshop.in", password: "demo1234" };

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function usePersisted(key, fallback) {
  const [value, setValue] = useState(() => load(key, fallback));
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);
  return [value, setValue];
}

const pick = ({ id, title, price, image, category }) => ({ id, title, price, image, category });

export function StoreProvider({ children }) {
  const [rawCart, setCart] = usePersisted("fs.cart", []);
  const cart = useMemo(
    () => (Array.isArray(rawCart) ? rawCart.filter((i) => i && i.key && i.qty > 0 && typeof i.price === "number") : []),
    [rawCart],
  );
  const [wishlist, setWishlist] = usePersisted("fs.wishlist", []);
  const [users, setUsers] = usePersisted("fs.users", []);
  const [user, setUser] = usePersisted("fs.user", null);
  const [orders, setOrders] = usePersisted("fs.orders", []);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef();

  const notify = useCallback((message) => {
    clearTimeout(toastTimer.current);
    setToast({ message, key: Date.now() });
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "fs.cart") setCart(load("fs.cart", []));
      if (e.key === "fs.wishlist") setWishlist(load("fs.wishlist", []));
      if (e.key === "fs.user") setUser(load("fs.user", null));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [setCart, setWishlist, setUser]);

  const addToCart = useCallback(
    (product, qty = 1, size = null) => {
      const key = size ? `${product.id}-${size}` : String(product.id);
      const existing = cart.find((i) => i.key === key);
      const capped = existing ? existing.qty + qty > MAX_QTY : false;
      setCart((items) => {
        const found = items.find((i) => i.key === key);
        if (!found) return [...items, { ...pick(product), key, size, qty: Math.min(qty, MAX_QTY) }];
        return items.map((i) => (i.key === key ? { ...i, qty: Math.min(i.qty + qty, MAX_QTY) } : i));
      });
      notify(capped ? `You can add up to ${MAX_QTY} of one item` : "Added to cart");
    },
    [cart, setCart, notify],
  );

  const setQty = useCallback(
    (key, qty) => {
      const n = Math.max(1, Math.min(MAX_QTY, Math.floor(Number(qty)) || 1));
      setCart((items) => items.map((i) => (i.key === key ? { ...i, qty: n } : i)));
    },
    [setCart],
  );

  const removeFromCart = useCallback(
    (key) => setCart((items) => items.filter((i) => i.key !== key)),
    [setCart],
  );

  const toggleWishlist = useCallback(
    (product) => {
      const saved = wishlist.some((i) => i.id === product.id);
      setWishlist((items) =>
        saved ? items.filter((i) => i.id !== product.id) : [pick(product), ...items],
      );
      notify(saved ? "Removed from wishlist" : "Saved to wishlist");
    },
    [wishlist, setWishlist, notify],
  );

  const moveToCart = useCallback(
    (product) => {
      addToCart(product);
      setWishlist((items) => items.filter((i) => i.id !== product.id));
    },
    [addToCart, setWishlist],
  );

  const register = useCallback(
    ({ name, email, password }) => {
      const key = email.trim().toLowerCase();
      if (key === DEMO_ACCOUNT.email || users.some((u) => u.email === key)) {
        throw new Error("An account with this email already exists");
      }
      const account = { name: name.trim(), email: key, password };
      setUsers((list) => [...list, account]);
      setUser({ name: account.name, email: key });
    },
    [users, setUsers, setUser],
  );

  const login = useCallback(
    ({ email, password }) => {
      const key = email.trim().toLowerCase();
      const account = [DEMO_ACCOUNT, ...users].find((u) => u.email === key);
      if (!account || account.password !== password) {
        throw new Error("Email or password is incorrect");
      }
      if (key === DEMO_ACCOUNT.email) {
        setOrders((list) => (list.some((o) => o.email === key) ? list : [...list, ...demoOrders(key)]));
        if (!loadAddress(key)) saveAddress(key, DEMO_ADDRESS);
      }
      setUser({ name: account.name, email: key });
    },
    [users, setUser, setOrders],
  );

  const updateProfile = useCallback(
    ({ name }) => {
      const clean = name.trim();
      setUser((u) => (u ? { ...u, name: clean } : u));
      setUsers((list) => list.map((a) => (a.email === user?.email ? { ...a, name: clean } : a)));
    },
    [user, setUser, setUsers],
  );

  const changePassword = useCallback(
    ({ current, next }) => {
      if (user?.email === DEMO_ACCOUNT.email) throw new Error("The demo account's password can't be changed");
      const account = users.find((a) => a.email === user?.email);
      if (!account || account.password !== current) throw new Error("Current password is incorrect");
      if (current === next) throw new Error("New password must be different");
      setUsers((list) => list.map((a) => (a.email === account.email ? { ...a, password: next } : a)));
    },
    [user, users, setUsers],
  );

  const logout = useCallback(() => {
    setUser(null);
    notify("Signed out");
  }, [setUser, notify]);

  const totals = useMemo(() => {
    const count = cart.reduce((n, i) => n + i.qty, 0);
    const subtotal = cart.reduce((n, i) => n + toInr(i.price) * i.qty, 0);
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE;
    return { count, subtotal, shipping, total: subtotal + shipping };
  }, [cart]);

  const placeOrder = useCallback(
    ({ address, payment }) => {
      const order = {
        id: "FS" + Date.now().toString(36).toUpperCase(),
        placedAt: new Date().toISOString(),
        items: cart,
        address,
        payment,
        email: user?.email,
        ...totals,
      };
      setOrders((list) => [order, ...list]);
      setCart([]);
      return order;
    },
    [cart, totals, user, setOrders, setCart],
  );

  const value = {
    cart, wishlist, user, toast, totals,
    orders: orders.filter((o) => o.email === user?.email),
    addToCart, setQty, removeFromCart, toggleWishlist, moveToCart,
    register, login, logout, placeOrder, notify, updateProfile, changePassword,
    inWishlist: (id) => wishlist.some((i) => i.id === id),
    inCart: (id) => cart.some((i) => i.id === id),
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
