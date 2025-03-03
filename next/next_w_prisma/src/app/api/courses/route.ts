import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { courseSchema } from '@/lib/validations/course'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const courses = await prisma.course.findMany()
    return NextResponse.json(courses)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = courseSchema.safeParse(body)
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors },
        { status: 400 }
      )
    }

    const course = await prisma.course.create({
      data: result.data
    })

    return NextResponse.json(course, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    )
  }
} 