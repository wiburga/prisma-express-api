import prisma from '../config/prisma'
import { User } from '@prisma/client'

class UserRepository {
  async findAll(): Promise<User[]> {
    return prisma.user.findMany()
  }

  async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } })
  }

  async create(data: { name: string; email: string }): Promise<User> {
    return prisma.user.create({ data })
  }

  async delete(id: number): Promise<User> {
    return prisma.user.delete({ where: { id } })
  }
}

export default new UserRepository()
