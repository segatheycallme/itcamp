'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Course } from '@prisma/client'

const formSchema = z.object({
  title: z.string().min(1, "Course title is required"),
  instructor: z.string().min(1, "Instructor name is required"),
  description: z.string().optional(),
  duration: z.string()
    .min(1, "Duration is required")
    .transform((val) => Number(val))
    .refine((val) => val > 0, "Duration must be a positive number")
})

// Define the form input type before transformation
type FormInput = {
  title: string
  instructor: string
  description?: string
  duration: string
}

export default function EditCourseForm({ course }: { course: Course }) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: course.title,
      instructor: course.instructor,
      description: course.description || '',
      duration: String(course.duration)
    }
  })

  const onSubmit = async (data: FormInput) => {
    try {
      const res = await fetch(`/api/courses/${course.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error('Failed to update course')

      router.push(`/courses/${course.id}`)
      router.refresh()
    } catch (error) {
      console.error(error)
      alert('Failed to update course')
    }
  }

  return (
    <div className="p-8">
      <Link
        href={`/courses/${course.id}`}
        className="text-blue-500 hover:text-blue-700 mb-4 inline-block"
      >
        ← Back to Course
      </Link>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Edit Course</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Course Title *
            </label>
            <input
              {...register("title")}
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Instructor *
            </label>
            <input
              {...register("instructor")}
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
            {errors.instructor && (
              <p className="mt-1 text-sm text-red-600">{errors.instructor.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Duration (hours) *
            </label>
            <input
              {...register("duration")}
              type="number"
              min="1"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
            {errors.duration && (
              <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 
                ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}