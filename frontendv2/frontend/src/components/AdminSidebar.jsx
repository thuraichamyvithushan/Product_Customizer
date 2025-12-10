import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const baseClass =
    "block rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100";

  const activeClass = "bg-brand text-white hover:bg-brand";

  return (
    <aside className="w-full max-w-xs rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-800">Admin Panel</h2>
      <nav className="flex flex-col gap-2">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) => (isActive ? activeClass : baseClass)}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) => (isActive ? activeClass : baseClass)}
        >
          Orders
        </NavLink>
        <NavLink
          to="/admin/models"
          className={({ isActive }) => (isActive ? activeClass : baseClass)}
        >
          Phone Models
        </NavLink>
        <NavLink
          to="/admin/users"
          className={({ isActive }) => (isActive ? activeClass : baseClass)}
        >
          Users
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;

