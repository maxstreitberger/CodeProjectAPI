require('dotenv').config()
import { idArg, mutationField, stringArg } from '@nexus/schema'
import { AuthenticationError } from 'apollo-server'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import * as redis from 'redis'
import { sendEmail } from '../../utils/sendEmail'
import { createConfirmEmailLink } from './helper'
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
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log("Is this a valid email? " + re.test(args.email.toLowerCase()))
    if (!re.test(args.email.toLowerCase())) {
      const error = new Error("This is not a valid email address. Please try a different one.")
      return error
    }

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

      const url = ctx.req.protocol + "://" + ctx.req.hostname + ':4000'
      const link = await createConfirmEmailLink(url, user.user_id)

      await sendEmail(user.email!, link);

      return {
        user: user,
        token: token
      }
    } catch(e) {
      console.log(e)
      return e
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

      if (!user.confirmed) {
        throw new AuthenticationError('Account is not confirmed yet')
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
      return e
    }
  }
})

const UpdateUserData = mutationField('updateUser', {
  type: 'User',
  args: {
    user_id: idArg({ required: true }),
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

const DeleteUser = mutationField('deleteUser', {
  type: 'User',
  args: {
    user_id: idArg({ required: true })
  },
  resolve(_root, args, { db }) {
    return db.user.delete({ where: { user_id: args.user_id } })
  }
})

const VerifyCode = mutationField('verifyCode', {
  type: 'Boolean',
  args: {
    code: stringArg({ required: true })
  },
  resolve(_root, args, { db, user }) {
    const redisClient = redis.createClient(6379, process.env.REDIS_HOST)
    redisClient.get(args.code, function(err, res) {
      console.log(res)
    })
    return true
  }
})

export const UserMutations = [
  Register,
  Login,
  UpdateUserData,
  DeleteUser,
  VerifyCode
]