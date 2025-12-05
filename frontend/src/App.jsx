import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Designer from "./pages/Designer.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Success from "./pages/Success.jsx";
import Checkout from "./pages/Checkout.jsx";
import AdminLogin from "./admin/AdminLogin.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import OrderList from "./admin/OrderList.jsx";
import PhoneModelManager from "./admin/PhoneModelManager.jsx";
import UserManager from "./admin/UserManager.jsx";
import UserDashboard from "./pages/user/UserDashboard.jsx";
import MyOrders from "./pages/user/MyOrders.jsx";
import MyCart from "./pages/user/MyCart.jsx";
import { useAuth } from "./context/AuthContext.jsx";

const ADMIN_STORAGE_KEY = "cpc_admin_token";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem(ADMIN_STORAGE_KEY);
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

const UserRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppLayout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isUserRoute = location.pathname.startsWith("/user");
  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
    </>
  );
};

const App = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/design" element={<Designer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/success" element={<Success />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <OrderList />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/models"
          element={
            <AdminRoute>
              <PhoneModelManager />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <UserManager />
            </AdminRoute>
          }
        />

        {/* User Panel Routes */}
        <Route
          path="/user/dashboard"
          element={
            <UserRoute>
              <UserDashboard />
            </UserRoute>
          }
        />
        <Route
          path="/user/orders"
          element={
            <UserRoute>
              <MyOrders />
            </UserRoute>
          }
        />
        <Route
          path="/user/cart"
          element={
            <UserRoute>
              <MyCart />
            </UserRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
};

export default App;

