import express from 'express';
// import helmet from 'helmet';
import { ApolloServer } from 'apollo-server-express'
import { schema } from './schema'
import { db } from './db'
import { getUserFromRequest } from './types/users/helper'
import { applyMiddleware } from 'graphql-middleware'
import { permissions } from './middleware/permissions'
import * as redis from 'redis'
import { PrismaClient } from '@prisma/client';

const permissionsSchema = applyMiddleware(schema, permissions)

export const server = new ApolloServer({ 
  schema: permissionsSchema,
  context: async ({ req }) => {
    const user = await getUserFromRequest(req)
    return {
      db,
      req,
      user
    }
  }
})


export const app = express();

app.use(require('express-status-monitor')());

const prismaClient = new PrismaClient()

// app.use(helmet())

app.get('/confirm/:token', async (req, res) => {
  const redisClient = redis.createClient(6379, process.env.REDIS_HOST)
  const token = req.params.token
  redisClient.get(token, async (err, res) => {
    console.log(res)
    if (res) {
      await prismaClient.user.update({ 
        where: {
          user_id: res!
        },
        data: {
          confirmed: true
        }
      })
    }
  })

  console.log(req.params.token)
  res.redirect(`http://localhost:4000/graphql`)
});

server.applyMiddleware({ app });
