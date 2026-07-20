import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cropper from "react-easy-crop";
import imageCompression from "browser-image-compression";
import { assets } from "../admin_assets/assets";
import { backendUrl } from "../App";
import getCroppedImg from "../utils/cropImage";

const Banner = ({ token }) => {
  // Raw uploaded file & object URL for cropping
  const [imageSrc, setImageSrc] = useState(null);
  
  // Final cropped & compressed file ready for upload
  const [finalFile, setFinalFile] = useState(null);
  const [croppedPreviewUrl, setCroppedPreviewUrl] = useState(null);

  // Active banner from backend
  const [currentBanner, setCurrentBanner] = useState("");
  const [loading, setLoading] = useState(false);
  const [cropping, setCropping] = useState(false);

  // react-easy-crop state
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // Fetch existing banner on component mount
  const fetchBanner = async () => {
    try {
      const url = backendUrl || "http://localhost:4000";
      const response = await axios.get(url + "/api/banner");
      if (response.data.success && response.data.banner) {
        setCurrentBanner(response.data.banner.image);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  // Handle file input selection
  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageDataUrl = URL.createObjectURL(file);
      setImageSrc(imageDataUrl);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCropping(true);
    }
  };

  // Callback when crop area selection changes in react-easy-crop
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Process crop & compression
  const handleApplyCrop = async () => {
    try {
      setLoading(true);
      // 1. Crop image using canvas helper
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);

      // 2. Compress cropped image using browser-image-compression
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1000,
        useWebWorker: true,
        fileType: "image/jpeg",
      };

      const compressedFile = await imageCompression(croppedBlob, options);
      const readyFile = new File([compressedFile], "banner.jpg", {
        type: "image/jpeg",
      });

      setFinalFile(readyFile);
      setCroppedPreviewUrl(URL.createObjectURL(readyFile));
      setCropping(false);
      toast.info("Image cropped & optimized successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to crop image");
    } finally {
      setLoading(false);
    }
  };

  // Cancel crop modal
  const handleCancelCrop = () => {
    setCropping(false);
    setImageSrc(null);
  };

  // Form submit handler to upload to backend
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!finalFile) {
      toast.error("Please select and crop an image to upload");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", finalFile);

      const url = backendUrl || "http://localhost:4000";
      const response = await axios.post(
        url + "/api/banner/update",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        if (response.data.banner && response.data.banner.image) {
          setCurrentBanner(response.data.banner.image);
        }
        setFinalFile(null);
        setCroppedPreviewUrl(null);
        setImageSrc(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full items-start gap-6 max-w-2xl">
      <div className="w-full">
        <h2 className="text-xl font-bold text-gray-700 mb-1">
          Homepage Banner Settings
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Upload and crop a square hero banner image for your store homepage.
        </p>
      </div>

      {/* Current Active Banner */}
      {currentBanner && (
        <div className="w-full mb-2">
          <p className="mb-2 font-medium text-gray-700">Current Active Banner</p>
          <div className="w-64 h-64 aspect-square border border-gray-300 overflow-hidden bg-gray-100 shadow-sm">
            <img
              src={currentBanner}
              alt="Current Banner"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Upload & Cropped Image Selector */}
      <form onSubmit={onSubmitHandler} className="w-full flex flex-col gap-4">
        <div>
          <p className="mb-2 font-medium text-gray-700">
            {finalFile ? "Cropped Banner Preview (Ready to Upload)" : "Upload & Crop New Banner Image"}
          </p>
          <div className="flex gap-4 items-center">
            <label htmlFor="banner-image-input" className="cursor-pointer">
              <div className="w-64 h-64 aspect-square border-2 border-dashed border-gray-300 overflow-hidden bg-gray-50 hover:bg-gray-100 transition flex items-center justify-center relative">
                <img
                  className={
                    croppedPreviewUrl
                      ? "w-full h-full object-cover"
                      : "w-24 h-24 object-contain opacity-60"
                  }
                  src={croppedPreviewUrl || assets.upload_area}
                  alt="Upload area"
                />
              </div>
              <input
                onChange={onFileChange}
                type="file"
                id="banner-image-input"
                hidden
                accept="image/*"
              />
            </label>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Click above to select an image from your computer to open the interactive cropper.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || !finalFile}
          className="w-52 py-3 bg-black text-white font-medium hover:bg-gray-800 transition duration-200 mt-2 disabled:bg-gray-400 cursor-pointer"
        >
          {loading ? "SAVING..." : "UPDATE BANNER"}
        </button>
      </form>

      {/* Interactive Cropper Modal */}
      {cropping && imageSrc && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-white overflow-hidden max-w-lg w-full p-6 flex flex-col gap-4 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-lg text-gray-800">Crop Banner Image (1:1 Square Shape)</h3>
              <button
                onClick={handleCancelCrop}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            {/* react-easy-crop Container */}
            <div className="relative w-full h-96 bg-gray-900 overflow-hidden">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            {/* Zoom Slider Controls */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-gray-600">Zoom:</span>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-2">
              <button
                type="button"
                onClick={handleCancelCrop}
                className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium text-sm transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplyCrop}
                disabled={loading}
                className="px-5 py-2 bg-black text-white font-medium text-sm hover:bg-gray-800 transition disabled:bg-gray-400"
              >
                {loading ? "Processing..." : "Crop & Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
