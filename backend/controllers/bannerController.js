import Banner from "../models/bannerModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


// Get Banner
const getBanner = async (req, res) => {
  try {
    const banner = await Banner.findOne();

    res.json({
      success: true,
      banner,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};


// Update Banner
const updateBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({
        success: false,
        message: "Please upload an image",
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
      folder: "banner",
      transformation: [
        { width: 900, height: 1200, crop: "fill", gravity: "auto" }
      ],
    });

    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    let banner = await Banner.findOne();

    if (!banner) {
      banner = await Banner.create({
        image: result.secure_url,
      });
    } else {
      banner.image = result.secure_url;
      await banner.save();
    }

    res.json({
      success: true,
      message: "Banner updated successfully",
      banner,
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { getBanner, updateBanner };