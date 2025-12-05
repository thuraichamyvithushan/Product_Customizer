import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { saveOrder } from "../api/orderApi.js";

const Checkout = () => {
  const { item, clear } = useCart();
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    quantity: 1
  });
  const [status, setStatus] = useState("");
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    if (!item) {
      navigate("/");
    }
  }, [item, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) || 1 : value
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!item) return;

    if (!isAuthenticated) {
      setStatus("Please login to place your order.");
      navigate("/login");
      return;
    }

    setPlacing(true);
    setStatus("");
    try {
      await saveOrder(
        {
          phoneModel: item.phoneModel,
          designImage: item.designImage,
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          quantity: form.quantity || 1
        },
        token
      );
      clear();
      navigate("/success");
    } catch (error) {
      setStatus(error.response?.data?.message || "Unable to place order");
    } finally {
      setPlacing(false);
    }
  };

  if (!item) {
    return null;
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 md:flex-row">
      <div className="flex-1 space-y-4">
        <h1 className="text-2xl font-semibold text-slate-800">Checkout</h1>
        <p className="text-sm text-slate-500">
          Review your design and enter your details to place the order. Payment step can be
          integrated with a gateway (Stripe, Razorpay, etc.) later.
        </p>
        <form onSubmit={handlePlaceOrder} className="space-y-4 rounded-3xl bg-white p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              name="fullName"
              placeholder="Full name"
              value={form.fullName}
              onChange={handleChange}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="tel"
              name="phone"
              placeholder="Mobile number"
              value={form.phone}
              onChange={handleChange}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
              required
            />
            <input
              type="number"
              name="quantity"
              min="1"
              placeholder="Quantity"
              value={form.quantity}
              onChange={handleChange}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
              required
            />
          </div>
          <textarea
            name="address"
            placeholder="Shipping address"
            value={form.address}
            onChange={handleChange}
            rows="3"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
            required
          />
          {status && <p className="text-sm text-red-500">{status}</p>}
          <button
            type="submit"
            disabled={placing}
            className="w-full rounded-2xl bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark disabled:opacity-60"
          >
            {placing ? "Processing payment..." : "Place Order & Pay"}
          </button>
        </form>
      </div>
      <div className="flex-1">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-slate-800">Your design</h2>
          <p className="mb-3 text-sm text-slate-500">Model: {item.phoneModel}</p>
          <div className="flex justify-center">
            <img
              src={item.designImage}
              alt="Design preview"
              className="h-80 rounded-2xl border border-slate-200 bg-slate-900/5 object-contain p-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;


