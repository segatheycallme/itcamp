import { z } from 'zod'

// Base schema for course validation
export const courseSchema = z.object({
  title: z.string().min(1, "Course title is required"),
  instructor: z.string().min(1, "Instructor name is required"),
  description: z.string().optional(),
  duration: z.number().min(1, "Duration must be a positive number"),
  categoryId: z.number().optional()
})

// Schema for validating URL params
export const paramsSchema = z.object({
  id: z.coerce.number().positive("Invalid ID")
})

export type CourseInput = z.infer<typeof courseSchema> 