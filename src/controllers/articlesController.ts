import { Request, Response } from 'express'
import { Articles } from '../models/article'

const index = (req: Request<{}, {}, {}, { q: string }>, res: Response) => {
  const { q } = req.query
  const articles = Articles.getArticles({ search: q })

  res.render('articles', { articles })
}

const newArticle = (req: Request, res: Response) => {
  res.render('articles/new')
}

export type CreateArticle = {
  title: string
  content: string
}

const create = (req: Request<{}, {}, CreateArticle>, res: Response) => {
  Articles.createArticle(req.body)
  res.redirect('/articles')
}

export default { index, newArticle, create }
