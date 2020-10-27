import { ApolloServer } from 'apollo-server'
import { schema } from './schema'
import { db } from './db'
import { getUserFromRequest } from './users/helper'
import { applyMiddleware } from 'graphql-middleware'

import { permissions } from './permissions'

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