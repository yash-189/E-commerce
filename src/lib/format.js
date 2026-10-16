const USD_TO_INR = 83;

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export const toInr = (usd) => Math.round(usd * USD_TO_INR);
export const price = (usd) => inr.format(toInr(usd));
export const rupees = (amount) => inr.format(amount);

export const CATEGORY_LABELS = {
  electronics: "Electronics",
  jewelery: "Jewellery",
  "men's clothing": "Men",
  "women's clothing": "Women",
};

export const categoryLabel = (c) => CATEGORY_LABELS[c] || c;
export const categorySlug = (c) => c.replace(/'s clothing$/, "").replace(/\s+/g, "-");
export const categoryFromSlug = (slug) =>
  Object.keys(CATEGORY_LABELS).find((c) => categorySlug(c) === slug);

export const FREE_SHIPPING_FROM = 999;
export const SHIPPING_FEE = 49;
