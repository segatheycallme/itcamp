import { z } from "zod";

// Base schema for book validation
export const bookSchema = z.object({
  title: z.string().min(1, "Book title is required"),
  author: z.string().min(1, "Author name is required"),
});

// Schema for validating URL params
export const paramsSchema = z.object({
  id: z.coerce.number().positive("Invalid ID"),
});

export type BookInput = z.infer<typeof bookSchema>;

