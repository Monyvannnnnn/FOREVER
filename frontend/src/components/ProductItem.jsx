import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";
import DiscountTag from "./DiscountTag.jsx";

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

const ProductItem = ({ id, image, name, price, oldPrice, tag }) => {
  const { currency, favorites, toggleFavorite } = useContext(ShopContext);
  const isFavorite = favorites ? favorites.includes(id) : false;

  const { strikePrice, discountPercent } = getDiscountDetails(price, oldPrice, tag);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(id);
  };

  return (
    <Link className="text-[#5A3A31] cursor-pointer flex flex-col h-full group" to={`/product/${id}`}>
      <div className="w-full aspect-[3/4] overflow-hidden bg-gray-100 relative">
        <img
          className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-300 ease-in-out"
          src={image && image[0] ? image[0] : ""}
          alt={name || "Product"}
        />
        <DiscountTag tag={tag} discountPercent={discountPercent} />
      </div>

      <div className="pt-2 flex flex-col gap-0.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-red-600 font-bold text-sm sm:text-base">
              US {currency}{price}
            </span>
            {tag ? (
              <span className="text-black font-bold text-xs sm:text-sm">
                {tag}
              </span>
            ) : (
              discountPercent > 0 && (
                <span className="text-black font-bold text-xs sm:text-sm">
                  -{discountPercent}%
                </span>
              )
            )}
            {strikePrice && (
              <span className="text-gray-400 text-xs sm:text-sm line-through">
                US {currency}{strikePrice}
              </span>
            )}
          </div>
          <button
            type="button"
            aria-label="Favorite"
            onClick={handleFavoriteClick}
            className="p-1 text-gray-700 hover:text-red-500 transition-colors"
          >
            {isFavorite ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-red-500 fill-red-500 transition-transform active:scale-125"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-gray-700 hover:text-red-500 transition-transform active:scale-125"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            )}
          </button>
        </div>
        <p className="text-sm text-gray-800 font-medium truncate">{name}</p>
      </div>
    </Link>
  );
};

export default ProductItem;
