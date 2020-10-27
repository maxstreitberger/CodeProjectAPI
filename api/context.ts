import { PrismaClient, User } from '@prisma/client'
import { Request } from 'express'

export interface Context {
  db: PrismaClient
  req: Request
  user: User
}