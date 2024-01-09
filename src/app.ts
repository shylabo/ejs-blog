import express, { Request, Response } from 'express'
import morgan from 'morgan'
import path from 'path'
import expressEjsLayouts from 'express-ejs-layouts'

export const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.set('layout', path.join(__dirname, 'views/layouts/layout'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(expressEjsLayouts)
app.use(express.urlencoded())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.redirect('articles')
})

const articles = [
  { id: 0, title: 'article', content: 'This is my first article' },
  { id: 1, title: 'random', content: 'This is my first article' },
  { id: 2, title: 'nodejs', content: 'This is my first article' },
  { id: 3, title: 'How to cook a cupcake', content: 'This is my first article' },
]

app.get('/articles', (req, res) => {
  res.render('articles', { articles })
})

app.get(
  '/articles/search',
  (
    req: Request<
      {}, // params => /articles/:article_id
      {}, // res body
      {}, // req.body
      { q: string } // req.query
    >,
    res: Response
  ) => {
    const { q } = req.query

    const filteredArticles = articles.filter((article) => article.title.includes(q))
    res.render('articles', { articles: filteredArticles })
  }
)

app.get('/articles/new', (req, res) => {
  res.render('articles/new')
})

app.post('/articles/new', (req, res) => {
  const payload = req.body

  const newArticle = {
    ...payload,
    id: articles.length,
  }

  articles.push(newArticle)

  res.redirect('/articles')
})
