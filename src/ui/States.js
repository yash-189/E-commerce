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
          className="mt-6 inline-flex h-11 items-center rounded-lg bg-indigo-500 px-6 text-sm font-medium text-white hover:bg-indigo-600"
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
