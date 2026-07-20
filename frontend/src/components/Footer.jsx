import { assets } from "../assets/frontend_assets/assets.js";
const Footer = () => {
  return (
    <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm text-[#5A3A31]">
      <div>
        <img src={assets.logo} alt="" className="mb-5 w-24 sm:w-28" />

        <p className="w-full md:w-2/3 text-[#5A3A31]/80 leading-relaxed">
          Vacci is a modern fashion brand dedicated to minimalist aesthetics, premium quality, and timeless everyday wardrobe essentials designed to empower your personal style.
        </p>
      </div>
      <div>
        <p className="text-xl font-bold mb-5 text-[#5A3A31]">COMPANY</p>
        <ul className="flex flex-col gap-1 text-[#5A3A31]/80">
          <li>Home</li>
          <li>About Us</li>
          <li>Delivery</li>
          <li>Privacy policy</li>
        </ul>
      </div>

      <div>
        <p className="text-xl font-bold mb-5 text-[#5A3A31]">GET IN TOUCH</p>
        <ul className="flex flex-col gap-1 text-[#5A3A31]/80">
          <li>+855 16309560</li>
          <li>contact@foreveryou.com</li>
        </ul>
      </div>
      <div className="col-span-full">
        <hr className="border-[#5A3A31]/20" />
        <p className="py-5 text-sm text-center text-[#5A3A31]">
          Copyright 2024@ vacci.com - ALL Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
