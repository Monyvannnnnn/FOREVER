import { assets } from "../assets/frontend_assets/assets.js";
const Footer = () => {
  return (
    <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
      <div>
        <img src={assets.logo} alt="" className="mb-5 w-32" />

        <p className="w-full md:w-2/3 text-gray-600 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
          distinctio expedita optio autem velit necessitatibus praesentium,
          repellat dolor officiis laboriosam sint, beatae saepe. Quo accusamus
          debitis tempore, harum ipsam autem?
        </p>
      </div>
      <div>
        <p className="text-xl font-medium mb-5 ">COMPANY</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <li>Home</li>
          <li>About Us</li>
          <li>Delivery</li>
          <li>Privacy policy</li>
        </ul>
      </div>

      <div>
        <p className="text-xl font-medium mb-5 ">GET IN TOUCH</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <li>+855 16309560</li>
          <li>contact@foreveryou.com</li>
        </ul>
      </div>
      <div className="col-span-full">
        <hr />
        <p className="py-5 text-sm text-center text-shadow-black">
          {" "}
          Copyright 2024@ forever.com - ALL Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
