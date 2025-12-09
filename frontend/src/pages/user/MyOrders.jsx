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
              {orders.map((order) => {
                const firstItem = order.items && order.items.length > 0 ? order.items[0] : null;
                return (
                  <div key={order._id} className="p-6 hover:bg-slate-50">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          {firstItem?.designImage && (
                            <img
                              src={firstItem.designImage}
                              alt="design preview"
                              className="h-20 w-12 rounded-lg border border-slate-200 object-cover"
                            />
                          )}
                          <div>
                            <h3 className="font-semibold text-slate-800">
                              {firstItem?.productName || "Custom Item"}
                              {order.items && order.items.length > 1 && (
                                <span className="ml-1 text-xs text-slate-500">
                                  +{order.items.length - 1} more
                                </span>
                              )}
                            </h3>
                            <p className="text-xs text-slate-500">Order ID: {order._id.slice(-8)}</p>
                            <p className="text-xs text-slate-500">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-slate-600">
                            Items: {order.items ? order.items.length : 0}
                          </p>
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
                );
              })}
            </div>
          )}
        </div>
      </main>
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-xl overflow-y-auto max-h-[90vh] md:max-h-[85vh]">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">Order Details</h2>
                <p className="text-xs text-slate-500">ID: {selectedOrder._id.slice(-12)}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
              >
                ✕ Close
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Left Column - Items */}
              <div className="flex flex-col gap-4">
                {selectedOrder.items && selectedOrder.items.length > 0 ? (
                  selectedOrder.items.map((item, idx) => (
                    <div key={`${item.productId}-${idx}`} className="space-y-2 rounded-xl border border-slate-200 p-3 bg-slate-50">
                      <h3 className="text-sm font-semibold text-slate-800">
                        {item.productName} (x{item.quantity || 1})
                      </h3>
                      <div className="flex justify-center rounded-xl border border-slate-200 bg-white p-2">
                        <img
                          src={item.designImage}
                          alt="design"
                          className="max-h-64 w-full rounded-lg object-contain md:max-h-80"
                        />
                      </div>
                      {item.userCustomImage && (
                        <div>
                          <p className="text-xs font-semibold text-slate-700 mb-1">Your Upload</p>
                          <div className="flex justify-center rounded-xl border border-slate-200 bg-white p-2">
                            <img
                              src={item.userCustomImage}
                              alt="user upload"
                              className="max-h-48 w-full rounded-lg object-contain md:max-h-64"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-600">No items found.</p>
                )}
              </div>

              {/* Right Column - Order Details */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-800">Order Information</h3>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <p className="font-semibold text-slate-700">Items</p>
                    <p>{selectedOrder.items ? selectedOrder.items.length : 0} item(s)</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <p className="font-semibold text-slate-700">Total</p>
                    <p>Rs {selectedOrder.total || 0}</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <p className="font-semibold text-slate-700">Status</p>
                    <span
                      className={
                        selectedOrder.status === "confirmed"
                          ? "inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                          : "inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700"
                      }
                    >
                      {selectedOrder.status || "pending"}
                    </span>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <p className="font-semibold text-slate-700">Order Date</p>
                    <p className="text-xs">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <p className="font-semibold text-slate-700">Shipping Address</p>
                    <p className="text-xs">{selectedOrder.address}</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <p className="font-semibold text-slate-700">Contact</p>
                    <p className="text-xs">{selectedOrder.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;

