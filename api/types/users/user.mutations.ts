require('dotenv').config()
import { idArg, mutationField, stringArg } from '@nexus/schema'
import { AuthenticationError } from 'apollo-server'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import xss from 'xss'
import { sendEmail } from '../../utils/sendEmail'
import { createConfirmEmailLink } from './helper'
const APP_SECRET = process.env.KEY

const register = mutationField('register', {
  type: 'AuthPayload',
  args: {
    username: stringArg({ required: true }),
    first_name: stringArg({ required: false }),
    last_name: stringArg({ required: false }),
    email: stringArg({ required: true }),
    password: stringArg({ required: true }),
  },
  async resolve(_root, args, ctx) {
    const username = xss(args.username);
    const first_name = xss(args.first_name ? args.first_name : '')
    const last_name = xss(args.last_name ? args.last_name : '')
    
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(args.email.toLowerCase())) {
      const error = new Error("This is not a valid email address. Please try a different one.")
      return error
    }

    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.db.users.create({
      data: {
        username: username,
        first_name: first_name,
        last_name: last_name,
        email: args.email,
        password: password,
        role: 'USER'
      }
    })

    const token = jwt.sign({ sub: user.user_id, username: user.username, email: user.email, role: user.role, confirmed: user.confirmed }, APP_SECRET!, {expiresIn: 2419200})

    const url = ctx.req.protocol + "://" + ctx.req.hostname + ':4000'
    const link = await createConfirmEmailLink(url, user.user_id)

    try {
      sendEmail(user.email!, link)
    }
    catch(e) {
      console.log("Send email failed: " + e)
      return e
    }

    return {
      user: user,
      token: token
    }
  }
})

const login = mutationField('login', {
  type: 'AuthPayload',
  args: {
    email: stringArg({ required: true }),
    password: stringArg({ required: true }),
  },
  async resolve(_root, args, ctx) {
    const user = await ctx.db.users.findOne({
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
  
    const token = jwt.sign({ sub: user.user_id, username: user.username, email: user.email, role: user.role, confirmed: user.confirmed }, APP_SECRET!, {expiresIn: 2419200})

    return {
      user,
      token
    }
  }
})

const updateUserData = mutationField('updateUser', {
  type: 'User',
  args: {
    first_name: stringArg({ required: false }),
    last_name: stringArg({ required: false })
  },
  resolve(_root, args, { db, user }) {
    const first_name = xss(args.first_name ? args.first_name : '')
    const last_name = xss(args.last_name ? args.last_name : '')

    return db.users.update({
      where: {
        user_id: user.user_id
      },
      data: {
        first_name: first_name,
        last_name: last_name
      }
    })
  }
})

const deleteUser = mutationField('deleteUser', {
  type: 'User',
  args: {
    user_id: idArg({ required: true })
  },
  resolve(_root, args, { db }) {
    return db.users.delete({ 
      where: { 
        user_id: args.user_id 
      },
      include: {
        events: {},
        event_tasks: {},
        friends: {},
        my_tasks: {},
        votes: {},
        joined_events: {}
      }
    })
  }
})

export const UserMutations = [register, login, updateUserData, deleteUser]