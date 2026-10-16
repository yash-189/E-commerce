import { MAX_QTY } from "../store/StoreContext";

export default function QtyStepper({ value, onChange, label = "Quantity" }) {
  const btn =
    "grid h-9 w-9 place-items-center text-lg text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-transparent";
  return (
    <div className="inline-flex items-center rounded-lg border border-gray-300" role="group" aria-label={label}>
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label="Decrease">
        −
      </button>
      <span className="w-9 text-center text-sm font-medium tabular-nums" aria-live="polite">
        {value}
      </span>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= MAX_QTY} aria-label="Increase">
        +
      </button>
    </div>
  );
}
