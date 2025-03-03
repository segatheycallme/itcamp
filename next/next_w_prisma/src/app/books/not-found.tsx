import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
      <p className="text-gray-600 mb-4">Could not find the requested course.</p>
      <Link
        href="/courses" 
        className="text-blue-500 hover:text-blue-700"
      >
        ← Back to Courses
      </Link>
    </div>
  )
} 