import { useCallback, useEffect, useRef, useState } from "react";

export const latency = (min = 350, max = 800) =>
  new Promise((resolve) => setTimeout(resolve, min + Math.random() * (max - min)));

export function useAction() {
  const [busy, setBusy] = useState(false);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  const run = useCallback(async (fn, min, max) => {
    setBusy(true);
    try {
      await latency(min, max);
      return await fn();
    } finally {
      if (alive.current) setBusy(false);
    }
  }, []);

  return [busy, run];
}

export function useSimulatedLoad(min = 400, max = 900) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let on = true;
    latency(min, max).then(() => on && setReady(true));
    return () => {
      on = false;
    };
  }, [min, max]);
  return ready;
}
