import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { ShoppingBag, Menu, X, ChevronDown, Sparkles } from "lucide-react";
import logo from "../assets/logo2.PNG";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { item } = useCart();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef(null);

  const initial = user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate("/login");
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/custom-mobilecase", label: "Phone Cases" },
    { to: "/pet-center", label: "Pet Gifts" },
    { to: "/design", label: "Start Design" },
  ];

  return (
    <>
      {/* Fixed White Background Navbar */}
      <nav className={`sticky top-0 z-50  transition-all duration-500 bg-white ${
        scrolled ? "shadow-lg py-3" : "shadow-md py-5"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src={logo}
              alt="PetCase"
              className="h-10 md:h-12 w-auto transition-transform group-hover:scale-110 duration-300"
            />
           
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-2">

            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative px-5 py-3 text-md font-semibold transition-all duration-300
                  ${isActive ? "text-[#fe7245]" : "text-gray-800 hover:text-[#fe7245]"}
                  after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-[#fe7245] after:transition-all hover:after:w-8`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* Cart */}
            {isAuthenticated && item > 0 && user?.role !== "admin" && (
              <NavLink
                to="/user/cart"
                className="relative ml-6 px-7 py-3 bg-gradient-to-r from-[#fe7245] to-pink-600 text-white rounded-full font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3"
              >
                <ShoppingBag className="w-5 h-5" />
                Cart ({item})
              </NavLink>
            )}

            {/* Authenticated User */}
            {isAuthenticated ? (
              <div className="relative ml-6" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 px-5 py-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#fe7245] to-pink-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {initial}
                  </div>
                  <span className="hidden xl:block font-medium text-gray-800">
                    Hi, {user?.name?.split(" ")[0] || "User"}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${profileOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                    <div className="p-5 border-b border-gray-100">
                      <p className="font-bold text-gray-900">{user?.name || "User"}</p>
                      <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                    </div>
                    {user?.role === "admin" ? (
                      <Link to="/admin/dashboard" className="block px-5 py-4 text-gray-700 hover:bg-gray-50 transition">Admin Panel</Link>
                    ) : (
                      <Link to="/user/dashboard" className="block px-5 py-4 text-gray-700 hover:bg-gray-50 transition">My Orders</Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-5 py-4 text-red-600 hover:bg-red-50 font-medium transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4 ml-6">
                <Link to="/login" className="text-gray-700 font-semibold hover:text-[#fe7245] transition">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-8 py-3 bg-gradient-to-r from-[#fe7245] to-pink-600 text-white rounded-full font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Sign Up Free
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
          >
            {mobileOpen ? <X className="w-6 h-6 text-gray-800" /> : <Menu className="w-6 h-6 text-gray-800" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu — FULLY WORKING */}
      {mobileOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-white shadow-2xl pt-8 pb-10 px-6 overflow-y-auto">
          <div className="space-y-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block text-2xl font-bold py-3 ${isActive ? "text-[#fe7245]" : "text-gray-800"} hover:text-[#fe7245] transition`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {isAuthenticated ? (
              <div className="pt-8 border-t border-gray-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#fe7245] to-pink-600 flex items-center justify-center text-white text-2xl font-bold shadow-2xl">
                    {initial}
                  </div>
                  <div>
                    <p className="font-bold text-xl text-gray-900">{user?.name || "User"}</p>
                    <p className="text-gray-500">{user?.email}</p>
                  </div>
                </div>

                {user?.role === "admin" ? (
                  <Link to="/admin/dashboard" onClick={() => setMobileOpen(false)} className="block py-4 text-lg font-bold text-[#fe7245]">
                    Admin Panel
                  </Link>
                ) : (
                  <Link to="/user/dashboard" onClick={() => setMobileOpen(false)} className="block py-4 text-lg font-bold text-[#fe7245]">
                    My Orders
                  </Link>
                )}

                {item > 0 && (
                  <Link to="/user/cart" onClick={() => setMobileOpen(false)} className="block mt-6 py-5 bg-gradient-to-r from-[#fe7245] to-pink-600 text-white rounded-full font-bold text-center shadow-xl">
                    Cart ({item} items)
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full mt-6 py-5 bg-red-600 text-white rounded-full font-bold shadow-xl hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-8 space-y-6">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center py-5 text-2xl font-bold text-gray-800"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center py-6 bg-gradient-to-r from-[#fe7245] to-pink-600 text-white rounded-full font-bold text-2xl shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Sign Up Free
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Backdrop when mobile menu open */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;