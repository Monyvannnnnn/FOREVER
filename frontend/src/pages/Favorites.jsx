import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import Title from "../components/Title";

export default function Favorites() {
  const { products, currency, favorites, toggleFavorite, addToCart } = useContext(ShopContext);
  const [selectedSizes, setSelectedSizes] = useState({});

  const favoriteProducts = products.filter((item) => favorites.includes(item._id));

  const handleSizeChange = (itemId, size) => {
    setSelectedSizes((prev) => ({ ...prev, [itemId]: size }));
  };

  const handleMoveToBag = (product) => {
    const chosenSize =
      selectedSizes[product._id] || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : "One Size");
    addToCart(product._id, chosenSize);
  };

  return (
    <div className="border-t pt-8 pb-16 min-h-[60vh]">
      <div className="text-2xl mb-6">
        <Title text1={"WISH"} text2={"LIST"} />
        <p className="text-sm text-gray-500 font-normal mt-1">
          Wish List ({favoriteProducts.length} {favoriteProducts.length === 1 ? "item" : "items"})
        </p>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-16 h-16 text-gray-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
          <p className="text-lg font-medium text-[#5A3A31]">Your Wish List is empty</p>
          <p className="text-sm text-gray-500 max-w-sm">
            Save items you love to your wish list so you can view or move them to your cart anytime.
          </p>
          <Link
            to="/collection"
            className="mt-2 bg-[#5A3A31] text-white px-8 py-3 text-sm font-bold tracking-wider hover:opacity-90 transition-opacity"
          >
            EXPLORE COLLECTION
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-8 max-w-2xl mx-auto sm:mx-0">
          {favoriteProducts.map((item) => {
            const currentSize =
              selectedSizes[item._id] || (item.sizes && item.sizes.length > 0 ? item.sizes[0] : "One Size");

            return (
              <div key={item._id} className="flex flex-col gap-3 border-b pb-6">
                <div className="flex gap-4 sm:gap-6">
                  <Link to={`/product/${item._id}`} className="shrink-0 w-28 sm:w-36 aspect-[3/4] bg-gray-100 overflow-hidden">
                    <img
                      src={item.image && item.image[0] ? item.image[0] : ""}
                      alt={item.name}
                      className="w-full h-full object-cover object-top hover:scale-105 transition duration-300"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-base sm:text-lg font-bold text-[#5A3A31]">
                          US {currency}{item.price}
                        </span>
                        <button
                          type="button"
                          aria-label="Remove item"
                          onClick={() => toggleFavorite(item._id)}
                          className="text-gray-500 hover:text-red-500 p-1 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>

                      <Link to={`/product/${item._id}`} className="font-semibold text-sm sm:text-base text-gray-900 hover:underline line-clamp-2 mt-1">
                        {item.name}
                      </Link>

                      <p className="text-xs text-gray-500 mt-1">
                        Code. {item._id ? item._id.slice(-10) : "10112607259"}
                      </p>
                    </div>

                    <div className="flex gap-4 items-center mt-3 text-xs sm:text-sm">
                      <div className="flex flex-col gap-1">
                        <span className="text-gray-500 font-medium">Size</span>
                        {item.sizes && item.sizes.length > 0 ? (
                          <select
                            value={currentSize}
                            onChange={(e) => handleSizeChange(item._id, e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 bg-white text-gray-800 outline-none cursor-pointer"
                          >
                            {item.sizes.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className="border border-gray-300 rounded px-2 py-1 bg-gray-50 text-gray-600">
                            No size
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleMoveToBag(item)}
                  className="w-full border border-black py-2.5 text-sm font-semibold hover:bg-black hover:text-white transition-colors duration-200 uppercase tracking-wider mt-1 cursor-pointer"
                >
                  Move to bag
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
