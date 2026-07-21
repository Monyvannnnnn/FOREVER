import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "./Title.jsx";
import ProductItem from "./ProductItem.jsx";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const bestSeller = products.filter((item) => item.bestseller).slice(0, 5);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-[#5A3A31]/80">
          Explore our top-rated customer favorites. Curated essentials crafted with high quality fabrics and timeless aesthetic.
        </p>
      </div>

      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
            oldPrice={item.oldPrice}
            tag={item.tag}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
