import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar.jsx";
import { confirmAdminOrder, deleteAdminOrder, getAdminOrders } from "../api/adminApi.js";

const ADMIN_STORAGE_KEY = "cpc_admin_token";

const OrderList = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({ pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = useCallback(async () => {
    const token = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!token) {
      navigate("/admin/login");
      return;
    }

    setLoading(true);
    try {
      const data = await getAdminOrders({ page, search, token });
      setOrders(data.data);
      setPagination(data.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [navigate, page, search]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!token) {
      navigate("/admin/login");
      return;
    }
    if (!window.confirm("Delete this order?")) return;
    try {
      await deleteAdminOrder(id, token);
      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm = async (id) => {
    const token = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!token) {
      navigate("/admin/login");
      return;
    }
    if (!window.confirm("Confirm this order and send email?")) return;
    try {
      await confirmAdminOrder(id, token);
      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 md:flex-row">
      <AdminSidebar />
      <main className="flex-1 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Orders</h1>
            <p className="text-sm text-slate-500">Manage recent submissions.</p>
          </div>
          <input
            type="search"
            placeholder="Search by model..."
            className="rounded-full border border-slate-200 px-4 py-2 text-sm"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Phone Model</th>
                <th className="px-4 py-3">Design</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-4 py-6 text-center">
                    Loading orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-6 text-center">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id}>
                    <td className="px-4 py-3 font-mono text-xs">{order._id}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{order.userId?.name || "N/A"}</p>
                      <p className="text-xs text-slate-400">{order.userId?.email}</p>
                    </td>
                    <td className="px-4 py-3">{order.phoneModel}</td>
                    <td className="px-4 py-3">
                      <img
                        src={order.designImage}
                        alt="design preview"
                        className="h-16 w-10 rounded-lg border border-slate-200 object-cover"
                      />
                    </td>
                    <td className="px-4 py-3">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold">
                      <span
                        className={
                          order.status === "confirmed"
                            ? "rounded-full bg-emerald-50 px-3 py-1 text-emerald-700"
                            : "rounded-full bg-amber-50 px-3 py-1 text-amber-700"
                        }
                      >
                        {order.status || "pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3 space-x-2 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                      >
                        View
                      </button>
                      {order.status !== "confirmed" && (
                        <button
                          onClick={() => handleConfirm(order._id)}
                          className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
                        >
                          Confirm
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-100"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between text-sm text-slate-500">
          <p>
            Page {pagination.page || 1} of {pagination.pages || 1} • Total {pagination.total} orders
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="rounded-full border border-slate-200 px-4 py-2 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => (p < (pagination.pages || 1) ? p + 1 : p))}
              disabled={page >= (pagination.pages || 1)}
              className="rounded-full border border-slate-200 px-4 py-2 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </main>
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
  <div className="w-full max-w-lg rounded-2xl bg-white p-4 shadow-xl overflow-y-auto max-h-[90vh]">

    {/* Header */}
    <div className="mb-4 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">Order Preview</h2>
        <p className="text-xs text-slate-500">{selectedOrder._id}</p>
      </div>
      <button
        onClick={() => setSelectedOrder(null)}
        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200"
      >
        Close
      </button>
    </div>

    <div className="flex flex-col gap-4">

      {/* Final Design */}
      <div>
        <h3 className="mb-2 text-sm font-semibold text-slate-800">Final Customized Design</h3>
        <div className="flex justify-center">
          <img
            src={selectedOrder.designImage}
            alt="final customized design"
            className="max-h-80 w-full rounded-2xl border border-slate-200 bg-slate-100 object-contain p-2"
          />
        </div>
      </div>

      {/* User Uploaded Image */}
      {selectedOrder.userCustomImage && (
        <div>
          <h3 className="mb-2 text-sm font-semibold text-slate-800">User's Uploaded Image</h3>
          <div className="flex justify-center">
            <img
              src={selectedOrder.userCustomImage}
              alt="user custom image"
              className="max-h-60 w-full rounded-2xl border border-slate-200 bg-slate-100 object-contain p-2"
            />
          </div>
        </div>
      )}

      {/* Template Image */}
      {selectedOrder.templateImage && (
        <div>
          <h3 className="mb-2 text-sm font-semibold text-slate-800">Template Background</h3>
          <div className="flex justify-center">
            <img
              src={selectedOrder.templateImage}
              alt="template background"
              className="max-h-60 w-full rounded-2xl border border-slate-200 bg-slate-100 object-contain p-2"
            />
          </div>
        </div>
      )}

      {/* Customer Details */}
      <div className="space-y-1 text-sm text-slate-600">
        <p><span className="font-semibold">Customer:</span> {selectedOrder.fullName} ({selectedOrder.email})</p>
        <p><span className="font-semibold">Phone:</span> {selectedOrder.phone}</p>
        <p><span className="font-semibold">Model:</span> {selectedOrder.phoneModel}</p>
        <p><span className="font-semibold">Quantity:</span> {selectedOrder.quantity}</p>
        <p><span className="font-semibold">Address:</span> {selectedOrder.address}</p>
        <p><span className="font-semibold">Status:</span> {selectedOrder.status}</p>
      </div>

    </div>
  </div>
</div>
 
      )}
    </div>
  );
};

export default OrderList;

