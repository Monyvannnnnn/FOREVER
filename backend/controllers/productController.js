import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
//function for add prouct
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      oldPrice,
      tag,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
    const image5 = req.files.image5 && req.files.image5[0];
    const image6 = req.files.image6 && req.files.image6[0];
    const image7 = req.files.image7 && req.files.image7[0];
    const image8 = req.files.image8 && req.files.image8[0];

    const images = [image1, image2, image3, image4, image5, image6, image7, image8].filter(
      (item) => item !== undefined,
    );
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      }),
    );
    const productData = {
      name,
      description,
      price: Number(price),
      oldPrice: oldPrice ? Number(oldPrice) : 0,
      tag: tag ? String(tag).trim() : "",
      category,
      subCategory,
      sizes:
        typeof sizes === "string"
          ? JSON.parse(sizes.replace(/'/g, '"'))
          : sizes || [],
      bestseller: bestseller === "true" || bestseller === true ? true : false,
      image: imagesUrl,
      date: Date.now(),
    };
    console.log(productData);

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update product tag, price, oldPrice, bestseller
const updateProduct = async (req, res) => {
  try {
    const { id, price, oldPrice, tag, bestseller, name, category, subCategory, description } = req.body;
    const updateData = {};
    if (price !== undefined) updateData.price = Number(price);
    if (oldPrice !== undefined) updateData.oldPrice = Number(oldPrice);
    if (tag !== undefined) updateData.tag = String(tag).trim();
    if (bestseller !== undefined) updateData.bestseller = bestseller === true || bestseller === "true";
    if (name) updateData.name = name;
    if (category) updateData.category = category;
    if (subCategory) updateData.subCategory = subCategory;
    if (description) updateData.description = description;

    const updatedProduct = await productModel.findByIdAndUpdate(id, updateData, { new: true });
    res.json({ success: true, message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//list product
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find();
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal server error" });
  }
};

//remove product

const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal server error" });
  }
};

//sigle product

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal server error" });
  }
};

export { addProduct, updateProduct, listProduct, removeProduct, singleProduct };
