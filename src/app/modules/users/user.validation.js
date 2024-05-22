import { z } from "zod";

const registerUserZodSchema = z.object({
  body: z.object({
    displayName: z.string({}).optional(),
    email: z.string({
      required_error: "Email is required",
    }),
    mobileNumber: z.string({}).optional(),
  }),
});

export const UserValidation = {
  registerUserZodSchema,
};
