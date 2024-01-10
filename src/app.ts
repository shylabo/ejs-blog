import express, { Request, Response } from 'express'
import morgan from 'morgan'
import path from 'path'
import expressEjsLayouts from 'express-ejs-layouts'
import { router as articlesRouter } from './routes/articleRouter'
import { router as authRouter } from './routes/authRouter'

export const app = express()

app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, 'views'))
app.set('layout', path.join(__dirname, 'views/layouts/layout'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(expressEjsLayouts)
app.use(express.urlencoded())
app.use(morgan('dev'))

// Routers
app.use('/auth', authRouter)
app.use('/articles', articlesRouter)

// Redirect
app.get('/', (req: Request, res: Response) => {
  res.redirect('articles')
})
