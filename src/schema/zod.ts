import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Product description is required"),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  category: z.string().min(1, "Category is required"),
  discount: z.coerce.number().min(0, "Discount must be 0 or more"),
  image: z.string().url("Invalid image URL"),
});
