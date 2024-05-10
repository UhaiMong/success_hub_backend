import express from "express";
import { NewsImage } from "../../middleware/uploader/news.js";
import { NewsController } from "./news.controller.js";

const router = express.Router();

router.post("/add-news", NewsImage.uploadImage, NewsController.addNews);

router.get("/", NewsController.getAllNews);

router.get("/:id", NewsController.getNewsById);

router.patch("/:id", NewsImage.uploadImage, NewsController.updateNews);

router.delete("/:id", NewsController.deleteNews);

export const NewsRoute = router;
