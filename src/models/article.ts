import { CreateArticle } from '../controllers/articlesController'

const articles = [
  { id: 0, title: 'article', content: 'This is my first article' },
  { id: 1, title: 'random', content: 'This is my first article' },
  { id: 2, title: 'nodejs', content: 'This is my first article' },
  { id: 3, title: 'How to cook a cupcake', content: 'This is my first article' },
]

const find = ({ search }: Record<string, any>) => {
  if (search) {
    return articles.filter((article) => article.title.includes(search))
  }

  return articles
}

const create = (payload: CreateArticle) => {
  const newArticle = {
    ...payload,
    id: articles.length,
  }

  articles.push(newArticle)
}

export const Articles = {
  find,
  create,
}
