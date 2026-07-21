import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl, currency } from "../App";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editPrice, setEditPrice] = useState("");
  const [editOldPrice, setEditOldPrice] = useState("");
  const [editTag, setEditTag] = useState("");
  const [editTagPreset, setEditTagPreset] = useState("");
  const [saving, setSaving] = useState(false);

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

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setEditPrice(item.price || "");
    setEditOldPrice(item.oldPrice || "");
    const currentTag = item.tag || "";
    setEditTag(currentTag);
    if (["", "HOT", "NEW", "-10%", "-20%", "-30%", "-50%", "SALE"].includes(currentTag)) {
      setEditTagPreset(currentTag);
    } else {
      setEditTagPreset("Custom");
    }
  };

  const handleQuickTagChange = async (item, newTag) => {
    const finalTag = newTag === "Custom" ? item.tag : newTag;
    try {
      const response = await axios.post(
        backendUrl + "/api/product/update",
        { id: item._id, tag: finalTag },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(`Tag updated to "${finalTag || "None"}"`);
        setList((prev) =>
          prev.map((p) => (p._id === item._id ? { ...p, tag: finalTag } : p))
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleSaveEdit = async () => {
    if (!editingItem) return;
    setSaving(true);
    const finalTag = editTagPreset === "Custom" ? editTag : editTagPreset;
    try {
      const response = await axios.post(
        backendUrl + "/api/product/update",
        {
          id: editingItem._id,
          price: Number(editPrice),
          oldPrice: editOldPrice ? Number(editOldPrice) : 0,
          tag: finalTag,
        },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Product details updated!");
        setList((prev) =>
          prev.map((p) =>
            p._id === editingItem._id
              ? {
                  ...p,
                  price: Number(editPrice),
                  oldPrice: editOldPrice ? Number(editOldPrice) : 0,
                  tag: finalTag,
                }
              : p
          )
        );
        setEditingItem(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setSaving(false);
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
        <div className="grid grid-cols-[45px_1fr_80px_70px_50px] sm:grid-cols-[0.8fr_2.5fr_1fr_1.2fr_1.2fr_0.8fr] items-center gap-2 sm:gap-4 py-2 px-2.5 sm:px-4 border border-[#5A3A31]/30 bg-[#F7F2F0] text-xs sm:text-sm text-[#5A3A31] font-bold">
          <b>Image</b>
          <b>Name</b>
          <b className="hidden sm:block">Category</b>
          <b className="text-right sm:text-left">Price</b>
          <b>Tag / Discount</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product Rows */}
        {list.map((item, index) => (
          <div
            className="grid grid-cols-[45px_1fr_80px_70px_50px] sm:grid-cols-[0.8fr_2.5fr_1fr_1.2fr_1.2fr_0.8fr] items-center gap-2 sm:gap-4 py-1.5 px-2.5 sm:py-2 sm:px-4 border border-[#5A3A31]/20 text-xs sm:text-sm bg-white hover:bg-slate-50 transition-colors"
            key={index}
          >
            <img className="w-9 h-9 sm:w-11 sm:h-11 object-cover border border-gray-100" src={item.image[0]} alt={item.name} />
            <p className="font-medium truncate text-[#5A3A31]">{item.name}</p>
            <p className="hidden sm:block text-gray-600">{item.category}</p>
            <div className="flex flex-col text-right sm:text-left">
              <span className="font-bold text-[#5A3A31]">
                {currency}{item.price}
              </span>
              {item.oldPrice > 0 && (
                <span className="text-xs text-gray-400 line-through">
                  {currency}{item.oldPrice}
                </span>
              )}
            </div>
            <div>
              <select
                value={["", "HOT", "NEW", "-10%", "-20%", "-30%", "-50%", "SALE"].includes(item.tag) ? item.tag : "Custom"}
                onChange={(e) => handleQuickTagChange(item, e.target.value)}
                className="text-xs px-1.5 py-1 border border-gray-300 rounded bg-white text-[#5A3A31] font-semibold cursor-pointer max-w-[100px]"
              >
                <option value="">None</option>
                <option value="HOT">HOT</option>
                <option value="NEW">NEW</option>
                <option value="-10%">-10%</option>
                <option value="-20%">-20%</option>
                <option value="-30%">-30%</option>
                <option value="-50%">-50%</option>
                <option value="SALE">SALE</option>
                <option value="Custom">{item.tag && !["", "HOT", "NEW", "-10%", "-20%", "-30%", "-50%", "SALE"].includes(item.tag) ? item.tag : "Custom..."}</option>
              </select>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <button
                onClick={() => handleOpenEdit(item)}
                className="text-[#5A3A31]/80 hover:text-[#5A3A31] p-1 sm:p-1.5 hover:bg-slate-100 transition-colors cursor-pointer rounded"
                title="Edit Price & Tag"
                aria-label="Edit"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
              </button>

              <button
                onClick={() => removeProduct(item._id)}
                className="text-[#5A3A31]/80 hover:text-red-600 p-1 sm:p-1.5 hover:bg-red-50 transition-colors cursor-pointer rounded"
                title="Delete Product"
                aria-label="Delete"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-bold text-[#5A3A31] mb-4">Edit Product Price & Tag</h3>
            <p className="text-sm font-medium text-gray-700 mb-4">{editingItem.name}</p>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-[#5A3A31] mb-1">Discounted / Selling Price ($)</label>
                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  className="w-full px-3 py-2 border rounded text-sm"
                  placeholder="Selling Price"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5A3A31] mb-1">Original / Old Price ($) (Optional)</label>
                <input
                  type="number"
                  value={editOldPrice}
                  onChange={(e) => setEditOldPrice(e.target.value)}
                  className="w-full px-3 py-2 border rounded text-sm"
                  placeholder="Leave empty if no strikethrough price"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5A3A31] mb-1">Product Tag / Discount Badge</label>
                <div className="flex gap-2">
                  <select
                    value={editTagPreset}
                    onChange={(e) => setEditTagPreset(e.target.value)}
                    className="px-3 py-2 border rounded text-sm bg-white"
                  >
                    <option value="">None</option>
                    <option value="HOT">HOT</option>
                    <option value="NEW">NEW</option>
                    <option value="-10%">-10%</option>
                    <option value="-20%">-20%</option>
                    <option value="-30%">-30%</option>
                    <option value="-50%">-50%</option>
                    <option value="SALE">SALE</option>
                    <option value="Custom">Custom...</option>
                  </select>
                  {editTagPreset === "Custom" && (
                    <input
                      type="text"
                      value={editTag}
                      onChange={(e) => setEditTag(e.target.value)}
                      className="px-3 py-2 border rounded text-sm flex-1"
                      placeholder="e.g. HOT -20%"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 text-sm border font-medium text-gray-700 hover:bg-gray-50 rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                disabled={saving}
                className="px-5 py-2 text-sm bg-[#5A3A31] hover:bg-[#432A23] text-white font-bold rounded transition-colors"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
