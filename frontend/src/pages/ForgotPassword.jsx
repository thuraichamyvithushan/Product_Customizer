import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../api/authApi.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg text-center">
          <div className="mb-4">
            <svg
              className="mx-auto h-16 w-16 text-emerald-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-slate-800">Check your email</h2>
          <p className="mt-2 text-sm text-slate-500">
            If that email exists, a password reset link has been sent to <strong>{email}</strong>
          </p>
          <p className="mt-4 text-xs text-slate-400">
            Please check your inbox and follow the instructions to reset your password.
          </p>
          {import.meta.env.DEV && (
            <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 p-3 text-left">
              <p className="text-xs font-semibold text-amber-800 mb-1">Development Mode:</p>
              <p className="text-xs text-amber-700">
                If email is not configured, check the server console for the reset link.
              </p>
            </div>
          )}
          <Link
            to="/login"
            className="mt-6 inline-block rounded-xl bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-dark"
          >
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="text-2xl font-semibold text-slate-800">Forgot Password</h2>
        <p className="mt-2 text-sm text-slate-500">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl border border-slate-200 px-4 py-3"
            required
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-accent px-4 py-3 font-semibold text-white hover:bg-accent-dark disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <p className="mt-4 text-sm text-slate-500">
          Remember your password?{" "}
          <Link to="/login" className="text-brand">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;

