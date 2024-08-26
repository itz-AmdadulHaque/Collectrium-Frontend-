import { z } from "zod";

const signUpSchema = z.object({
  name: z.string().trim().min(3, "Username must be at least 3 characters long"),
  email: z.string().trim().email("Invalid email address"),
  password: z
    .string()
    .trim()
    .min(4, "Password must be at least 4 characters long"),
});

const loginSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z
    .string()
    .trim()
    .min(4, "Password must be at least 4 characters long"),
});

const createCollectionSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required"),
    description: z.string().trim().min(1, "Description is required"),
    category: z.string().trim().min(1, "Category is required"),
    image: z
    .any()
    .optional()
    .refine((file) => !file || file instanceof File, {
      message: "Invalid file input",
    })
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: "Image must be less than 5MB",
    }),

    // Custom String Fields
    custom_string1_state: z.boolean().default(false),
    custom_string1_name: z.string().trim().nullable().optional(),
    custom_string2_state: z.boolean().default(false),
    custom_string2_name: z.string().trim().nullable().optional(),
    custom_string3_state: z.boolean().default(false),
    custom_string3_name: z.string().trim().nullable().optional(),

    // Custom Integer Fields
    custom_int1_state: z.boolean().default(false),
    custom_int1_name: z.string().trim().nullable().optional(),
    custom_int2_state: z.boolean().default(false),
    custom_int2_name: z.string().trim().nullable().optional(),
    custom_int3_state: z.boolean().default(false),
    custom_int3_name: z.string().trim().nullable().optional(),

    // Custom Multiline Fields
    custom_multi1_state: z.boolean().default(false),
    custom_multi1_name: z.string().trim().nullable().optional(),
    custom_multi2_state: z.boolean().default(false),
    custom_multi2_name: z.string().trim().nullable().optional(),
    custom_multi3_state: z.boolean().default(false),
    custom_multi3_name: z.string().trim().nullable().optional(),
  })
  .refine((data) => !(data.custom_string1_state && !data.custom_string1_name), {
    message: "Custom fields must be filled",
    path: ["custom_string1_name"],
  })
  .refine((data) => !(data.custom_string2_state && !data.custom_string2_name), {
    message: "Custom fields must be filled",
    path: ["custom_string2_name"],
  })
  .refine((data) => !(data.custom_string3_state && !data.custom_string3_name), {
    message: "Custom fields must be filled",
    path: ["custom_string3_name"],
  })
  .refine((data) => !(data.custom_int1_state && !data.custom_int1_name), {
    message: "Custom fields must be filled",
    path: ["custom_int1_name"],
  })
  .refine((data) => !(data.custom_int2_state && !data.custom_int2_name), {
    message: "Custom fields must be filled",
    path: ["custom_int2_name"],
  })
  .refine((data) => !(data.custom_int3_state && !data.custom_int3_name), {
    message: "Custom fields must be filled",
    path: ["custom_int3_name"],
  })
  .refine((data) => !(data.custom_multi1_state && !data.custom_multi1_name), {
    message: "Custom fields must be filled",
    path: ["custom_multi1_name"],
  })
  .refine((data) => !(data.custom_multi2_state && !data.custom_multi2_name), {
    message: "Custom fields must be filled",
    path: ["custom_multi2_name"],
  })
  .refine((data) => !(data.custom_multi3_state && !data.custom_multi3_name), {
    message: "Custom fields must be filled",
    path: ["custom_multi3_name"],
  });
export { signUpSchema, loginSchema, createCollectionSchema };
