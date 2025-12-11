import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../../components/UserSidebar.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { getMyOrders } from "../../api/orderApi.js";

const MyOrders = () => {
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const data = await getMyOrders(token);
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token, isAuthenticated, navigate]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 md:flex-row">
      <UserSidebar />
      <main className="flex-1 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">My Orders</h1>
          <p className="text-sm text-slate-500">View all your previous orders.</p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          {loading ? (
            <div className="p-8 text-center text-slate-500">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <p className="mb-4">No orders yet.</p>
              <button
                onClick={() => navigate("/design")}
                className="rounded-full bg-accent px-6 py-2 text-sm font-semibold text-white hover:bg-accent-dark"
              >
                Create Your First Design
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {orders.map((order) => (
                <div key={order._id} className="p-6 hover:bg-slate-50">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <img
                          src={order.designImage}
                          alt="design preview"
                          className="h-20 w-12 rounded-lg border border-slate-200 object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-slate-800">{order.phoneModel}</h3>
                          <p className="text-xs text-slate-500">
                            Order ID: {order._id.slice(-8)}
                          </p>
                          <p className="text-xs text-slate-500">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-slate-600">Quantity: {order.quantity}</p>
                        <span
                          className={
                            order.status === "confirmed"
                              ? "mt-1 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                              : "mt-1 inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700"
                          }
                        >
                          {order.status || "pending"}
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      {selectedOrder && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/60 px-4">
          <div className="max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">Order Details</h2>
                <p className="text-xs text-slate-500">ID: {selectedOrder._id.slice(-8)}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200"
              >
                Close
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex justify-center">
                <img
                  src={selectedOrder.designImage}
                  alt="full design"
                  className="h-80 rounded-2xl border border-slate-200 bg-slate-900/5 object-contain p-2"
                />
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <p>
                  <span className="font-semibold">Phone Model:</span> {selectedOrder.phoneModel}
                </p>
                <p>
                  <span className="font-semibold">Quantity:</span> {selectedOrder.quantity}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={
                      selectedOrder.status === "confirmed"
                        ? "text-emerald-700"
                        : "text-amber-700"
                    }
                  >
                    {selectedOrder.status || "pending"}
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Order Date:</span>{" "}
                  {new Date(selectedOrder.createdAt).toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Shipping Address:</span> {selectedOrder.address}
                </p>
                <p>
                  <span className="font-semibold">Contact:</span> {selectedOrder.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;

