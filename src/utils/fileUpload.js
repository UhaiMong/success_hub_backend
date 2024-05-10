// external imports
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

function uploader(
  subfolder_path,
  allowed_file_types,
  max_file_size,
  error_msg
) {
  // Get the current module's filename
  const __filename = fileURLToPath(import.meta.url);
  // Derive the directory name from the filename
  const __dirname = path.dirname(__filename);

  // File upload folder
  const UPLOADS_FOLDER = path.join(__dirname, `../uploads/${subfolder_path}/`);

  // define the storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();

      cb(null, fileName + fileExt);
    },
  });

  // prepare the final multer upload object
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: max_file_size,
    },
    fileFilter: (req, file, cb) => {
      if (allowed_file_types.includes(file.mimetype)) {
        cb(null, true);
      } else {
        console.log(error_msg);
      }
    },
  });

  return upload;
}

export default uploader;
