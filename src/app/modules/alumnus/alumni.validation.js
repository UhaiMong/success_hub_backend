import { z } from "zod";

const registerAlumniValidateSchema = z.object({
  body: z.object({
    username: z.string({
      required_error: "User name is required",
    }),
    email: z.string({
      required_error: "Email is required",
    }),
  }),
});

export const AlumniValidation = {
  registerAlumniValidateSchema,
};
