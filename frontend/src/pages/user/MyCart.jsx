import { useNavigate } from "react-router-dom";
import UserSidebar from "../../components/UserSidebar.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCart } from "../../context/CartContext.jsx";

const MyCart = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { items, clear, removeItem, total } = useCart();

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  if (!items || items.length === 0) {
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
          <p className="text-sm text-slate-500">Review your designs before checkout.</p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6">
            {items.map((item, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-4 border-b border-slate-100 pb-4">
                <div className="flex-1">
                  <div className="flex justify-center rounded-xl border border-slate-200 bg-slate-900/5 p-4">
                    <img
                      src={item.designImage}
                      alt={item.phoneModel}
                      className="h-48 rounded-lg object-contain"
                    />
                  </div>
                  <p className="mt-2 text-sm font-medium text-slate-700">{item.phoneModel}</p>
                </div>
                <div className="flex flex-col justify-between md:w-64 gap-2">
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Quantity:</span>
                    <span>{item.quantity}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Price:</span>
                    <span>Rs {item.price}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-accent">
                    <span>Subtotal:</span>
                    <span>Rs {item.price * item.quantity}</span>
                  </div>
                  <button
                    onClick={() => removeItem(idx)}
                    className="mt-2 w-full rounded-full bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-100"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-between pt-4 font-semibold text-slate-800 text-lg">
              <span>Total:</span>
              <span>Rs {total}</span>
            </div>
            <div className="flex flex-col gap-3 md:flex-row">
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
                Add More Designs
              </button>
              <button
                onClick={() => {
                  if (window.confirm("Remove all items from cart?")) clear();
                }}
                className="w-full rounded-full bg-rose-50 px-6 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-100"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyCart;
