import express from "express";
// import validateRequest from "../../middleware/validationRequest.js";
// import { AlumniValidation } from "./alumni.validation.js";
import { AlumnusController } from "./alumnus.controller.js";
import { AlumniImageUpload } from "../../middleware/uploader/uploadAlumnus.js";

const router = express.Router();

router.post(
  "/alumni-register",
  // validateRequest(AlumniValidation.registerAlumniValidateSchema),
  AlumniImageUpload.uploadAlumniImage,
  AlumnusController.registerAlumni
);

// get single alumni
router.get("/:email", AlumnusController.getSingleAlumni);
// get Single Alumni by Id
router.get("/:id", AlumnusController.getSingleAlumniById);

// get all alumni
router.get("/", AlumnusController.getAllAlumni);

// update alumni
router.patch("/:id", AlumnusController.updateAlumni);

// delete alumni
router.delete(
  "/:id",
  AlumniImageUpload.deleteAlumniImage,
  AlumnusController.deleteAlumni
);

export const AlumniRoute = router;
