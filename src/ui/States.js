import { ChevronIcon } from "./Icons";
import { Link } from "react-router-dom";

export function EmptyState({ title, body, action, to = "/shop", children }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center">
      {children}
      <h2 className="mt-5 text-xl font-semibold text-gray-900">{title}</h2>
      {body && <p className="mt-2 text-sm text-gray-500">{body}</p>}
      {action && (
        <Link
          to={to}
          className="mt-6 inline-flex h-11 items-center rounded-lg bg-brand px-6 text-sm font-medium text-white hover:opacity-90"
        >
          {action}
        </Link>
      )}
    </div>
  );
}

export function ErrorState({ onRetry, message = "We couldn't load products. Check your connection and try again." }) {
  return (
    <div role="alert" className="mx-auto max-w-md rounded-xl border border-red-100 bg-red-50 px-6 py-8 text-center">
      <p className="font-medium text-red-800">Something went wrong</p>
      <p className="mt-1 text-sm text-red-700">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 h-10 rounded-lg border border-red-200 bg-white px-5 text-sm font-medium text-red-700 hover:bg-red-100"
        >
          Try again
        </button>
      )}
    </div>
  );
}

export function Container({ className = "", children }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function PageTitle({ children, sub }) {
  return (
    <div className="mb-6 sm:mb-8">
      <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">{children}</h1>
      {sub && <p className="mt-1 text-sm text-gray-500">{sub}</p>}
    </div>
  );
}

export function PageBanner({ title, crumb, sub }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-brand-soft px-6 py-8 text-white sm:px-10 sm:py-10">
        <span className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/15" aria-hidden="true" />
        <span className="absolute -bottom-20 right-24 h-40 w-40 rounded-full bg-white/10" aria-hidden="true" />
        <nav aria-label="Breadcrumb" className="relative flex items-center gap-1.5 text-xs text-white/80 sm:text-sm">
          <Link to="/" className="transition hover:text-white">Home</Link>
          <ChevronIcon width={14} height={14} className="-rotate-90" />
          <span aria-current="page" className="capitalize text-white">{crumb || title}</span>
        </nav>
        <h1 className="relative mt-2 text-3xl font-medium sm:text-4xl">{title}</h1>
        {sub && <p className="relative mt-1.5 text-sm text-white/85">{sub}</p>}
      </div>
    </div>
  );
}

export function SectionTitle({ children, eyebrow }) {
  return (
    <div className="mb-8 text-center">
      {eyebrow && <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-violet-500">{eyebrow}</p>}
      <h2 className="text-2xl font-medium text-gray-900 sm:text-4xl">{children}</h2>
      <span className="mx-auto mt-3 block h-1 w-14 rounded-full bg-brand" />
    </div>
  );
}
