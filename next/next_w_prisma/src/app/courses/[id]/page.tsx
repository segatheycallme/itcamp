import Link from 'next/link'
import { notFound } from 'next/navigation'
import { DeleteDialog } from '../components/DeleteDialog'

async function getCourse(id: string) {
  if (isNaN(Number(id))) {
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

export default async function CoursePage({ params }: { params: { id: string } }) {
  const course = await getCourse(params.id)

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <Link href="/courses" className="text-blue-500 hover:text-blue-700">
          ← Back to Courses
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href={`/courses/${course.id}/edit`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit Course
          </Link>
          <DeleteDialog courseId={course.id} courseTitle={course.title} />
        </div>
      </div>
      
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
        <p className="text-xl text-gray-600 mb-4">Instructor: {course.instructor}</p>
        <p className="text-gray-500 mb-6">Duration: {course.duration} hours</p>
        
        {course.description && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-600">{course.description}</p>
          </div>
        )}

        <div className="mt-6 text-sm text-gray-500">
          <p>Added: {new Date(course.createdAt).toLocaleDateString()}</p>
          <p>Last updated: {new Date(course.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
} 