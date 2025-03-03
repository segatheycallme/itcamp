'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  courseId: number
  courseTitle: string
}

export function DeleteDialog({ courseId, courseTitle }: Props) {
  const router = useRouter()
  const dialogRef = useRef<HTMLDialogElement>(null)

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/courses/${courseId}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Failed to delete course')

      router.push('/courses')
      router.refresh()
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to delete course')
    } finally {
      dialogRef.current?.close()
    }
  }

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault()
          dialogRef.current?.showModal()
        }}
        className="text-red-500 hover:text-red-700"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <dialog ref={dialogRef} className="rounded-lg p-6 backdrop:bg-gray-500/50">
        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p className="mb-6">Are you sure you want to delete &quot;{courseTitle}&quot;?</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => dialogRef.current?.close()}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </dialog>
    </>
  )
} 