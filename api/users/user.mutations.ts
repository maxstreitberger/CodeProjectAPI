require('dotenv').config()
import { extendType, mutationField, stringArg } from '@nexus/schema'
import { AuthenticationError } from 'apollo-server'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
const APP_SECRET = process.env.KEY

const Register = mutationField('register', {
  type: 'AuthPayload',
  args: {
    username: stringArg({ required: true }),
    first_name: stringArg({ required: false }),
    last_name: stringArg({ required: false }),
    email: stringArg({ required: true }),
    password: stringArg({ required: true }),
  },
  async resolve(_root, args, ctx) {
    try {
      const password = await bcrypt.hash(args.password, 10)
      const user = await ctx.db.user.create({
        data: {
          username: args.username,
          first_name: args.first_name,
          last_name: args.last_name,
          email: args.email,
          password: password,
          role: 'USER'
        }
      })

      const token = jwt.sign({ sub: user.user_id, username: user.username, email: user.email, role: user.role }, APP_SECRET!, {expiresIn: 2419200})
      
      return {
        user: user,
        token: token
      }
    } catch(e) {
      console.log(e)
      return null
    }
  }
})

const Login = mutationField('login', {
  type: 'AuthPayload',
  args: {
    email: stringArg({ required: true }),
    password: stringArg({ required: true }),
  },
  async resolve(_root, args, ctx) {
    try {
      const user = await ctx.db.user.findOne({
        where: {
          email: args.email
        }
      })
    
      if (!user) {
        throw new AuthenticationError('User does not exist')
      }
    
      const valid = await bcrypt.compare(args.password, user.password!)
    
      if (!valid) {
        throw new AuthenticationError('Invalid credentials')
      }
    
      const token = jwt.sign({ sub: user.user_id, username: user.username, email: user.email, role: user.role }, APP_SECRET!, {expiresIn: 2419200})
    
      return {
        user,
        token
      }
    } catch(e) {
      console.log(e)
      return null
    }
  }
})

const UpdateUserData = mutationField('updateUser', {
  type: 'User',
  args: {
    user_id: stringArg({ required: true }),
    first_name: stringArg({ required: false }),
    last_name: stringArg({ required: false })
  },
  resolve(_root, args, { db, req }) {
    try {
      return db.user.update({
        where: {
          user_id: args.user_id
        },
        data: {
          ...args
        }
      })
    } catch(e) {
      console.log(e)
      return null
    } 
  }
})

export const UserMutations = [
  Register,
  Login,
  UpdateUserData
]