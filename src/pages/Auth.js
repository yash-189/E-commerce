import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import Field from "../ui/Field";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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

export default function Auth({ mode }) {
  const { user, login, register } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/account";

  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);

  if (user) return <Navigate to={from} replace />;

  const isRegister = mode === "register";

  const onChange = (e) => {
    const next = { ...values, [e.target.name]: e.target.value };
    setValues(next);
    setFormError("");
    if (touched) setErrors(validate(mode, next));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    const found = validate(mode, values);
    setErrors(found);
    if (Object.keys(found).length) return;
    try {
      isRegister ? register(values) : login(values);
      navigate(from, { replace: true });
    } catch (err) {
      setFormError(err.message);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md px-4 py-12 sm:py-16">
      <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
        {isRegister ? "Create your account" : "Sign in"}
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        {isRegister ? "Save your address and see your orders in one place." : "Welcome back. Sign in to check out and track orders."}
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-8 space-y-4">
        {formError && (
          <p role="alert" className="rounded-lg border border-red-100 bg-red-50 px-3 py-2.5 text-sm text-red-700">
            {formError}
          </p>
        )}
        {isRegister && (
          <Field label="Full name" name="name" autoComplete="name" value={values.name} onChange={onChange} error={errors.name} />
        )}
        <Field label="Email" name="email" type="email" autoComplete="email" inputMode="email" value={values.email} onChange={onChange} error={errors.email} />
        <div className="relative">
          <Field
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete={isRegister ? "new-password" : "current-password"}
            value={values.password}
            onChange={onChange}
            error={errors.password}
            hint={isRegister ? "At least 8 characters" : undefined}
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3 top-[34px] text-xs font-medium text-gray-500 hover:text-gray-900"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button type="submit" className="h-12 w-full rounded-lg bg-indigo-500 font-medium text-white hover:bg-indigo-600">
          {isRegister ? "Create account" : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        {isRegister ? "Already have an account? " : "New to FakeShop? "}
        <Link to={isRegister ? "/login" : "/register"} state={location.state} className="font-medium text-indigo-600 hover:text-indigo-700">
          {isRegister ? "Sign in" : "Create an account"}
        </Link>
      </p>
      <p className="mt-8 text-center text-xs text-gray-400">
        Demo store: accounts are saved in this browser only.
      </p>
    </div>
  );
}
