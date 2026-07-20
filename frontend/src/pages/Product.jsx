import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";

export default function Product() {
  const { products, currency, addToCart } = useContext(ShopContext);
  const { productId } = useParams();
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        if (!item.sizes || item.sizes.length === 0) {
          setSize("One Size");
        } else {
          setSize("");
        }
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in-out duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => {
              return (
                <img
                  onClick={() => setImage(item)}
                  key={index}
                  src={item}
                  alt={`Product image ${index + 1}`}
                  className="w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer"
                />
              );
            })}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="Product image" className="w-full h-auto" />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2 ">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2">(140)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p className="font-medium">Select Size</p>
            <div className="flex gap-2">
              {productData.sizes && productData.sizes.length > 0 ? (
                productData.sizes.map((item, index) => (
                  <button
                    type="button"
                    onClick={() => setSize(item)}
                    key={index}
                    className={`border py-2 px-4 font-medium transition-all cursor-pointer ${
                      item === size
                        ? "border-[#5A3A31] bg-[#5A3A31] text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300"
                    }`}
                  >
                    {item}
                  </button>
                ))
              ) : (
                <button
                  type="button"
                  onClick={() => setSize("One Size")}
                  className="border border-[#5A3A31] bg-[#5A3A31] text-white font-medium py-2 px-4 cursor-pointer"
                >
                  One Size
                </button>
              )}
            </div>
          </div>
          <button onClick={() => addToCart(productData._id, size)} className="bg-[#5A3A31] text-white font-bold px-8 py-3 text-sm active:bg-[#432A23] hover:bg-[#432A23] transition-colors">
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is avaible on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews(122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-[#5A3A31]/80 leading-relaxed">
          <p>Welcome to Vacci — your premier destination for modern minimalist fashion and timeless wardrobe essentials. Every garment in our collection is thoughtfully designed using high-grade fabrics, clean monoline silhouettes, and meticulous craftsmanship to elevate your daily style.</p>
          <p>Our products undergo thorough quality assurance to ensure long-lasting durability, exceptional comfort, and a tailored fit. Experience seamless online shopping with fast worldwide shipping, easy exchanges, and dedicated customer care.</p>
        </div>
      </div>
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} id={productData._id} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}
