import express from "express";
import { ContactController } from "./contact.controller.js";

const router = express.Router();
// create contact
router.post("/create", ContactController.createContact);

// get all contact
router.get("/", ContactController.getAllContact);

// get single single contact
router.get("/:id", ContactController.getSingleContact);

// delete contact
router.delete("/:id", ContactController.deleteContact);

export const ContactRoute = router;
