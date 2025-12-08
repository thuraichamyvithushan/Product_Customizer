import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useState, useEffect, useRef } from "react";
import logo from "../assets/logo.PNG";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { item } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef(null);
  const infoRef = useRef(null);

  const isInfoPageActive = location.pathname === "/about" || location.pathname === "/contact" || location.pathname === "/faq";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initial =
    user?.name?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (infoRef.current && !infoRef.current.contains(event.target)) {
        setInfoOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [navigate]);

  return (
    <nav
      className={`sticky top-0 z-50 bg-[#0a214f] transition-all duration-300 ${
        scrolled ? "shadow-lg py-2" : "shadow-md py-3"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 lg:px-6">
        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <img
            src={logo}
            alt="Logo"
            className="h-9 w-auto object-contain sm:h-11 md:h-12"
          />
        </Link>

        {/* DESKTOP NAV MENUS */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 xl:px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                isActive
                  ? "text-[#fe7245] bg-white/10"
                  : "text-white hover:text-[#fe7245] hover:bg-white/5"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/design"
            className={({ isActive }) =>
              `px-3 xl:px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                isActive
                  ? "text-[#fe7245] bg-white/10"
                  : "text-white hover:text-[#fe7245] hover:bg-white/5"
              }`
            }
          >
            Design
          </NavLink>

          <NavLink
            to="/blog"
            className={({ isActive }) =>
              `px-3 xl:px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                isActive
                  ? "text-[#fe7245] bg-white/10"
                  : "text-white hover:text-[#fe7245] hover:bg-white/5"
              }`
            }
          >
            Blog
          </NavLink>

          <NavLink
            to="/store-locator"
            className={({ isActive }) =>
              `px-3 xl:px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                isActive
                  ? "text-[#fe7245] bg-white/10"
                  : "text-white hover:text-[#fe7245] hover:bg-white/5"
              }`
            }
          >
            Store Locator
          </NavLink>

          {/* INFO DROPDOWN */}
          <div className="relative" ref={infoRef}>
            <button
              onClick={() => setInfoOpen(!infoOpen)}
              className={`px-3 xl:px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1 ${
                infoOpen || isInfoPageActive
                  ? "text-[#fe7245] bg-white/10"
                  : "text-white hover:text-[#fe7245] hover:bg-white/5"
              }`}
            >
              Info
              <svg
                className={`w-4 h-4 transition-transform ${infoOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* DROPDOWN MENU */}
            {infoOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-xl py-2 border border-gray-100 z-50">
                <NavLink
                  to="/about"
                  onClick={() => setInfoOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-[#fe7245] bg-blue-50"
                        : "text-gray-700 hover:text-[#fe7245] hover:bg-blue-50"
                    }`
                  }
                >
                  About Us
                </NavLink>
                <NavLink
                  to="/contact"
                  onClick={() => setInfoOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-[#fe7245] bg-blue-50"
                        : "text-gray-700 hover:text-[#fe7245] hover:bg-blue-50"
                    }`
                  }
                >
                  Contact
                </NavLink>
                <NavLink
                  to="/faq"
                  onClick={() => setInfoOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-[#fe7245] bg-blue-50"
                        : "text-gray-700 hover:text-[#fe7245] hover:bg-blue-50"
                    }`
                  }
                >
                  FAQ
                </NavLink>
              </div>
            )}
          </div>

          {/* CART */}
          {isAuthenticated && item && user?.role !== "admin" && (
            <NavLink
              to="/user/cart"
              className="relative rounded-full bg-[#fe7245] px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#ff855f] hover:shadow-lg"
            >
              Cart
              <span className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-[#fe7245]">
                1
              </span>
            </NavLink>
          )}

          {isAuthenticated ? (
            <>
              {/* User Panel */}
              {user?.role !== "admin" && (
                <NavLink
                  to="/user/dashboard"
                  className={({ isActive }) =>
                    `px-3 xl:px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                      isActive
                        ? "text-[#fe7245] bg-white/10"
                        : "text-white hover:text-[#fe7245] hover:bg-white/5"
                    }`
                  }
                >
                  User Panel
                </NavLink>
              )}

              {/* Admin Panel */}
              {user?.role === "admin" && (
                <NavLink
                  to="/admin/dashboard"
                  className={({ isActive }) =>
                    `px-3 xl:px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                      isActive
                        ? "text-[#fe7245] bg-white/10"
                        : "text-white hover:text-[#fe7245] hover:bg-white/5"
                    }`
                  }
                >
                  Admin Panel
                </NavLink>
              )}

              {/* USER PROFILE DROPDOWN */}
              <div className="relative ml-2" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 transition-all hover:bg-white/20"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#fe7245] to-[#ff6b3d] text-sm font-bold text-white shadow-md">
                    {initial}
                  </div>
                  <span className="text-sm font-medium text-white max-w-[120px] truncate">
                    {user?.name || user?.email}
                  </span>
                  <svg
                    className={`w-4 h-4 text-white transition-transform ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* DROPDOWN BOX */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-xl py-2 border border-gray-100">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs font-semibold text-gray-900 truncate">
                        {user?.name || user?.email}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `px-3 xl:px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? "text-[#fe7245] bg-white/10"
                      : "text-white hover:text-[#fe7245] hover:bg-white/5"
                  }`
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `px-3 xl:px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? "text-[#fe7245] bg-white/10"
                      : "text-white hover:text-[#fe7245] hover:bg-white/5"
                  }`
                }
              >
                Register
              </NavLink>
            </>
          )}

        </div>

        {/* MOBILE TOGGLE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          {open ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-2 bg-[#0a214f] border-t border-white/10">
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                isActive
                  ? "text-[#fe7245] bg-white/10"
                  : "text-white hover:text-[#fe7245] hover:bg-white/5"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/design"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                isActive
                  ? "text-[#fe7245] bg-white/10"
                  : "text-white hover:text-[#fe7245] hover:bg-white/5"
              }`
            }
          >
            Design
          </NavLink>

          <NavLink
            to="/blog"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                isActive
                  ? "text-[#fe7245] bg-white/10"
                  : "text-white hover:text-[#fe7245] hover:bg-white/5"
              }`
            }
          >
            Blog
          </NavLink>

          <NavLink
            to="/store-locator"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                isActive
                  ? "text-[#fe7245] bg-white/10"
                  : "text-white hover:text-[#fe7245] hover:bg-white/5"
              }`
            }
          >
            Store Locator
          </NavLink>

          {/* INFO DROPDOWN MOBILE */}
          <div className="space-y-1">
            <button
              onClick={() => setInfoOpen(!infoOpen)}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                infoOpen || isInfoPageActive
                  ? "text-[#fe7245] bg-white/10"
                  : "text-white hover:text-[#fe7245] hover:bg-white/5"
              }`}
            >
              <span>Info</span>
              <svg
                className={`w-4 h-4 transition-transform ${infoOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* DROPDOWN ITEMS */}
            {infoOpen && (
              <div className="pl-4 space-y-1">
                <NavLink
                  to="/about"
                  onClick={() => {
                    setInfoOpen(false);
                    setOpen(false);
                  }}
                  className={({ isActive }) =>
                    `block px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                      isActive
                        ? "text-[#fe7245] bg-white/10"
                        : "text-white/80 hover:text-[#fe7245] hover:bg-white/5"
                    }`
                  }
                >
                  About Us
                </NavLink>
                <NavLink
                  to="/contact"
                  onClick={() => {
                    setInfoOpen(false);
                    setOpen(false);
                  }}
                  className={({ isActive }) =>
                    `block px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                      isActive
                        ? "text-[#fe7245] bg-white/10"
                        : "text-white/80 hover:text-[#fe7245] hover:bg-white/5"
                    }`
                  }
                >
                  Contact
                </NavLink>
                <NavLink
                  to="/faq"
                  onClick={() => {
                    setInfoOpen(false);
                    setOpen(false);
                  }}
                  className={({ isActive }) =>
                    `block px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                      isActive
                        ? "text-[#fe7245] bg-white/10"
                        : "text-white/80 hover:text-[#fe7245] hover:bg-white/5"
                    }`
                  }
                >
                  FAQ
                </NavLink>
              </div>
            )}
          </div>

          {/* CART */}
          {isAuthenticated && item && user?.role !== "admin" && (
            <NavLink
              to="/user/cart"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-lg bg-[#fe7245] text-white transition-all hover:bg-[#ff855f]"
            >
              <span>Cart</span>
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-[#fe7245]">
                1
              </span>
            </NavLink>
          )}

          {isAuthenticated ? (
            <>
              {/* User Panel */}
              {user?.role !== "admin" && (
                <NavLink
                  to="/user/dashboard"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                      isActive
                        ? "text-[#fe7245] bg-white/10"
                        : "text-white hover:text-[#fe7245] hover:bg-white/5"
                    }`
                  }
                >
                  User Panel
                </NavLink>
              )}

              {/* Admin Panel */}
              {user?.role === "admin" && (
                <NavLink
                  to="/admin/dashboard"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                      isActive
                        ? "text-[#fe7245] bg-white/10"
                        : "text-white hover:text-[#fe7245] hover:bg-white/5"
                    }`
                  }
                >
                  Admin Panel
                </NavLink>
              )}

              {/* USER PROFILE */}
              <div className="px-4 py-3 rounded-lg bg-white/5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#fe7245] to-[#ff6b3d] text-sm font-bold text-white shadow-md">
                    {initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                      {user?.name || user?.email}
                    </p>
                    <p className="text-xs text-gray-300 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="w-full px-4 py-2.5 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? "text-[#fe7245] bg-white/10"
                      : "text-white hover:text-[#fe7245] hover:bg-white/5"
                  }`
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? "text-[#fe7245] bg-white/10"
                      : "text-white hover:text-[#fe7245] hover:bg-white/5"
                  }`
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