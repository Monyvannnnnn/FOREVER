import express from "express";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import {
  getBanner,
  updateBanner,
} from "../controllers/bannerController.js";

const bannerRouter = express.Router();

bannerRouter.get("/", getBanner);
bannerRouter.get("/get", getBanner);

bannerRouter.post("/update", adminAuth, upload.single("image"), updateBanner);
bannerRouter.put("/update", adminAuth, upload.single("image"), updateBanner);
bannerRouter.post("/", adminAuth, upload.single("image"), updateBanner);
bannerRouter.put("/", adminAuth, upload.single("image"), updateBanner);

export default bannerRouter;