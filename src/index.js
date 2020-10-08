const { GraphQLServer } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')

const Query = require('./resolvers/Query.js')
const Mutation = require('./resolvers/Mutation.js')
const User = require('./resolvers/User.js')
const Event = require('./resolvers/Event.js')

const resolvers = {
  Query,
  Mutation,
  User,
  Event
}

const prisma = new PrismaClient()
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
    }
  }
})
server.start(() => console.log('🚀 Server is running on http://localhost:4000'))
