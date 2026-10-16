export const ORDER_STEPS = ["Placed", "Shipped", "Out for delivery", "Delivered"];
const STEP_AFTER_DAYS = [0, 1, 3, 4];

export function orderProgress(order, now = Date.now()) {
  const days = (now - new Date(order.placedAt).getTime()) / 86400000;
  let step = 0;
  STEP_AFTER_DAYS.forEach((d, i) => {
    if (days >= d) step = i;
  });
  return { step, status: ORDER_STEPS[step], delivered: step === ORDER_STEPS.length - 1 };
}

export const deliveryDate = (iso) => {
  const d = new Date(iso);
  d.setDate(d.getDate() + STEP_AFTER_DAYS[STEP_AFTER_DAYS.length - 1]);
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
};

export const orderDate = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
