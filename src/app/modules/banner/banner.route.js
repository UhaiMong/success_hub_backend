import express from "express";
import { BannerController } from "./banner.controller.js";
import { BannerImage } from "../../middleware/uploader/uploadBanner.js";

const router = express.Router();

router.post("/create", BannerImage.uploadImage, BannerController.createBanner);

// get all users
router.get("/", BannerController.getAllBanners);

// get single user
router.get("/:id", BannerController.getSingleBanner);

// update user
router.patch("/:id", BannerImage.uploadImage, BannerController.updateBanner);

// delete user
router.delete("/:id", BannerController.deleteBanner);

export const BannerRoutes = router;
