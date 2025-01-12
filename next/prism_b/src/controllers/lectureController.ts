import { Request, Response } from 'express'
import prisma from '../prisma'

export async function createLecture(req: Request, res: Response) {
  const { description, name, duration } = req.body
  try {
    const lecture = await prisma.lecture.create({
      data: { description, name, duration },
    })
    res.status(201).json(lecture)
  } catch (error) {
    res.status(400).json({ error: 'Failed to create lecture' })
  }
}

export async function getLectures(_req: Request, res: Response) {
  try {
    const lectures = await prisma.lecture.findMany()
    res.json(lectures)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lectures' })
  }
}

export async function getLectureById(req: Request, res: Response): Promise<void> {
  const { id } = req.params
  try {
    const lecture = await prisma.lecture.findUnique({
      where: { id: Number(id) },
    })
    if (!lecture) {
      res.status(404).json({ error: 'lecture not found' })
      return
    }
    res.json(lecture)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lecture' })
  }
}


export async function deleteLecture(req: Request, res: Response) {
  const { id } = req.params
  try {
    const lecture = await prisma.lecture.delete({
      where: { id: Number(id) },
    })
    res.json(lecture)
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete lecture' })
  }
}
