import express from 'express'
import { createLecture, deleteLecture, getLectureById, getLectures } from '../controllers/lectureController'


const router = express.Router()

// Create a new lecture
router.post('/lectures', createLecture)

// Get all lectures
router.get('/lectures', getLectures)

// Get a lecture by ID
router.get('/lectures/:id', getLectureById)

// Delete a lecture by ID
router.delete('/lectures/:id', deleteLecture)

export default router
