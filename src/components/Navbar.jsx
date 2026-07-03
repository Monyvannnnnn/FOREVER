import React, { useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink } from "react-router-dom";

const navLinks = [
  { to: "/", label: "HOME" },
  { to: "/collection", label: "COLLECTION" },
  { to: "/about", label: "ABOUT" },
  { to: "/contact", label: "CONTACT" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const {setShowSearch} = useContext(ShopContext)
  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-36" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {navLinks.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex flex-col items-center gap-1"
          >
            <p>{item.label}</p>
            <hr className="hidden h-[1.5px] w-2/4 border-none bg-gray-700" />
          </NavLink>
        ))}
      </ul>

      <div className="flex items-center gap-6">
        <img
          src={assets.search_icon}
          alt="Search"
          className="w-5 cursor-pointer "
        />

        <div className="group relative ">
          <img
            src={assets.profile_icon}
            alt="User"
            className="w-5 cursor-pointer"
          />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex w-36 flex-col gap-2 rounded bg-slate-100 px-5 py-3 text-gray-500">
              <p className="cursor-pointer hover:text-black">My Account</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            alt="Cart"
            className="w-5 cursor-pointer"
          />
          <p className="absolute -right-1.5 bottom-1.25 aspect-square w-4 rounded-full bg-black text-center text-[8px] leading-4 text-white">
            10
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
        className={`absolute right-0 top-0  bottom-0 overflow-hidden bg-white transition-all duration-300 ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            className="flex items-center gap-4 p-3"
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
        </div>
      </div>
    </div>
  );
}
