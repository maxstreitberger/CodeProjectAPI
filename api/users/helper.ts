require('dotenv').config()
import { Request } from "express"
import jwt from 'jsonwebtoken'
const APP_SECRET = process.env.KEY

export const getUserFromRequest = async (req: Request) => {
  let authToken = ''
  const header = req.get('Authentication')
  if (header) {
    const authHeader = header
    authToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader
  }
  if (authToken) {
    try {
      const { sub, role } = jwt.verify(authToken, APP_SECRET!) as { sub: string, role: string }
      const user = {
        "user_id": sub,
        "role": role
      }
      console.log(role)
      return user
    } catch (e) {
      console.log(e)
      return undefined
    }
  }

  return undefined
}