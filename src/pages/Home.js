import { Link } from "react-router-dom";
import { getProducts } from "../lib/api";
import { useFetch } from "../lib/useFetch";
import { ProductGrid } from "../ui/ProductCard";
import { Container, ErrorState, SectionTitle } from "../ui/States";
import { ArrowIcon } from "../ui/Icons";
import hero from "../assets/BG.png";
import summer from "../assets/banner.webp";
import nike from "../assets/image5.jpg";
import tshirt from "../assets/tshirt.jpg";
import beauty from "../assets/image2.jpg";

function Banner({ to, src, alt, className = "" }) {
  return (
    <Link to={to} className={`group relative block overflow-hidden rounded-2xl bg-gray-100 ${className}`}>
      <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
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
        <Container className="relative py-16 sm:py-32 lg:py-40">
          <div className="max-w-[48%] sm:max-w-none">
          <p className="hero-in text-base text-gray-700 sm:text-lg">New Arrivals</p>
          <h1 className="hero-in hero-in-2 pt-1 text-3xl font-normal text-gray-900 sm:text-6xl">Collections</h1>
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

      <Container className="mt-14">
        <SectionTitle>New Arrivals</SectionTitle>
        {error ? <ErrorState onRetry={retry} /> : <ProductGrid products={clothing} loading={loading} />}
      </Container>

      <Container className="mt-20">
        <div className="grid gap-4 sm:grid-cols-2">
          <Banner to="/shop/women" src={summer} alt="Summer Fashion Days: up to 50% off plus 10% cashback" className="aspect-square sm:aspect-auto" />
          <div className="grid gap-4">
            <Banner to="/shop/men" src={nike} alt="Nike Air sneakers" className="aspect-[471/280]" />
            <Banner to="/shop/men" src={tshirt} alt="New t-shirts" className="aspect-[471/280]" />
          </div>
        </div>
      </Container>

      <Container className="mt-20">
        <div className="grid items-center gap-8 sm:grid-cols-2 sm:gap-16">
          <Banner to="/shop/jewellery" src={beauty} alt="Beauty store" className="aspect-[4/3]" />
          <div>
            <p className="text-sm font-medium text-violet-500">Beauty and jewellery</p>
            <h2 className="mt-2 text-3xl font-normal text-gray-900 md:text-5xl">Shop what you love!</h2>
            <p className="mt-5 max-w-md leading-relaxed text-gray-600">
              Rings, chains and studs to finish any look, with 7-day returns if it isn't quite right.
            </p>
            <Link to="/shop/jewellery" className="mt-6 inline-flex items-center gap-1.5 font-medium text-violet-500 hover:text-violet-600">
              Learn More <ArrowIcon width={16} height={16} />
            </Link>
          </div>
        </div>
      </Container>

      <Container className="mt-20">
        <SectionTitle>Explore More</SectionTitle>
        {error ? <ErrorState onRetry={retry} /> : <ProductGrid products={more} loading={loading} />}
        {!loading && !error && (
          <div className="mt-10 text-center">
            <Link to="/shop" className="inline-flex h-11 items-center rounded-xl border border-violet-300 px-7 text-sm font-medium text-violet-600 transition hover:bg-violet-50">
              View all products
            </Link>
          </div>
        )}
      </Container>
    </>
  );
}
