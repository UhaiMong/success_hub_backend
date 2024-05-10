import express from "express";
import { EventController } from "./event.controller.js";

const router = express.Router();

router.post("/create-event", EventController.addEvent);

router.get("/", EventController.getEvent);

router.get("/:id", EventController.getSingleEvent);

router.patch("/:id", EventController.updateEvent);

router.delete("/:id", EventController.deleteEvent);

export const EventRoutes = router;
