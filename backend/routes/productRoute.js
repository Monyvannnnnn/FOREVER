import express from "express";
import { listProduct, addProduct, removePorduct, singleProduct } from "../controllers/productController.js";
const productRouter = express.Router();


productRouter.post("/add",addProduct);
productRouter.post("/remove",removePorduct);
productRouter.post("/single",singleProduct);
productRouter.post("/list",listProduct);

export default productRouter;