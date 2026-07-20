import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";

const ProductItem = ({id, image, name, price}) => {
 
const {currency } = useContext(ShopContext);



  return (
    <Link className="text-[#5A3A31] cursor-pointer flex flex-col h-full group" to={`/product/${id}`}>
      <div className="w-full aspect-[3/4] overflow-hidden bg-gray-100 rounded-none">
        <img className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-300 ease-in-out rounded-none" src={image && image[0] ? image[0] : ""} alt={name || "Product"} />
      </div>
      <p className="pt-3 pb-1 text-sm text-[#5A3A31] font-medium truncate">{name}</p>
      <p className="text-sm font-bold text-[#5A3A31]">{currency}{price}</p>
    </Link>
  )
}

export default ProductItem
