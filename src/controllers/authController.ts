import { Request, Response } from 'express'
import { users } from '../models/user'

const renderLogin = (req: Request, res: Response) => {
  res.render('auth', { page: 'login' })
}

const renderRegister = (req: Request, res: Response) => {
  res.render('auth', { page: 'register' })
}

const login = (req: Request, res: Response) => {
  const { email, password } = req.body
  // check if the user existing
  const user = users.find((user) => user.email === email)
  if (!user) {
    throw new Error('Incorrect user email or password')
  }
  // if not we need to tell user to create new account

  const isPasswordValid = user.password === password
  if (!isPasswordValid) {
    throw new Error('Incorrect user email or password')
  }
  // password should be valid
  // if not, need to inform user that password is incorrect

  res.redirect('/articles')
}

const register = (req: Request, res: Response) => {
  const { email, password, passwordConfirm } = req.body
  // if email exists in our db then inform user that existing user

  const isExisting = users.find((user) => user.email === email)
  if (isExisting) {
    throw new Error('User existing')
  }

  const isPasswordValid = password === passwordConfirm
  if (!isPasswordValid) {
    throw new Error('Password and Confirm password not matched')
  }

  const newUser = {
    id: users.length,
    email,
    password,
  }

  users.push(newUser)

  res.redirect('/articles')
}

export default { renderLogin, renderRegister, login, register }
