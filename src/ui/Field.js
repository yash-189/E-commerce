export default function Field({ label, error, hint, id, className = "", ...input }) {
  const fieldId = id || input.name;
  return (
    <div className={className}>
      <label htmlFor={fieldId} className="mb-1.5 block text-sm font-medium text-gray-800">
        {label}
      </label>
      <input
        id={fieldId}
        aria-invalid={!!error}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className={`h-12 w-full rounded-xl border bg-gray-50/60 px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-4 disabled:cursor-not-allowed disabled:text-gray-500 ${
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
            : "border-gray-200 hover:border-gray-300 focus:border-violet-400 focus:ring-violet-100"
        }`}
        {...input}
      />
      {error ? (
        <p id={`${fieldId}-error`} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 text-xs text-gray-500">{hint}</p>
      )}
    </div>
  );
}
