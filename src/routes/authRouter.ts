import { Router } from 'express'
import authController from '../controllers/authController'

export const router = Router()

// /auth/login
router.get('/login', authController.renderLogin)
router.post('/login', authController.login)
router.get('/register', authController.renderRegister)
router.post('/register', authController.register)
