import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import logo from "../assets/logo/logo.png";
import { ShoppingBag, Menu, X, ChevronDown, Sparkles } from "lucide-react";

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





  const isInfoPageActive =
    location.pathname === "/about" ||
    location.pathname === "/blog" ||
    location.pathname === "/store-locator" ||
    location.pathname === "/contact" ||
    location.pathname === "/faq";


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
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [navigate]);


  // Close mobile menu & info dropdown on route change
  useEffect(() => {
    setOpen(false);       // Close mobile menu
    setInfoOpen(false);   // Close Info dropdown
  }, [location.pathname]);

  return (

    <nav
      className={`sticky top-0 z-50 bg-white transition-all duration-300 ${scrolled ? "shadow-lg py-2" : "shadow-md py-3"
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
            alt="CaseCraft"
            className="h-10 w-auto sm:h-11 md:h-12 object-contain transition-transform group-hover:scale-110 duration-300"
          />
        </Link>

        {/* DESKTOP NAV MENUS */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          <NavLink
            to="/"
            onClick={() => setInfoOpen(false)}
            className={({ isActive }) =>
              `relative px-5 py-3 text-md font-semibold transition-all duration-300
                  ${isActive ? "text-[#fe7245]" : "text-gray-800 hover:text-[#fe7245]"}
                  after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-[#fe7245] after:transition-all hover:after:w-8`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/custom-mobilecase"
            onClick={() => setInfoOpen(false)}
            className={({ isActive }) =>
              `relative px-5 py-3 text-md font-semibold transition-all duration-300
                  ${isActive ? "text-[#fe7245]" : "text-gray-800 hover:text-[#fe7245]"}
                  after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-[#fe7245] after:transition-all hover:after:w-8`
            }
          >
            Phone Cases
          </NavLink>

          <NavLink
            to="/pet-center"
            onClick={() => setInfoOpen(false)}
            className={({ isActive }) =>
              `relative px-5 py-3 text-md font-semibold transition-all duration-300
                  ${isActive ? "text-[#fe7245]" : "text-gray-800 hover:text-[#fe7245]"}
                  after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-[#fe7245] after:transition-all hover:after:w-8`
            }
          >
            Pet Gifts
          </NavLink>


          {/* INFO DROPDOWN */}
          <div className="relative" ref={infoRef}
            onMouseEnter={() => setInfoOpen(true)}
            onMouseLeave={() => setInfoOpen(false)}
          >
            <button
              onClick={() => setInfoOpen(!infoOpen)}
              className={`px-3 xl:px-4 py-2 text-md font-semibold rounded-lg transition-all flex items-center gap-1 ${infoOpen || isInfoPageActive
                ? "text-[#fe7245] bg-white/10"
                : "text-[#0a214f] hover:text-[#fe7245] hover:bg-white/5"
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
              <div className="absolute right-0  w-48 rounded-xl bg-white shadow-xl py-2 border border-gray-100 z-50">
                <NavLink
                  to="/about"
                  onClick={() => setInfoOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 text-md font-semibold transition-colors ${isActive
                      ? "text-[#fe7245] bg-blue-50"
                      : "text-gray-700 hover:text-[#fe7245] hover:bg-blue-50"
                    }`
                  }
                >
                  About Us
                </NavLink>

                <NavLink
                  to="/blog"
                  className={({ isActive }) =>
                    `block px-4 py-2.5 text-md font-semibold transition-colors ${isActive
                      ? "text-[#fe7245] bg-blue-50"
                      : "text-gray-700 hover:text-[#fe7245] hover:bg-blue-50"
                    }`
                  }
                >
                  Blog
                </NavLink>

                <NavLink
                  to="/store-locator"
                  className={({ isActive }) =>
                    `block px-4 py-2.5 text-md font-semibold transition-colors ${isActive
                      ? "text-[#fe7245] bg-blue-50"
                      : "text-gray-700 hover:text-[#fe7245] hover:bg-blue-50"
                    }`
                  }
                >
                  Store Locator
                </NavLink>

                <NavLink
                  to="/contact"
                  onClick={() => setInfoOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 text-md font-semibold transition-colors ${isActive
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
                    `block px-4 py-2.5 text-md font-semibold transition-colors ${isActive
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

          {/* Desktop Cart */}
          {isAuthenticated && item > 0 && user?.role !== "admin" && (
            <NavLink
              to="/user/cart"
              className="relative ml-6 px-7 py-3 bg-gradient-to-r from-[#fe7245] to-pink-600 text-white rounded-full font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3"
            >
              <ShoppingBag className="w-5 h-5" />
              Cart
              <span className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-[#fe7245]">
                {item}
              </span>
            </NavLink>
          )}


          {/* Desktop Authenticated User */}
          {isAuthenticated ? (
            <>

              {/* Desktop PROFILE DROPDOWN */}
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
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform ${profileOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {/* Desktop  DROPDOWN BOX */}
                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                    <div className="p-5 border-b border-gray-100">
                      <p className="font-bold text-gray-900">{user?.name || "User"}</p>
                      <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                    </div>

                    {user?.role === "admin" ? (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="block px-5 py-4 text-gray-700 hover:bg-gray-50 transition"
                      >
                        Admin Panel
                      </Link>
                    ) : (
                      <Link
                        to="/user/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="block px-5 py-4 text-gray-700 hover:bg-gray-50 transition"
                      >
                        My Panel
                      </Link>
                    )}

                    {/* Logout */}
                    <button
                      onClick={() => {
                        handleLogout();
                        setProfileOpen(false);
                      }}
                      className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50 font-medium transition flex items-center gap-2"
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
                onClick={() => setOpen(false)}
                className="px-8 py-3 bg-gradient-to-r from-[#fe7245] to-pink-600 text-white rounded-full font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Login
              </NavLink>


            </>
          )}

        </div>

        {/* Mobile Section */}

        {/* MOBILE TOGGLE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-[#0a214f] p-2 rounded-lg hover:bg-white/10 transition-colors"
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
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-2 bg-[#0a214f] border-t border-white/10">
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-3 text-md font-semibold rounded-lg transition-all ${isActive
                ? "text-[#fe7245] bg-white/10"
                : "text-white hover:text-[#fe7245] hover:bg-white/5"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/custom-mobilecase"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-3 text-md font-semibold rounded-lg transition-all ${isActive
                ? "text-[#fe7245] bg-white/10"
                : "text-white hover:text-[#fe7245] hover:bg-white/5"
              }`
            }
          >
            Phone Cases
          </NavLink>

          <NavLink
            to="/pet-center"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-3 text-md font-semibold rounded-lg transition-all ${isActive
                ? "text-[#fe7245] bg-white/10"
                : "text-white hover:text-[#fe7245] hover:bg-white/5"
              }`
            }
          >
            Pet Gifts
          </NavLink>

          {/* INFO DROPDOWN MOBILE */}

          <div
            className="space-y-1 "
          >

            <button
              onClick={() => setInfoOpen(!infoOpen)}
              className={`w-full flex items-center justify-between px-4 py-3 text-md font-semibold rounded-lg transition-all ${infoOpen || isInfoPageActive
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

            {/* Mobile DROPDOWN ITEMS */}
            {infoOpen && (
              <div className="pl-4 space-y-1">
                <NavLink
                  to="/about"
                  onClick={() => {
                    setInfoOpen(false);
                    setOpen(false);
                  }}
                  className={({ isActive }) =>
                    `block px-4 py-2 text-md font-semibold rounded-lg transition-all ${isActive
                      ? "text-[#fe7245] bg-white/10"
                      : "text-white/80 hover:text-[#fe7245] hover:bg-white/5"
                    }`
                  }
                >
                  About Us
                </NavLink>
                <NavLink
                  to="/blog"
                  onClick={() => {
                    setInfoOpen(false);
                    setOpen(false);
                  }}
                  className={({ isActive }) =>
                    `block px-4 py-2 text-md font-semibold rounded-lg transition-all ${isActive
                      ? "text-[#fe7245] bg-white/10"
                      : "text-white/80 hover:text-[#fe7245] hover:bg-white/5"
                    }`
                  }
                >
                  Blog
                </NavLink>

                <NavLink
                  to="/store-locator"
                  onClick={() => {
                    setInfoOpen(false);
                    setOpen(false);
                  }}
                  className={({ isActive }) =>
                    `block px-4 py-2 text-md font-semibold rounded-lg transition-all ${isActive
                      ? "text-[#fe7245] bg-white/10"
                      : "text-white/80 hover:text-[#fe7245] hover:bg-white/5"
                    }`
                  }
                >
                  Store Locator
                </NavLink>

                <NavLink
                  to="/contact"
                  onClick={() => {
                    setInfoOpen(false);
                    setOpen(false);
                  }}
                  className={({ isActive }) =>
                    `block px-4 py-2 text-md font-semibold rounded-lg transition-all ${isActive
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
                    `block px-4 py-2 text-md font-semibold rounded-lg transition-all ${isActive
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

          {/* Mobile Cart */}
          {isAuthenticated && item > 0 && user?.role !== "admin" && (
            <NavLink
              to="/user/cart"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between px-4 py-3 mt-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-[#fe7245] to-pink-600 text-white transition-all hover:from-[#ff855f] hover:to-pink-500"
            >
              <span>Cart</span>
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-[#fe7245]">
                {item}
              </span>
            </NavLink>
          )}

          {isAuthenticated ? (
            <div className="relative" ref={profileRef}>
              {/* Profile Button */}
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className=" max-w-xs  font-bold shadow-xl  hover:shadow-2xl hover:scale-105  flex gap-2 items-center px-5 py-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 w-fit"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#fe7245] to-pink-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {initial}
                </div>
                <span className="font-medium text-gray-800 truncate">
                  Hi, {user?.name?.split(" ")[0] || "User"}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-600 transition-transform ${profileOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {/*  Mobile Profile dropdown */}
              {profileOpen && (
                <div className="absolute right-0 bottom-0  w-full max-w-xs bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col gap-2 p-3">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="font-bold text-gray-900 truncate">{user?.name || "User"}</p>
                    <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                  </div>

                  {/* Dashboard Link */}
                  {user?.role === "admin" ? (

                    <Link
                      to="/admin/dashboard"
                      className="block px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                      Admin Panel
                    </Link>
                  ) : (
                    <Link
                      to="/user/dashboard"
                      className="block px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                      My Panel
                    </Link>
                  )}

                  {/* Cart Link (if items > 0) */}
                  {/* {item > 0 && (
          <Link
            to="/user/cart"
            onClick={() => setMobileOpen(false)}
            className="block w-full py-3 mt-2 text-center bg-gradient-to-r from-[#fe7245] to-pink-600 text-white rounded-full font-bold shadow-md hover:shadow-lg transition-all"
          >
            Cart ({item} items)
          </Link>
        )} */}

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left text-red-600 font-medium rounded-lg hover:bg-red-50 transition flex items-center gap-2"
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
          ) : (
            <>
              {/* Mobile Login Button */}


              <NavLink
                to="/login"
                onClick={() => setOpen(false)}
                className=" w-full max-w-xs mx-auto text-center py-3 bg-gradient-to-r from-[#fe7245] to-pink-600 text-white rounded-full font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex justify-center items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Login
              </NavLink>

            </>
          )}


        </div>
      </div>
    </nav>
  );
};

export default Navbar;