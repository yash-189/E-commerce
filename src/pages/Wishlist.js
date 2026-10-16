import { Link } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import { price } from "../lib/format";
import { Container, EmptyState, PageBanner } from "../ui/States";
import { CloseIcon, HeartIcon } from "../ui/Icons";
import Img from "../ui/Img";

export default function Wishlist() {
  const { wishlist, toggleWishlist, moveToCart } = useStore();

  if (wishlist.length === 0) {
    return (
      <>
      <PageBanner title="Wishlist" />
      <Container>
        <EmptyState title="No saved items yet" body="Tap the heart on any product to save it for later." action="Browse products">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-pink-50 text-pink-500">
            <HeartIcon width={28} height={28} />
          </div>
        </EmptyState>
      </Container>
      </>
    );
  }

  return (
    <>
    <PageBanner title="Wishlist" />
    <Container className="py-8 sm:py-10">
      <p className="mb-6 text-sm text-gray-500">{wishlist.length} saved {wishlist.length === 1 ? "item" : "items"}</p>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {wishlist.map((item) => (
          <article key={item.id} className="relative flex flex-col rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
            <button
              type="button"
              onClick={() => toggleWishlist(item)}
              aria-label={`Remove ${item.title} from wishlist`}
              className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full border border-gray-200 bg-white text-gray-500 hover:text-gray-900"
            >
              <CloseIcon width={16} height={16} />
            </button>
            <Link to={`/product/${item.id}`} className="flex flex-1 flex-col">
              <Img src={item.image} alt={item.title} className="aspect-square p-4" />
              <h3 className="mt-3 line-clamp-2 text-sm text-gray-800">{item.title}</h3>
              <p className="mt-2 font-semibold text-gray-900">{price(item.price)}</p>
            </Link>
            <button
              type="button"
              onClick={() => moveToCart(item)}
              className="mt-3 h-10 rounded-xl bg-brand text-sm font-medium text-white hover:opacity-90"
            >
              Move to cart
            </button>
          </article>
        ))}
      </div>
    </Container>
    </>
  );
}
