import React from "react";
import Navbar from "./Navbar";
import { NavLink } from "react-router-dom";
import { assets } from "../admin_assets/assets";
const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink to="/add" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1 ">
          <img src={assets.add_icon} alt="Add" className="w-5 h-5" />
          <p className="hidden md:block">Add Item</p>
        </NavLink>
        <NavLink to="/list" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1 ">
          <img src={assets.order_icon} alt="Add" className="w-5 h-5" />
          <p className="hidden md:block">List Item</p>
        </NavLink>
        <NavLink to="/order" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1 ">
          <img src={assets.order_icon} alt="Add" className="w-5 h-5" />
          <p className="hidden md:block">Order Item</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
