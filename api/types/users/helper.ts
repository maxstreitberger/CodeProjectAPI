require('dotenv').config()
import { AuthenticationError } from "apollo-server"
import { Request } from "express"
import * as jwt from 'jsonwebtoken'
import * as redis from 'redis'
import { v4 } from 'uuid'
const APP_SECRET = process.env.KEY

export const getUserFromRequest = async(req: Request) => {
  let authToken = ''
  const header = req.get('authorization')
  if (header) {
    const authHeader = header
    authToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader
  }
  if (authToken) {
    try {
      const { sub, role, confirmed } = jwt.verify(authToken, APP_SECRET!) as { sub: string, role: string, confirmed: boolean }
      const user = {
        "user_id": sub,
        "role": role
      }

      if (confirmed) {
        return user
      } else {
        throw new AuthenticationError("You have to confirm this account first.")
      }
    } catch {
      return undefined
    }
  }

  return undefined
}

export const createConfirmEmailLink = async(url: string, user_id: string) => {
  const token = v4()
  const redisClient = redis.createClient(6379, process.env.REDIS_HOST)
  redisClient.set(token, user_id, 'ex', 60 * 10)
  return `${url}/confirm/${token}`;
}