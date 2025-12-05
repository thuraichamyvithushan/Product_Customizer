import { useNavigate } from "react-router-dom";
import UserSidebar from "../../components/UserSidebar.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCart } from "../../context/CartContext.jsx";

const MyCart = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { item, clear } = useCart();

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  if (!item) {
    return (
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 md:flex-row">
        <UserSidebar />
        <main className="flex-1 space-y-6">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">My Cart</h1>
            <p className="text-sm text-slate-500">Your cart items will appear here.</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
              <span className="text-2xl">🛒</span>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-800">Your cart is empty</h3>
            <p className="mb-6 text-sm text-slate-500">
              Start designing a custom phone cover to add items to your cart.
            </p>
            <button
              onClick={() => navigate("/design")}
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark"
            >
              Create a Design
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 md:flex-row">
      <UserSidebar />
      <main className="flex-1 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">My Cart</h1>
          <p className="text-sm text-slate-500">Review your design before checkout.</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex-1">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-slate-800">Design Preview</h3>
                <p className="text-sm text-slate-500">Phone Model: {item.phoneModel}</p>
              </div>
              <div className="flex justify-center rounded-xl border border-slate-200 bg-slate-900/5 p-4">
                <img
                  src={item.designImage}
                  alt="Design preview"
                  className="h-96 rounded-lg object-contain"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 md:w-80">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h4 className="mb-3 text-sm font-semibold text-slate-800">Order Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Phone Model:</span>
                    <span className="font-medium text-slate-800">{item.phoneModel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Quantity:</span>
                    <span className="font-medium text-slate-800">1</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => navigate("/design")}
                  className="w-full rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Edit Design
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Remove this item from cart?")) {
                      clear();
                    }
                  }}
                  className="w-full rounded-full bg-rose-50 px-6 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-100"
                >
                  Remove from Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyCart;

