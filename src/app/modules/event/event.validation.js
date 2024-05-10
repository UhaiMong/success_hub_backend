import { z } from "zod";

const blogZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title name is required",
    }),
    eventDateTime: z.string({
      required_error: "Event Date is required",
    }),
    reportingTime: z.string({
      required_error: "Reporting time is required",
    }),
    registrationEndTime: z.string({
      required_error: "Registration Died line is required",
    }),
    description: z.string({
      required_error: "Description is required",
    }),
    venue: z.string({
      required_error: "Venue/Place is required",
    }),
    contactPhone: z.string({
      required_error: "Phone number is required",
    }),
    email: z.string({
      required_error: "Email is required",
    }),
    registrationForm: z.string({
      required_error: "Registration form is required",
    }),
  }),
});

export const BlogValidation = {
  blogZodSchema,
};
