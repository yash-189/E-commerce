import { toInr, FREE_SHIPPING_FROM, SHIPPING_FEE } from "./format";

const P = {
  backpack: { id: 1, title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops", price: 109.95, category: "men's clothing", image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png" },
  jacket: { id: 3, title: "Mens Cotton Jacket", price: 55.99, category: "men's clothing", image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png" },
  bracelet: { id: 5, title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet", price: 695, category: "jewelery", image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png" },
  drive: { id: 9, title: "WD 2TB Elements Portable External Hard Drive - USB 3.0", price: 64, category: "electronics", image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png" },
  monitor: { id: 13, title: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin", price: 599, category: "electronics", image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_t.png" },
  hoodie: { id: 16, title: "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket", price: 29.95, category: "women's clothing", image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_t.png" },
  tee: { id: 18, title: "MBJ Women's Solid Short Sleeve Boat Neck V", price: 9.85, category: "women's clothing", image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_t.png" },
};

const ADDRESS = { name: "Demo Shopper", phone: "9876543210", pincode: "560034", line1: "21, 5th Cross, Koramangala", city: "Bengaluru", state: "Karnataka" };

const PLAN = [
  { id: "FSDEMO7Q2", daysAgo: 0.2, payment: "upi", items: [["jacket", 1, "M"], ["tee", 2, "S"]] },
  { id: "FSDEMO6K8", daysAgo: 1.6, payment: "card", items: [["drive", 1]] },
  { id: "FSDEMO5P1", daysAgo: 3.3, payment: "cod", items: [["hoodie", 1, "M"], ["backpack", 1, "L"]] },
  { id: "FSDEMO4M9", daysAgo: 12, payment: "upi", items: [["monitor", 1]] },
  { id: "FSDEMO3B5", daysAgo: 41, payment: "card", items: [["bracelet", 1]] },
];

export function demoOrders(email, now = Date.now()) {
  return PLAN.map(({ id, daysAgo, payment, items }) => {
    const lines = items.map(([name, qty, size = null]) => ({ ...P[name], key: `${P[name].id}-${size}`, qty, size }));
    const subtotal = lines.reduce((n, i) => n + toInr(i.price) * i.qty, 0);
    const shipping = subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE;
    return {
      id,
      placedAt: new Date(now - daysAgo * 86400000).toISOString(),
      items: lines,
      address: ADDRESS,
      payment,
      email,
      count: lines.reduce((n, i) => n + i.qty, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
    };
  });
}

export const DEMO_ADDRESS = ADDRESS;
