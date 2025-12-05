import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar.jsx";
import { getAdminStats } from "../api/adminApi.js";

const ADMIN_STORAGE_KEY = "cpc_admin_token";

const StatCard = ({ label, value }) => (
  <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
    <p className="text-sm uppercase tracking-wide text-slate-500">{label}</p>
    <p className="mt-2 text-3xl font-semibold text-slate-800">{value}</p>
  </div>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalOrders: 0, todayOrders: 0, totalUsers: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!token) {
      navigate("/admin/login");
      return;
    }

    const fetchStats = async () => {
      try {
        const data = await getAdminStats(token);
        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">Loading dashboard...</div>
    );
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 md:flex-row">
      <AdminSidebar />
      <main className="flex-1 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Dashboard</h1>
          <p className="text-sm text-slate-500">Overview of recent performance.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="Total Orders" value={stats.totalOrders} />
          <StatCard label="Today Orders" value={stats.todayOrders} />
          <StatCard label="Total Users" value={stats.totalUsers} />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

