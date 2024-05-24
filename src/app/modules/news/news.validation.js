import { z } from "zod";
const NewsSchemaValidation = z.object({
  body: z.object({
    cat: z.string({
      required_error: "Category is required",
    }),
    newsTitle: z.string({
      required_error: "News Title is required",
    }),
    tags: z.string({
      required_error: "Tags is required",
    }),
    newsCover: z.string({
      required_error: "Image is required",
    }),
    description: z.string({
      required_error: "Description is required",
    }),
    summery: z.string({
      required_error: "Summery is required",
    }),
  }),
});

export const NewsValidation = {
  NewsSchemaValidation,
};
