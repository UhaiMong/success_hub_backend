import { Schema, model } from "mongoose";

const bannerSchema = new Schema(
  {
    banner: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    cat: {
      type: String,
      default: "home",
    },
  },
  {
    timestamps: true,
  }
);

export const Banner = model("Banner", bannerSchema);
