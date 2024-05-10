import { Schema, model } from "mongoose";

const adminSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "co-admin",
    },
  },
  {
    timestamps: true,
  }
);

export const Admin = model("Admin", adminSchema);
