import React from 'react'
import { assets } from '../admin_assets/assets'
const Navbar = ({ setToken }) => {
  return (
    <div className='flex items-center py-2.5 px-[4%] justify-between border-b border-gray-200'>
      <div className="flex flex-col items-start">
        <img className='w-20 sm:w-24' src={assets.logo} alt="Logo" />
        <p className="text-[11px] font-bold text-[#5A3A31] tracking-wider uppercase -mt-0.5 ml-0.5">
          Admin Panel
        </p>
      </div>
      <button onClick={() => setToken('')} className='bg-[#5A3A31] text-white font-bold px-5 py-2 sm:px-7 sm:py-2 rounded-full hover:bg-[#432A23] transition-colors' >Logout</button>
    </div>
  )
}

export default Navbar
