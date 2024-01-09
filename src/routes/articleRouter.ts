import { Router } from 'express'
import controller from '../controllers/articlesController'

export const router = Router()

router.get('/', controller.index)
router.get('/new', controller.newArticle)
router.post('/new', controller.create)
