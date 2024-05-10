import ApiError from "../../../errors/ApiError.js";
import uploader from "../../../utils/fileUpload.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

function uploadImage(req, res, next) {
  const upload = uploader(
    "news",
    ["image/jpeg", "image/jpg", "image/png"],
    1000000,
    "Only .jpg, jpeg or .png format allowed!"
  );

  // call the middleware function with single file field
  upload.single("image")(req, res, (err) => {
    if (err) {
      throw new ApiError(500, err.message);
    } else {
      if (!req.file) {
        next();
      } else {
        req.image = req.file.filename;
        next();
      }
    }
  });
}

// Middleware to delete an image
function deleteImage(image) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  // Check if req.image exists and is a valid image filename
  if (image) {
    const imagePath = path.join(
      __dirname,
      "../../..",
      "./uploads/news/",
      image
    );
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err}`);
      }
    });
  }
}

export const NewsImage = { uploadImage, deleteImage };
