import { Course } from '@prisma/client'
import Link from 'next/link'
import { DeleteDialog } from './components/DeleteDialog'

async function getCourses() {
  const res = await fetch('http://localhost:3000/api/courses', {
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch courses')
  }

  return res.json()
}

export default async function CoursesPage() {
  const courses = await getCourses()

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Courses</h1>
        <Link
          href="/courses/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Course
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course: Course) => (
          <div key={course.id}>
            <Link href={`/courses/${course.id}`}>
              <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold">{course.title}</h2>
                  <DeleteDialog courseId={course.id} courseTitle={course.title} />
                </div>
                <p className="text-gray-600">{course.instructor}</p>
                <p className="text-sm text-gray-500 mt-2">{course.description}</p>
                <p className="text-sm font-medium mt-2">Duration: {course.duration} hours</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}