import { Schema, model } from "mongoose";

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    eventDateTime: {
      type: String,
      required: true,
    },
    reportingTime: {
      type: String,
      required: true,
    },
    registrationEndTime: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    contactPhone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    registrationForm: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Event = model("Event", eventSchema);
