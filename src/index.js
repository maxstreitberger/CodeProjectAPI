const { GraphQLServer } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')
const { rule, shield, and, or, not, allow } = require('graphql-shield')
const { checkUser } = require('./utils')

const Query = require('./resolvers/Query.js')
const Mutation = require('./resolvers/Mutations/Mutation.js')
const User = require('./resolvers/User.js')
const Event = require('./resolvers/Event.js')

const resolvers = {
  Query,
  Mutation,
  User,
  Event
}

const isAuthenticated = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
  if (ctx.user === null) {
    return new Error('You are not authenticated.')
  }
  return true
})

const isAdmin = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
  if (ctx.user.role !== 'ADMIN') {
    return new Error('You are no admin.')
  }
  return true
})

const permissions = shield({
  Query: {
    allUsers: isAuthenticated,
    events: allow,
    event: isAuthenticated,
    user: isAuthenticated,
    allUsers: isAuthenticated
  },
  Mutation: {
    registerAdmin: isAdmin,
    post: isAuthenticated
  }
}, {
  allowExternalErrors: allow
})

const prisma = new PrismaClient()
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  middlewares: [permissions],
  context: request => {
    return {
      ...request,
      prisma,
      user: checkUser(request)
    }
  }
})
server.start(() => console.log('🚀 Server is running on http://localhost:4000'))
