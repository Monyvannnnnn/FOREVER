import { useState, useContext, useEffect } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const navLinks = [
  { to: "/", label: "HOME" },
  { to: "/collection", label: "COLLECTION" },
  { to: "/about", label: "ABOUT" },
  { to: "/contact", label: "CONTACT" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { setShowSearch, getCartCount, getFavoritesCount, token, setToken, setCartItems, navigate } = useContext(ShopContext);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };
  return (
    <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md flex items-center justify-between py-3 font-bold text-[#5A3A31] mb-2">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-20 sm:w-24" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm font-bold text-[#5A3A31]">
        {navLinks.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex flex-col items-center gap-1 nav-link-animated"
          >
            <p className="font-bold tracking-wider hover:opacity-80 transition-colors duration-300">{item.label}</p>
            <hr className="h-[2px] w-4/5 border-none bg-[#5A3A31]" />
          </NavLink>
        ))}
      </ul>

      <div className="flex items-center gap-2.5 sm:gap-3.5 text-[#5A3A31]">
        <button
          type="button"
          aria-label="Search"
          onClick={() => {
            setShowSearch((prev) => !prev);
          }}
          className="flex items-center cursor-pointer text-[#5A3A31] hover:opacity-80 transition-opacity"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-[22px] h-[22px] sm:w-[24px] sm:h-[24px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>

        <div className="group relative flex items-center">
          <button
            type="button"
            aria-label="Account"
            onClick={() => (token ? null : navigate("/login"))}
            className="flex items-center cursor-pointer text-[#5A3A31] hover:opacity-80 transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-[22px] h-[22px] sm:w-[24px] sm:h-[24px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </button>
          {/* Dropdown Menu */}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 top-full pt-2">
              <div className="flex w-36 flex-col gap-2 rounded bg-slate-100 px-5 py-3 text-[#5A3A31]">
                <p className="cursor-pointer hover:opacity-80">My Account</p>
                <p onClick={() => navigate("/orders")} className="cursor-pointer hover:opacity-80">Orders</p>
                <p onClick={logout} className="cursor-pointer hover:opacity-80">Logout</p>
              </div>
            </div>
          )}
        </div>

        <Link to="/favorites" className="relative flex items-center text-[#5A3A31] hover:opacity-80 transition-opacity">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-[24px] h-[24px] sm:w-[26px] sm:h-[26px] cursor-pointer shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </Link>

        <Link to="/cart" className="relative flex items-center text-[#5A3A31] hover:opacity-80 transition-opacity">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-[22px] h-[22px] sm:w-[24px] sm:h-[24px] cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <p className="absolute -right-1.5 -bottom-0.5 aspect-square w-3.5 sm:w-4 rounded-full bg-[#5A3A31] text-center text-[7px] sm:text-[8px] leading-3.5 sm:leading-4 text-white">
            {getCartCount()}
          </p>
        </Link>
        <button
          type="button"
          className="flex items-center text-[#5A3A31] sm:hidden"
          aria-label="Open menu"
          onClick={() => setVisible(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-[24px] h-[24px] cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Backdrop Blur Overlay */}
      <div
        onClick={() => setVisible(false)}
        className={`sm:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-md transition-opacity duration-500 ease-in-out ${
          visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile Sidebar Menu Overlay */}
      <div
        className={`sm:hidden fixed top-0 right-0 bottom-0 z-50 w-full h-full min-h-screen bg-white transition-all duration-500 ease-in-out ${
          visible
            ? "translate-x-0 opacity-100 pointer-events-auto"
            : "translate-x-[105%] opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full min-h-screen text-[#5A3A31] bg-white">
          <div
            className="flex items-center gap-4 p-4 border-b border-gray-200 cursor-pointer font-bold bg-white"
            onClick={() => setVisible(false)}
          >
            <img
              src={assets.dropdown_icon}
              alt="Back"
              className="h-4 rotate-180"
            />
            <p className="text-base font-bold">Back</p>
          </div>

          <div className="flex flex-col flex-1 h-full min-h-screen text-[#5A3A31] bg-white">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `border-b border-gray-200 py-3.5 pl-6 font-bold tracking-wider bg-white transition-colors ${
                    isActive ? "text-[#5A3A31]" : "text-gray-700"
                  }`
                }
                onClick={() => setVisible(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `border-b border-gray-200 py-3.5 pl-6 font-bold tracking-wider bg-white transition-colors ${
                  isActive ? "text-[#5A3A31]" : "text-gray-700"
                }`
              }
              onClick={() => setVisible(false)}
            >
              WISH LIST
            </NavLink>
            {token && (
              <>
                <NavLink
                  to="/orders"
                  className="border-b border-gray-200 py-3.5 pl-6 font-bold tracking-wider text-gray-700 bg-white transition-colors"
                  onClick={() => setVisible(false)}
                >
                  ORDERS
                </NavLink>
                <button
                  type="button"
                  onClick={() => {
                    setVisible(false);
                    logout();
                  }}
                  className="text-left border-b border-gray-200 py-3.5 pl-6 font-bold tracking-wider text-red-600 bg-white transition-colors cursor-pointer"
                >
                  LOGOUT
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
