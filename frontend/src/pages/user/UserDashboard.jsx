import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../../components/UserSidebar.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { getMyOrders } from "../../api/orderApi.js";
import { useCart } from "../../context/CartContext.jsx";

const StatCard = ({ label, value }) => (
  <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
    <p className="text-sm uppercase tracking-wide text-slate-500">{label}</p>
    <p className="mt-2 text-3xl font-semibold text-slate-800">{value}</p>
  </div>
);

const UserDashboard = () => {
  const navigate = useNavigate();
  const { token, isAuthenticated, user } = useAuth();
  const { item } = useCart();
  const [stats, setStats] = useState({ totalOrders: 0, pendingOrders: 0, confirmedOrders: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchStats = async () => {
      try {
        const orders = await getMyOrders(token);
        const total = orders.length;
        const pending = orders.filter((o) => o.status === "pending").length;
        const confirmed = orders.filter((o) => o.status === "confirmed").length;
        setStats({ totalOrders: total, pendingOrders: pending, confirmedOrders: confirmed });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [token, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">Loading dashboard...</div>
    );
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 md:flex-row">
      <UserSidebar />
      <main className="flex-1 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Welcome back, {user?.name}!</h1>
          <p className="text-sm text-slate-500">Overview of your account and orders.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="Total Orders" value={stats.totalOrders} />
          <StatCard label="Pending Orders" value={stats.pendingOrders} />
          <StatCard label="Confirmed Orders" value={stats.confirmedOrders} />
        </div>
        {item && (
          <div className="rounded-2xl border border-brand/20 bg-brand/5 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Item in Cart</h3>
                <p className="text-sm text-slate-600">You have a design ready to checkout</p>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="rounded-full bg-accent px-6 py-2 text-sm font-semibold text-white hover:bg-accent-dark"
              >
                Go to Checkout
              </button>
            </div>
          </div>
        )}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-slate-800">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/design")}
              className="rounded-full bg-accent px-6 py-2 text-sm font-semibold text-white hover:bg-accent-dark"
            >
              Create New Design
            </button>
            <button
              onClick={() => navigate("/user/orders")}
              className="rounded-full border border-slate-200 px-6 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              View All Orders
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;

