import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { item } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initial = user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-semibold text-brand">
          Custom Cover
        </Link>
        <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-brand font-semibold" : "hover:text-brand"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/design"
            className={({ isActive }) =>
              isActive ? "text-brand font-semibold" : "hover:text-brand"
            }
          >
            Design
          </NavLink>

          {isAuthenticated && item && user?.role !== "admin" && (
            <NavLink
              to="/user/cart"
              className={({ isActive }) =>
                isActive
                  ? "rounded-full border border-accent bg-accent px-3 py-1 text-xs font-semibold text-white"
                  : "rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs font-semibold text-accent hover:bg-accent/10"
              }
            >
              Cart (1)
            </NavLink>
          )}

          {isAuthenticated ? (
            <>
              {user?.role !== "admin" && (
                <NavLink
                  to="/user/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "text-brand font-semibold"
                      : "text-slate-600 hover:text-brand"
                  }
                >
                  User Panel
                </NavLink>
              )}
              {user?.role === "admin" && (
                <NavLink
                  to="/admin/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "text-brand font-semibold"
                      : "text-slate-600 hover:text-brand"
                  }
                >
                  Admin Panel
                </NavLink>
              )}
              <div className="flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs font-semibold text-white">
                  {initial}
                </div>
                <span className="hidden text-xs text-slate-700 sm:inline">
                  {user?.name || user?.email}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "text-brand font-semibold" : "hover:text-brand"
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "text-brand font-semibold" : "hover:text-brand"
                }
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

