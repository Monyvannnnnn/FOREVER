import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../admin_assets/assets";
import { backendUrl } from "../App";

const Add = ({ token }) => {
  // Loading & Animation States
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState("");

  // Image States
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  // Form Field States
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  // Timer for the "ADDING..." dot animation
  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
      }, 500);
    } else {
      setDots("");
    }
    return () => clearInterval(interval);
  }, [loading]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      // Append the original raw image files
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(backendUrl + "/api/product/add", formData, {
        headers: { token }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset form inputs on success
        setName("");
        setDescription("");
        setPrice("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setSizes([]);
        setBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
        <div>
          <p className="mb-2">Upload Image</p>
          <div className="flex gap-2">
            <label htmlFor="image1">
              <img
                className="w-20 cursor-pointer"
                src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
                alt=""
              />
              <input
                onChange={(e) => setImage1(e.target.files[0])}
                type="file"
                id="image1"
                hidden
              />
            </label>
            <label htmlFor="image2">
              <img
                className="w-20 cursor-pointer"
                src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
                alt=""
              />
              <input
                onChange={(e) => setImage2(e.target.files[0])}
                type="file"
                id="image2"
                hidden
              />
            </label>
            <label htmlFor="image3">
              <img
                className="w-20 cursor-pointer"
                src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
                alt=""
              />
              <input
                onChange={(e) => setImage3(e.target.files[0])}
                type="file"
                id="image3"
                hidden
              />
            </label>
            <label htmlFor="image4">
              <img
                className="w-20 cursor-pointer"
                src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
                alt=""
              />
              <input
                onChange={(e) => setImage4(e.target.files[0])}
                type="file"
                id="image4"
                hidden
              />
            </label>
          </div>
        </div>

        <div className="w-full">
          <p className="mb-2">Product Name</p>
          <input
            type="text"
            className="w-full max-w-125 px-3 py-2 border"
            placeholder="Type here"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>

        <div className="w-full">
          <p className="mb-2">Product Description</p>
          <textarea
            className="w-full max-w-125 px-3 py-2 border"
            placeholder="Write content here"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
          <div>
            <p className="mb-2">Product Category</p>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border"
              value={category}
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div>
            <p className="mb-2">Sub Category</p>
            <select
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full px-3 py-2 border"
              value={subCategory}
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
          <div>
            <p className="mb-2">Product Price</p>
            <input
              type="number"
              placeholder="25"
              className="w-full px-3 py-2 sm:w-30 border"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>
        </div>

        <div>
          <p className="mb-2">Product Sizes</p>
          <div className="flex gap-3">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div
                key={size}
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes(size)
                      ? prev.filter((item) => item !== size)
                      : [...prev, size]
                  )
                }
              >
                <p
                  className={`${
                    sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"
                  } px-3 py-1 cursor-pointer`}
                >
                  {size}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 mt-2">
          <input
            onChange={() => setBestseller((prev) => !prev)}
            checked={bestseller}
            type="checkbox"
            id="bestseller"
          />
          <label htmlFor="bestseller" className="cursor-pointer">
            Add to bestseller
          </label>
        </div>

        <button 
          className={`w-28 py-3 mt-4 text-white font-bold transition-all ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#5A3A31] hover:bg-[#432A23] active:bg-[#432A23]'
          }`} 
          disabled={loading} 
          type="submit"
        >
          {loading ? 'ADDING...' : 'ADD'}
        </button>
      </form>
    </div>
  );
};

export default Add;