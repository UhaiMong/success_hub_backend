import express from "express";
import validateRequest from "../../middleware/validationRequest.js";
import { AdminController } from "./admin.controller.js";
import { AdminValidation } from "./admin.validation.js";

const router = express.Router();

router.post(
  "/register",
  validateRequest(AdminValidation.AdminSchemaValidation),
  AdminController.registerAdmin
);

// get all users
router.get("/", AdminController.getAdmin);

export const AdminRoute = router;
