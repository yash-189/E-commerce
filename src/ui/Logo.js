import { useId } from "react";

export default function Logo({ className = "", light = false }) {
  const id = useId();
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#b388eb" />
            <stop offset="1" stopColor="#8093f1" />
          </linearGradient>
        </defs>
        <path d="M6 11h22l-1.6 17.2A3 3 0 0 1 23.4 31H10.6a3 3 0 0 1-3-2.8z" fill={`url(#${id})`} />
        <path d="M12 11V9a5 5 0 0 1 10 0v2" fill="none" stroke="#8093f1" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M14 26V17h7M14 21.5h5" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className={`text-xl font-semibold tracking-tight ${light ? "text-white" : "text-brand-ink"}`}>
        Fake<span className="text-violet-500">Shop</span>
      </span>
    </span>
  );
}
