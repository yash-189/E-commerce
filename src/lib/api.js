const BASE = "https://fakestoreapi.com";
const cache = new Map();

async function request(path, { signal } = {}) {
  if (cache.has(path)) return cache.get(path);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  if (signal) signal.addEventListener("abort", () => controller.abort());

  try {
    const res = await fetch(BASE + path, { signal: controller.signal });
    if (!res.ok) throw new Error(`Request failed (${res.status})`);
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;
    cache.set(path, data);
    return data;
  } finally {
    clearTimeout(timeout);
  }
}

export const getProducts = (opts) => request("/products", opts);
export const getProduct = (id, opts) => request(`/products/${id}`, opts);
export const getCategories = (opts) => request("/products/categories", opts);
