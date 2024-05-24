import express from "express";
import { NewsController } from "./news.controller.js";
import { NewsImageUpload } from "../../middleware/uploader/uploadNews.js";
// import validateRequest from "../../middleware/validationRequest.js";
// import { NewsValidation } from "./news.validation.js";

const router = express.Router();

router.post(
  "/add-news",
  //   validateRequest(NewsValidation.NewsSchemaValidation),
  NewsImageUpload.uploadNewsImage,
  NewsController.addNews
);

router.get("/", NewsController.getAllNews);

router.get("/:id", NewsController.getNewsById);

router.patch(
  "/:id",
  NewsImageUpload.uploadNewsImage,
  NewsController.updateNews
);

router.delete(
  "/:id",
  NewsImageUpload.deleteNewsImage,
  NewsController.deleteNews
);

export const NewsRoute = router;
