import express from "express";
import { UserController } from "./user.controller.js";
// import validateRequest from "../../middleware/validationRequest.js";
// import { UserValidation } from "./user.validation.js";

const router = express.Router();

router.post("/user-register", UserController.registerUser);

// get single user
router.get("/:email", UserController.getSingleUser);

// get all users
router.get("/", UserController.getAllUsers);
// get user by std_uid
router.get("/std_uid/:std_uid", UserController.getUserByStdUid);

// update user
router.patch("/:id", UserController.updateUser);

// delete user
router.delete("/:id", UserController.deleteUser);

export const UserRoutes = router;
