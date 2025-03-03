import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { courseSchema, paramsSchema } from '@/lib/validations/course'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const result = paramsSchema.safeParse(params)
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors },
        { status: 400 }
      )
    }

    const course = await prisma.course.findUnique({
      where: { id: result.data.id }
    })

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(course)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch course' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const paramResult = paramsSchema.safeParse(params)
    if (!paramResult.success) {
      return NextResponse.json(
        { error: paramResult.error.errors },
        { status: 400 }
      )
    }

    const body = await request.json()
    const bodyResult = courseSchema.safeParse(body)
    if (!bodyResult.success) {
      return NextResponse.json(
        { error: bodyResult.error.errors },
        { status: 400 }
      )
    }

    const course = await prisma.course.update({
      where: { id: paramResult.data.id },
      data: bodyResult.data
    })

    return NextResponse.json(course)
  } catch {
    return NextResponse.json(
      { error: 'Failed to update course' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const result = paramsSchema.safeParse(params)
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors },
        { status: 400 }
      )
    }

    await prisma.course.delete({
      where: { id: result.data.id }
    })

    return NextResponse.json({ message: 'Course deleted successfully' })
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete course' },
      { status: 500 }
    )
  }
}
