import { Request, Response, NextFunction } from 'express'
import userRepository from '../repositories/user.repository'

class UserController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userRepository.findAll()
      res.json({ data: users, total: users.length })
    } catch (err) {
      next(err)
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const user = await userRepository.findById(id)

      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' })
      }

      res.json({ data: user })
    } catch (err) {
      next(err)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email } = req.body

      if (!name || !email) {
        return res.status(400).json({ error: 'name y email son requeridos' })
      }

      const user = await userRepository.create({ name, email })
      res.status(201).json({ data: user })
    } catch (err) {
      next(err)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      
      if (id <= 0) {
        return res.status(400).json({ error: 'ID inválido' })
      }

      const user = await userRepository.findById(id)
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' })
      }

      await userRepository.delete(id)
      res.json({ message: 'Usuario eliminado correctamente' })
    } catch (err) {
      next(err)
    }
  }
}

export default new UserController()
