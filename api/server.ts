import { ApolloServer } from 'apollo-server'
import { schema } from './schema'
import { db } from './db'
import { getUserFromRequest } from './users/helper'
import { applyMiddleware } from 'graphql-middleware'
import { permissions } from './middleware/permissions'

const permissionsSchema = applyMiddleware(schema, permissions)

export const server = new ApolloServer({ 
  schema: permissionsSchema,
  engine: {
    apiKey: process.env.APOLLO_KEY
  },
  context: async ({ req }) => {
    const user = await getUserFromRequest(req)
    return {
      db,
      req,
      user
    }
  }
})