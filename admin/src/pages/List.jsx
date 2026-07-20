import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl, currency } from "../App";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.post(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    //Illusion
    setList((prevList) => prevList.filter((item) => item._id !== id));
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } },
      );

      if (response.data.success) {
        toast.dismiss();
        toast.success(response.data.message, { toastId: "product-remove" });
        await fetchList();
      } else {
        toast.dismiss();
        toast.error(response.data.message, { toastId: "product-remove" });
        await fetchList();
      }
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error(error.message, { toastId: "product-remove" });

      await fetchList();
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div>
      <p className="mb-3 font-bold text-lg text-[#5A3A31]">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* Table Header */}
        <div className="grid grid-cols-[45px_1fr_65px_36px] sm:grid-cols-[1fr_3fr_1fr_1fr_0.5fr] items-center gap-2 sm:gap-4 py-2 px-2.5 sm:px-4 border border-[#5A3A31]/30 bg-[#F7F2F0] text-xs sm:text-sm text-[#5A3A31] font-bold">
          <b>Image</b>
          <b>Name</b>
          <b className="hidden sm:block">Category</b>
          <b className="text-right sm:text-left">Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product Rows */}
        {list.map((item, index) => (
          <div
            className="grid grid-cols-[45px_1fr_65px_36px] sm:grid-cols-[1fr_3fr_1fr_1fr_0.5fr] items-center gap-2 sm:gap-4 py-1.5 px-2.5 sm:py-2 sm:px-4 border border-[#5A3A31]/20 text-xs sm:text-sm bg-white hover:bg-slate-50 transition-colors"
            key={index}
          >
            <img className="w-9 h-9 sm:w-11 sm:h-11 object-cover border border-gray-100" src={item.image[0]} alt={item.name} />
            <p className="font-medium truncate text-[#5A3A31]">{item.name}</p>
            <p className="hidden sm:block text-gray-600">{item.category}</p>
            <p className="font-bold text-[#5A3A31] text-right sm:text-left">
              {currency}
              {item.price}
            </p>
            <button
              onClick={() => removeProduct(item._id)}
              className="text-[#5A3A31]/80 hover:text-red-600 p-1 sm:p-1.5 hover:bg-red-50 transition-colors justify-self-center cursor-pointer"
              title="Delete Product"
              aria-label="Delete"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
