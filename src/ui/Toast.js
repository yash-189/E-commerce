import { useStore } from "../store/StoreContext";
import { CheckIcon } from "./Icons";

export default function Toast() {
  const { toast } = useStore();
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-20 z-50 flex justify-center px-4 md:bottom-6">
      {toast && (
        <div
          key={toast.key}
          className="toast-in flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-3 text-sm text-white shadow-lg"
        >
          <CheckIcon width={16} height={16} className="text-green-400" />
          {toast.message}
        </div>
      )}
    </div>
  );
}
