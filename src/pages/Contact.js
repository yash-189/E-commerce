import { useState } from "react";
import { useStore } from "../store/StoreContext";
import { Container, PageBanner } from "../ui/States";
import Field from "../ui/Field";
import illustration from "../assets/vector.png";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const EMPTY = { name: "", email: "", message: "" };

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Enter your name";
  if (!EMAIL.test(v.email.trim())) e.email = "Enter a valid email";
  if (v.message.trim().length < 10) e.message = "Tell us a little more (at least 10 characters)";
  return e;
}

export default function Contact() {
  const { user } = useStore();
  const [values, setValues] = useState({ ...EMPTY, name: user?.name || "", email: user?.email || "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const onChange = (e) => {
    const next = { ...values, [e.target.name]: e.target.value };
    setValues(next);
    if (errors[e.target.name]) setErrors(validate(next));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    setSent(true);
    setValues({ ...EMPTY, name: values.name, email: values.email });
  };

  return (
    <>
      <PageBanner title="Contact us" crumb="contact" />
      <Container className="grid items-center gap-12 py-12 lg:grid-cols-2">
        <img src={illustration} alt="" className="mx-auto hidden w-full max-w-sm lg:block" />
        <div className="mx-auto w-full max-w-lg">
          <h2 className="text-2xl font-medium text-gray-900">Get in touch</h2>
          <p className="mt-1 text-sm text-gray-500">Questions about an order, returns or anything else. We reply within a day.</p>

          {sent && (
            <p role="status" className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
              Thanks, your message has been sent.
            </p>
          )}

          <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" name="name" autoComplete="name" value={values.name} onChange={onChange} error={errors.name} />
              <Field label="Email" name="email" type="email" autoComplete="email" value={values.email} onChange={onChange} error={errors.email} />
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                maxLength={1000}
                value={values.message}
                onChange={(e) => {
                  setSent(false);
                  onChange(e);
                }}
                aria-invalid={!!errors.message}
                className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition focus:ring-2 ${
                  errors.message ? "border-red-400 focus:ring-red-100" : "border-gray-300 focus:border-violet-500 focus:ring-violet-100"
                }`}
              />
              <div className="mt-1.5 flex justify-between text-xs">
                <span className="text-red-600">{errors.message}</span>
                <span className="text-gray-400">{values.message.length}/1000</span>
              </div>
            </div>
            <button type="submit" className="h-12 w-full rounded-xl bg-brand font-medium text-white shadow-lg shadow-violet-100 hover:opacity-90 sm:w-auto sm:px-10">
              Send message
            </button>
          </form>
        </div>
      </Container>
    </>
  );
}
