import { useState, useContext } from "react";
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
  const { setShowSearch, getCartCount, getFavoritesCount, token, setToken, setCartItems, navigate } = useContext(ShopContext);
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };
  return (
    <div className="flex mb-2 mt-2 items-center justify-between py-2.5 font-bold text-[#5A3A31]">
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

      <div className="flex items-center gap-6">
        <img
          onClick={() => {
            setShowSearch(true);
            navigate("/collection");
          }}
          src={assets.search_icon}
          alt="Search"
          className="w-5 cursor-pointer"
        />

        <div className="group relative">
          <img
            onClick={() => token ? null : navigate('/login')}
            src={assets.profile_icon}
            alt="User"
            className="w-5 cursor-pointer"
          />
          {/* Dropdown Menu */}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex w-36 flex-col gap-2 rounded bg-slate-100 px-5 py-3 text-[#5A3A31]">
                <p className="cursor-pointer hover:opacity-80">My Account</p>
                <p onClick={() => navigate('/orders')} className="cursor-pointer hover:opacity-80">Orders</p>
                <p onClick={logout} className="cursor-pointer hover:opacity-80">Logout</p>
              </div>
            </div>
          )}
        </div>

        <Link to="/favorites" className="relative flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="w-5 h-5 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
          <p className="absolute -right-1.5 bottom-1.25 aspect-square w-4 rounded-full bg-[#5A3A31] text-center text-[8px] leading-4 text-white">
            {getFavoritesCount()}
          </p>
        </Link>

        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            alt="Cart"
            className="w-5 cursor-pointer"
          />
          <p className="absolute -right-1.5 bottom-1.25 aspect-square w-4 rounded-full bg-[#5A3A31] text-center text-[8px] leading-4 text-white">
            {getCartCount()}
          </p>
        </Link>
        <button
          type="button"
          className="sm:hidden"
          aria-label="Open menu"
          onClick={() => setVisible(true)}
        >
          <img
            src={assets.menu_icon}
            alt="Menu"
            className="w-5 cursor-pointer"
          />
        </button>
      </div>

      <div
        className={`fixed top-0 right-0 bottom-0 z-50 overflow-hidden bg-white transition-all duration-500 ease-in-out ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-[#5A3A31]">
          <div
            className="flex items-center gap-4 p-3 cursor-pointer"
            onClick={() => setVisible(false)}
          >
            <img
              src={assets.dropdown_icon}
              alt="Back"
              className="h-4 rotate-180"
            />
            <p>Back</p>
          </div>
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="border-b border-gray-200 py-2 pl-6"
              onClick={() => setVisible(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="/favorites"
            className="border-b border-gray-200 py-2 pl-6 flex items-center justify-between pr-6"
            onClick={() => setVisible(false)}
          >
            <span>WISH LIST</span>
            {getFavoritesCount() > 0 && (
              <span className="bg-[#5A3A31] text-white text-xs px-2 py-0.5 rounded-full">
                {getFavoritesCount()}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </div>
  );
}
