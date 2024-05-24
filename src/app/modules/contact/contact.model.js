import { Schema, model } from "mongoose";
import validator from "validator";

const contactUsSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/\S+@\S+\.\S+/, "Invalid email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Provide valid email"],
    },
    degreeYear: {
      type: Number,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    },
  },
  { timestamps: true }
);
export const ContactUs = model("ContactUs", contactUsSchema);
