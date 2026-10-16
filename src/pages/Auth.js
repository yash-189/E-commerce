import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { DEMO_ACCOUNT, useStore } from "../store/StoreContext";
import Field from "../ui/Field";
import Logo from "../ui/Logo";
import { ArrowIcon, CheckIcon, EyeIcon } from "../ui/Icons";
import illustration from "../assets/vector.png";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const PERKS = ["Track every order in one place", "Save your address for one-tap checkout", "Members-only offers every week"];

function validate(mode, v) {
  const e = {};
  if (mode === "register") {
    if (!v.name.trim()) e.name = "Enter your name";
    else if (v.name.trim().length < 2) e.name = "Name is too short";
  }
  if (!v.email.trim()) e.email = "Enter your email";
  else if (!EMAIL.test(v.email.trim())) e.email = "Enter a valid email, like name@example.com";
  if (!v.password) e.password = "Enter your password";
  else if (mode === "register" && v.password.length < 8) e.password = "Use at least 8 characters";
  return e;
}

function strength(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { level: 1, label: "Weak", color: "bg-red-400" };
  if (score <= 3) return { level: 2, label: "Okay", color: "bg-amber-400" };
  return { level: 3, label: "Strong", color: "bg-green-500" };
}

export default function Auth({ mode }) {
  const { user, login, register, notify } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/account";

  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [touched, setTouched] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setErrors({});
    setFormError("");
    setTouched(false);
    setCapsLock(false);
  }, [mode]);

  if (user) return <Navigate to={from} replace />;

  const isRegister = mode === "register";
  const pw = isRegister && values.password ? strength(values.password) : null;

  const onChange = (e) => {
    const next = { ...values, [e.target.name]: e.target.value };
    setValues(next);
    setFormError("");
    if (touched) setErrors(validate(mode, next));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (busy) return;
    setTouched(true);
    const found = validate(mode, values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }
    setBusy(true);
    setTimeout(() => {
      try {
        isRegister ? register(values) : login(values);
        navigate(from, { replace: true });
      } catch (err) {
        setFormError(err.message);
        setBusy(false);
      }
    }, 450);
  };

  const tab = (active) =>
    `relative z-10 flex-1 rounded-full py-2 text-center text-sm font-medium transition-colors duration-300 ${active ? "text-violet-600" : "text-gray-500 hover:text-gray-900"}`;

  return (
    <div className="mx-auto grid min-h-screen max-w-7xl gap-0 lg:grid-cols-2 lg:p-6">
      <aside className="relative hidden overflow-hidden rounded-[2rem] bg-[#dfc7ff] p-12 lg:flex lg:flex-col">
        <span className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/30" aria-hidden="true" />
        <span className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[#8093f1]/25" aria-hidden="true" />
        <div className="relative">
          <Logo />
          <h2 className="mt-10 max-w-sm text-4xl font-medium leading-tight text-brand-ink">
            {isRegister ? "Join FakeShop and shop smarter." : "Good to see you again."}
          </h2>
          <ul className="mt-6 space-y-3">
            {PERKS.map((p) => (
              <li key={p} className="flex items-center gap-3 text-sm text-brand-ink/80">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-violet-600">
                  <CheckIcon width={14} height={14} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <img src={illustration} alt="" className="rise relative mx-auto mt-auto w-full max-w-sm pt-8" />
      </aside>

      <div className="flex flex-col px-4 py-6 sm:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="lg:invisible" aria-label="FakeShop home"><Logo /></Link>
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition hover:text-violet-600">
            <ArrowIcon width={15} height={15} className="rotate-180" /> Back to shop
          </Link>
        </div>
        <div className="mx-auto my-auto w-full max-w-md py-10">
          <div className="relative mb-8 flex rounded-full bg-[#f3edfd] p-1" role="tablist" aria-label="Account">
            <span
              aria-hidden="true"
              className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-white shadow-sm transition-transform duration-300 ease-out ${isRegister ? "translate-x-full" : ""}`}
            />
            <Link to="/login" state={location.state} role="tab" aria-selected={!isRegister} className={tab(!isRegister)}>Login</Link>
            <Link to="/register" state={location.state} role="tab" aria-selected={isRegister} className={tab(isRegister)}>Signup</Link>
          </div>

          <h1 className="text-3xl font-medium text-gray-900">{isRegister ? "Create your account" : "Welcome back"}</h1>
          <p className="mt-2 text-sm text-gray-500">
            {isRegister ? "It takes less than a minute." : "Sign in to check out faster and track your orders."}
          </p>

          {!isRegister && (
            <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-dashed border-violet-200 bg-[#faf8fe] px-4 py-3">
              <div className="min-w-0 text-xs text-gray-600">
                <p className="font-medium text-gray-900">Demo account</p>
                <p className="truncate">{DEMO_ACCOUNT.email} · {DEMO_ACCOUNT.password}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setValues({ name: "", email: DEMO_ACCOUNT.email, password: DEMO_ACCOUNT.password });
                  setErrors({});
                  setFormError("");
                }}
                className="shrink-0 rounded-full bg-white px-3.5 py-1.5 text-xs font-medium text-violet-600 ring-1 ring-violet-200 transition hover:bg-violet-50"
              >
                Use demo
              </button>
            </div>
          )}

          <form onSubmit={onSubmit} noValidate className="mt-6 space-y-5">
            {formError && (
              <p role="alert" className="rise rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                {formError}
              </p>
            )}
            {isRegister && (
              <Field label="Full name" name="name" autoComplete="name" placeholder="Aarav Sharma" value={values.name} onChange={onChange} error={errors.name} />
            )}
            <Field label="Email" name="email" type="email" autoComplete="email" inputMode="email" placeholder="you@example.com" value={values.email} onChange={onChange} error={errors.email} />

            <div>
              <div className="relative">
                <Field
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={isRegister ? "new-password" : "current-password"}
                  placeholder={isRegister ? "At least 8 characters" : "Your password"}
                  value={values.password}
                  onChange={onChange}
                  onKeyUp={(e) => setCapsLock(e.getModifierState?.("CapsLock"))}
                  error={errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute right-2 top-[30px] grid h-10 w-10 place-items-center rounded-full text-gray-400 transition hover:text-violet-600"
                >
                  <EyeIcon off={showPassword} width={18} height={18} />
                </button>
              </div>
              {capsLock && <p className="mt-1.5 text-xs text-amber-600">Caps Lock is on</p>}
              {pw && (
                <div className="mt-2 flex items-center gap-3" aria-live="polite">
                  <div className="flex flex-1 gap-1">
                    {[1, 2, 3].map((i) => (
                      <span key={i} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= pw.level ? pw.color : "bg-gray-100"}`} />
                    ))}
                  </div>
                  <span className="w-12 text-right text-xs text-gray-500">{pw.label}</span>
                </div>
              )}
              {!isRegister && (
                <button
                  type="button"
                  onClick={() => notify("Password reset isn't available in this demo")}
                  className="mt-2 text-xs font-medium text-violet-500 hover:text-violet-600"
                >
                  Forgot password?
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={busy}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand font-medium text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 active:scale-[0.98] disabled:cursor-wait disabled:opacity-80"
            >
              {busy && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
              {busy ? "Please wait" : isRegister ? "Create account" : "Sign in"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            {isRegister ? "Already have an account? " : "Don't have an account? "}
            <Link to={isRegister ? "/login" : "/register"} state={location.state} className="font-medium text-violet-500 hover:text-violet-600">
              {isRegister ? "Login" : "Signup"}
            </Link>
          </p>
          <p className="mt-3 text-center text-xs text-gray-400">Demo store: accounts are saved in this browser only.</p>
        </div>
      </div>
    </div>
  );
}
