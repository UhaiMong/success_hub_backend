import { Schema, model } from "mongoose";

const newsSchema = new Schema(
  {
    newsTitle: {
      type: String,
    },
    cat: {
      type: String,
      default: "events",
    },
    summery: { type: String, required: true },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    tags: {
      type: String,
    },
  },
  { timestamps: true }
);

export const News = model("News", newsSchema);
