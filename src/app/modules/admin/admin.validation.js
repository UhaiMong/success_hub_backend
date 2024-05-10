import { z } from "zod";

const AdminSchemaValidation = z.object({
  body: z.object({
    password: z.string({
      required_error: "Password must",
    }),
    email: z.string({
      required_error: "Email is must",
    }),
  }),
});

export const AdminValidation = {
  AdminSchemaValidation,
};
