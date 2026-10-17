import { Link } from "react-router-dom";
import { getProducts } from "../lib/api";
import { useFetch } from "../lib/useFetch";
import { ProductGrid } from "../ui/ProductCard";
import { Container, ErrorState, SectionTitle } from "../ui/States";
import { ArrowIcon, CashIcon, ReturnIcon, ShieldIcon, TruckIcon } from "../ui/Icons";
import { CATEGORY_LABELS, categorySlug } from "../lib/format";
import Img from "../ui/Img";
import Newsletter from "../ui/Newsletter";
import Reveal from "../ui/Reveal";
import hero from "../assets/BG.png";
import summer from "../assets/banner.webp";
import nike from "../assets/image5.jpg";
import tshirt from "../assets/tshirt.jpg";
import beauty from "../assets/image2.jpg";

const PERKS = [
  { Icon: TruckIcon, title: "Free delivery", text: "On orders over ₹999" },
  { Icon: ReturnIcon, title: "7-day returns", text: "No questions asked" },
  { Icon: CashIcon, title: "Cash on delivery", text: "Pay when it arrives" },
  { Icon: ShieldIcon, title: "Secure payment", text: "UPI, cards and more" },
];

function Perks() {
  return (
    <Container className="relative z-10 -mt-8 sm:-mt-10">
      <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-gray-100 shadow-lg shadow-violet-100/60 lg:grid-cols-4">
        {PERKS.map(({ Icon, title, text }) => (
          <li key={title} className="flex items-center gap-3 bg-white p-4 sm:p-5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f3edfd] text-violet-600">
              <Icon width={20} height={20} />
            </span>
            <span>
              <span className="block text-sm font-medium text-gray-900">{title}</span>
              <span className="hidden text-xs text-gray-500 sm:block">{text}</span>
            </span>
          </li>
        ))}
      </ul>
    </Container>
  );
}

function Categories({ products, loading }) {
  return (
    <Container className="mt-16">
      <SectionTitle eyebrow="Browse">Shop by category</SectionTitle>
      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
        {Object.keys(CATEGORY_LABELS).map((c) => {
          const sample = products.find((p) => p.category === c);
          const count = products.filter((p) => p.category === c).length;
          return (
            <Link key={c} to={`/shop/${categorySlug(c)}`} className="group rounded-2xl bg-[#f7f4fd] p-4 transition hover:bg-[#efe7fc] sm:p-5">
              {loading || !sample ? (
                <div className="aspect-square skeleton rounded-xl" />
              ) : (
                <Img src={sample.image} alt="" className="aspect-square !bg-transparent p-4 mix-blend-multiply" imgClassName="group-hover:scale-[1.06]" />
              )}
              <div className="mt-3 flex items-center justify-between">
                <span>
                  <span className="block font-display text-lg font-medium text-gray-900">{CATEGORY_LABELS[c]}</span>
                  {!loading && <span className="block text-xs text-gray-500">{count} products</span>}
                </span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-violet-600 transition group-hover:bg-brand group-hover:text-white">
                  <ArrowIcon width={15} height={15} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}

function Banner({ to, src, alt, className = "" }) {
  return (
    <Link to={to} className={`group relative block overflow-hidden rounded-2xl bg-gray-100 ${className}`}>
      <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]" />
    </Link>
  );
}

export default function Home() {
  const { data, loading, error, retry } = useFetch((o) => getProducts(o));
  const products = data || [];
  const clothing = products.filter((p) => p.category.includes("clothing") || p.category === "jewelery").slice(0, 8);
  const more = products.filter((p) => !clothing.includes(p)).slice(0, 8);

  return (
    <>
      <section className="relative overflow-hidden bg-[#f2f2f2]">
        <img src={hero} alt="" className="absolute inset-y-0 -right-32 h-full w-auto max-w-none sm:inset-0 sm:right-0 sm:w-full sm:object-cover sm:object-right" />
        <Container className="relative pb-24 pt-16 sm:pb-36 sm:pt-32 lg:pb-44 lg:pt-40">
          <div className="max-w-[48%] sm:max-w-none">
          <p className="hero-in text-base text-gray-700 sm:text-lg">New Arrivals</p>
          <h1 className="hero-in hero-in-2 pt-1 text-3xl font-medium text-gray-900 sm:text-7xl">Collections</h1>
          <p className="hero-in hero-in-2 mt-4 hidden max-w-sm text-gray-600 sm:block">
            Fresh styles every week, plus jewellery and electronics at everyday prices.
          </p>
          <Link
            to="/shop"
            className="hero-in hero-in-3 mt-8 inline-flex h-11 items-center gap-2 rounded-xl bg-brand px-7 text-sm font-medium text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            Explore <ArrowIcon width={16} height={16} />
          </Link>
          </div>
        </Container>
      </section>

      <Perks />
      <Categories products={products} loading={loading} />

      <Container className="mt-20">
        <SectionTitle eyebrow="Just in">New Arrivals</SectionTitle>
        {error ? <ErrorState onRetry={retry} /> : <ProductGrid products={clothing} loading={loading} />}
      </Container>

      <Reveal className="mx-auto mt-20 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <Banner to="/shop/women" src={summer} alt="Summer Fashion Days: up to 50% off plus 10% cashback" className="aspect-square sm:aspect-auto" />
          <div className="grid gap-4">
            <Banner to="/shop/men" src={nike} alt="Nike Air sneakers" className="aspect-[471/280]" />
            <Banner to="/shop/men" src={tshirt} alt="New t-shirts" className="aspect-[471/280]" />
          </div>
        </div>
      </Reveal>

      <Reveal className="mx-auto mt-20 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 sm:grid-cols-2 sm:gap-16">
          <Banner to="/shop/jewelery" src={beauty} alt="Beauty store" className="aspect-[4/3]" />
          <div>
            <p className="text-sm font-medium text-violet-500">Beauty and jewellery</p>
            <h2 className="mt-2 text-3xl font-medium text-gray-900 md:text-5xl">Shop what you love!</h2>
            <p className="mt-5 max-w-md leading-relaxed text-gray-600">
              Rings, chains and studs to finish any look, with 7-day returns if it isn't quite right.
            </p>
            <Link to="/shop/jewelery" className="mt-6 inline-flex items-center gap-1.5 font-medium text-violet-500 hover:text-violet-600">
              Learn More <ArrowIcon width={16} height={16} />
            </Link>
          </div>
        </div>
      </Reveal>

      <Container className="mt-20">
        <SectionTitle eyebrow="Top picks">Explore More</SectionTitle>
        {error ? <ErrorState onRetry={retry} /> : <ProductGrid products={more} loading={loading} />}
        {!loading && !error && (
          <div className="mt-10 text-center">
            <Link to="/shop" className="inline-flex h-11 items-center rounded-xl border border-violet-300 px-7 text-sm font-medium text-violet-600 transition hover:bg-violet-50">
              View all products
            </Link>
          </div>
        )}
      </Container>

      <Newsletter />
    </>
  );
}
