import { NavLink } from "react-router-dom";

const UserSidebar = () => {
  const baseClass =
    "block rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100";

  const activeClass = "bg-brand text-white hover:bg-brand";

  return (
    <aside className="w-full max-w-xs rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-800">My Account</h2>
      <nav className="flex flex-col gap-2">
        <NavLink
          to="/user/dashboard"
          className={({ isActive }) => (isActive ? activeClass : baseClass)}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/user/orders"
          className={({ isActive }) => (isActive ? activeClass : baseClass)}
        >
          My Orders
        </NavLink>
        <NavLink
          to="/user/cart"
          className={({ isActive }) => (isActive ? activeClass : baseClass)}
        >
          My Cart
        </NavLink>
      </nav>
    </aside>
  );
};

export default UserSidebar;

