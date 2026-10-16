import { StarIcon } from "./Icons";

export default function Stars({ rating, size = "sm" }) {
  if (!rating) return null;
  const { rate, count } = rating;
  const tone = rate >= 4 ? "bg-green-600" : rate >= 3 ? "bg-amber-500" : "bg-orange-600";
  return (
    <div className={`flex items-center gap-1.5 ${size === "sm" ? "text-xs" : "text-sm"}`}>
      <span className={`inline-flex items-center gap-0.5 rounded ${tone} px-1.5 py-0.5 font-semibold text-white`}>
        {rate.toFixed(1)}
        <StarIcon width={11} height={11} />
      </span>
      <span className="text-gray-500">({count.toLocaleString("en-IN")})</span>
    </div>
  );
}
