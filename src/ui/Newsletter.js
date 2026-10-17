import { useState } from "react";
import Reveal from "./Reveal";
import Spinner from "./Spinner";
import { useAction } from "../lib/useAction";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const [busy, run] = useAction();

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    if (!EMAIL.test(email.trim())) {
      setStatus("error");
      return;
    }
    await run(() => {}, 600, 1000);
    setStatus("done");
    setEmail("");
  };

  return (
    <Reveal className="mx-auto mt-24 mb-4 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-brand-soft px-6 py-12 text-center text-white sm:px-12 sm:py-16">
        <span className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/10" aria-hidden="true" />
        <span className="absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-white/10" aria-hidden="true" />
        <p className="relative text-xs font-medium uppercase tracking-[0.2em] text-white/80">Newsletter</p>
        <h2 className="relative mt-2 text-3xl font-medium sm:text-4xl">Get 10% off your first order</h2>
        <p className="relative mx-auto mt-3 max-w-md text-sm text-white/85">New drops and members-only offers, once a week. Unsubscribe any time.</p>
        <form onSubmit={submit} noValidate className="relative mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          <label htmlFor="newsletter" className="sr-only">Email address</label>
          <input
            id="newsletter"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            placeholder="Your email address"
            aria-invalid={status === "error"}
            aria-describedby="newsletter-status"
            className="h-12 flex-1 rounded-xl border-0 bg-white px-4 text-sm text-gray-900 outline-none ring-2 ring-transparent focus:ring-white/60"
          />
          <button type="submit" disabled={busy} className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-medium text-violet-600 transition hover:bg-violet-50 disabled:cursor-wait sm:w-32">
            {busy && <Spinner />}
            {busy ? "Joining" : "Subscribe"}
          </button>
        </form>
        <p id="newsletter-status" role="status" className="relative mt-3 min-h-[1.25rem] text-sm">
          {status === "done" && "You're in. Check your inbox for the code."}
          {status === "error" && "Enter a valid email address."}
        </p>
      </div>
    </Reveal>
  );
}
