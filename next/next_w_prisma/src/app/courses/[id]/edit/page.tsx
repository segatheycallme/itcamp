import { notFound } from 'next/navigation'
import EditCourseForm from '../../components/EditCourseForm'
import { paramsSchema } from '@/lib/validations/course'

async function getCourse(id: string) {
  // Validate ID before fetching
  const result = paramsSchema.safeParse({ id })
  if (!result.success) {
    notFound()
  }

  const res = await fetch(`http://localhost:3000/api/courses/${id}`, {
    cache: 'no-store'
  })
  
  if (res.status === 404) {
    notFound()
  }
  
  if (!res.ok) {
    throw new Error('Failed to fetch course')
  }
  
  return res.json()
}

export default async function EditCoursePage({ params }: { params: { id: string } }) {
  const course = await getCourse(params.id)
  return <EditCourseForm course={course} />
} 