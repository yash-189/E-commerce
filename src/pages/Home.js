import { Link } from "react-router-dom";
import { getProducts } from "../lib/api";
import { useFetch } from "../lib/useFetch";
import { CATEGORY_LABELS, categorySlug, price } from "../lib/format";
import { ProductGrid } from "../ui/ProductCard";
import { Container, ErrorState } from "../ui/States";
import { ArrowIcon } from "../ui/Icons";
import Img from "../ui/Img";

const BLURBS = {
  electronics: "Drives, monitors and storage",
  jewelery: "Rings, chains and studs",
  "men's clothing": "Jackets, tees and bags",
  "women's clothing": "Coats, tops and basics",
};

function SectionHead({ title, to, link }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <h2 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">{title}</h2>
      {to && (
        <Link to={to} className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700">
          {link} <ArrowIcon width={16} height={16} />
        </Link>
      )}
    </div>
  );
}

export default function Home() {
  const { data, loading, error, retry } = useFetch((o) => getProducts(o));
  const products = data || [];
  const topRated = [...products].sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 8);
  const heroPick = products.find((p) => p.id === 1) || products[0];
  const byCategory = (c) => products.filter((p) => p.category === c && p.id !== heroPick?.id).sort((a, b) => b.rating.count - a.rating.count)[0];

  return (
    <>
      <section className="border-b border-gray-200 bg-gray-50">
        <Container className="grid items-center gap-10 py-10 md:grid-cols-2 md:py-16">
          <div>
            <p className="text-sm font-medium text-indigo-600">New season, same low prices</p>
            <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl">
              Everyday things,
              <br />
              delivered fast.
            </h1>
            <p className="mt-4 max-w-md text-gray-600">
              Clothing, jewellery and electronics in one place. Free delivery on orders over ₹999,
              and pay on delivery if you prefer.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/shop" className="inline-flex h-12 items-center gap-2 rounded-lg bg-indigo-500 px-6 font-medium text-white hover:bg-indigo-600">
                Shop all products <ArrowIcon width={18} height={18} />
              </Link>
              <Link to="/shop/electronics" className="inline-flex h-12 items-center rounded-lg border border-gray-300 bg-white px-6 font-medium text-gray-800 hover:border-gray-400">
                Electronics
              </Link>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-gray-200 pt-6 text-sm">
              <div><dt className="text-gray-500">Delivery</dt><dd className="mt-1 font-semibold text-gray-900">2 to 4 days</dd></div>
              <div><dt className="text-gray-500">Returns</dt><dd className="mt-1 font-semibold text-gray-900">7 days</dd></div>
              <div><dt className="text-gray-500">Payment</dt><dd className="mt-1 font-semibold text-gray-900">Card or COD</dd></div>
            </dl>
          </div>

          <div className="relative">
            {loading || !heroPick ? (
              <div className="aspect-[4/3] animate-pulse rounded-2xl bg-gray-200" />
            ) : (
              <Link to={`/product/${heroPick.id}`} className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <Img src={heroPick.image} alt={heroPick.title} className="aspect-[4/3] p-10" imgClassName="transition duration-500 group-hover:scale-105" />
                <div className="flex items-center justify-between gap-4 border-t border-gray-100 px-5 py-4">
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Best seller</p>
                    <p className="truncate text-sm font-medium text-gray-900">{heroPick.title}</p>
                  </div>
                  <p className="shrink-0 font-semibold text-gray-900">{price(heroPick.price)}</p>
                </div>
              </Link>
            )}
          </div>
        </Container>
      </section>

      <Container className="mt-12 sm:mt-16">
        <SectionHead title="Shop by category" />
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {Object.keys(CATEGORY_LABELS).map((c) => {
            const sample = byCategory(c);
            return (
              <Link key={c} to={`/shop/${categorySlug(c)}`} className="group flex flex-col rounded-xl border border-gray-200 bg-white p-4 transition hover:border-indigo-300">
                {sample ? (
                  <Img src={sample.image} alt="" className="aspect-[4/3] p-3" imgClassName="transition duration-500 group-hover:scale-105" />
                ) : (
                  <div className="aspect-[4/3] animate-pulse rounded-lg bg-gray-100" />
                )}
                <p className="mt-3 font-semibold text-gray-900 group-hover:text-indigo-600">{CATEGORY_LABELS[c]}</p>
                <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">{BLURBS[c]}</p>
              </Link>
            );
          })}
        </div>
      </Container>

      <Container className="mt-12 sm:mt-16">
        <SectionHead title="Top rated" to="/shop?sort=rating" link="See all" />
        {error ? <ErrorState onRetry={retry} /> : <ProductGrid products={topRated} loading={loading} />}
      </Container>

      <Container className="mt-12 sm:mt-16">
        <div className="flex flex-col items-start justify-between gap-5 rounded-2xl bg-indigo-500 px-6 py-8 text-white sm:flex-row sm:items-center sm:px-10">
          <div>
            <p className="text-xl font-semibold sm:text-2xl">Free delivery on orders over ₹999</p>
            <p className="mt-1 text-sm text-indigo-100">Applied automatically at checkout. No code needed.</p>
          </div>
          <Link to="/shop" className="inline-flex h-11 shrink-0 items-center rounded-lg bg-white px-5 text-sm font-semibold text-indigo-600 hover:bg-indigo-50">
            Start shopping
          </Link>
        </div>
      </Container>
    </>
  );
}
