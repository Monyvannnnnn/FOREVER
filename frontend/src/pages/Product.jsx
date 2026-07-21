import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import DiscountTag from "../components/DiscountTag";

export default function Product() {
  const { products, currency, addToCart } = useContext(ShopContext);
  const { productId } = useParams();
  const [productData, setProductData] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImgIndex(0);
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId, products]);

  const getDiscountDetails = (price, oldPrice, tag) => {
    const numPrice = Number(price) || 0;
    const numOldPrice = Number(oldPrice) || 0;

    if (numOldPrice > numPrice) {
      const pct = Math.round(((numOldPrice - numPrice) / numOldPrice) * 100);
      return { strikePrice: numOldPrice, discountPercent: pct };
    }

    if (tag) {
      const match = tag.match(/(\d+)%/);
      if (match) {
        const pct = parseInt(match[1], 10);
        if (pct > 0 && pct < 100) {
          const calculatedOld = Math.round(numPrice / (1 - pct / 100));
          return { strikePrice: calculatedOld, discountPercent: pct };
        }
      }
      const defaultOld = Math.round(numPrice * 1.3);
      const defaultPct = Math.round(((defaultOld - numPrice) / defaultOld) * 100);
      return { strikePrice: defaultOld, discountPercent: defaultPct };
    }

    return { strikePrice: null, discountPercent: 0 };
  };

  const { strikePrice, discountPercent } = productData
    ? getDiscountDetails(productData.price, productData.oldPrice, productData.tag)
    : { strikePrice: null, discountPercent: 0 };

  return productData ? (
    <div className="pt-10 transition-opacity ease-in-out duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-row gap-4">
          <div className="flex flex-col gap-2 w-[12%] sm:w-[9.5%] max-w-[65px] sm:max-w-[80px] shrink-0 overflow-y-auto">
            {productData.image.map((item, index) => {
              return (
                <img
                  onClick={() => setImgIndex(index)}
                  key={index}
                  src={item}
                  alt={`Product image ${index + 1}`}
                  className={`w-full aspect-[3/4] object-cover cursor-pointer transition-all border ${
                    index === imgIndex ? "border-2 border-[#5A3A31]" : "border border-gray-200 hover:border-gray-400"
                  }`}
                />
              );
            })}
          </div>
          <div className="flex-1 relative group overflow-hidden bg-gray-100 flex items-center min-h-[350px]">
            <DiscountTag tag={productData.tag} discountPercent={discountPercent} />
            <div
              className="flex w-full h-full transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${imgIndex * 100}%)` }}
            >
              {productData.image.map((item, index) => (
                <div key={index} className="w-full shrink-0 flex items-center justify-center">
                  <img
                    src={item}
                    alt={`Product view ${index + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>

            {productData.image && productData.image.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={() =>
                    setImgIndex((prev) => (prev === 0 ? productData.image.length - 1 : prev - 1))
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white text-black p-2.5 rounded-full shadow-lg hover:bg-gray-100 active:scale-90 transition-all z-10 cursor-pointer flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={() =>
                    setImgIndex((prev) => (prev === productData.image.length - 1 ? 0 : prev + 1))
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-black p-2.5 rounded-full shadow-lg hover:bg-gray-100 active:scale-90 transition-all z-10 cursor-pointer flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-2.5 mt-4 flex-wrap">
            <span className="text-3xl font-bold text-red-600">
              US {currency}{productData.price}
            </span>
            {productData.tag ? (
              <span className="text-lg font-bold text-white bg-[#5A3A31] px-2.5 py-0.5 rounded shadow-sm">
                {productData.tag}
              </span>
            ) : (
              discountPercent > 0 && (
                <span className="text-xl font-bold text-black">
                  -{discountPercent}%
                </span>
              )
            )}
            {strikePrice && (
              <span className="text-xl text-gray-400 line-through">
                US {currency}{strikePrice}
              </span>
            )}
          </div>
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
