import express from "express";
import { BannerController } from "./banner.controller.js";
import { BannerImage } from "../../middleware/uploader/uploadBanner.js";

const router = express.Router();
// create banner
router.post("/create", BannerImage.uploadImage, BannerController.createBanner);

// get all banner
router.get("/", BannerController.getAllBanners);

// get single single banner
router.get("/:id", BannerController.getSingleBanner);

// update banner
router.patch("/:id", BannerImage.uploadImage, BannerController.updateBanner);

// delete banner
router.delete("/:id", BannerController.deleteBanner);

export const BannerRoutes = router;
