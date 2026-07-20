import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";

const ProductItem = ({id, image, name, price}) => {
 
const {currency } = useContext(ShopContext);



  return (
    <Link className="text-[#5A3A31] cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img className="hover:scale-110 transition ease-in-out" src={image[0]} alt="" />
      </div>
      <p className="pt-3 pb-1 text-sm text-[#5A3A31] font-medium">{name}</p>
      <p className="text-sm font-bold text-[#5A3A31]">{currency}{price}</p>
    </Link>
  )
}

export default ProductItem
