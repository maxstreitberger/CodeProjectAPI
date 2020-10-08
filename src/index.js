const { GraphQLServer } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')

const resolvers = {
  Query: {
    info: () => `This is the API of my CODE project`
  }
}

const prisma = new PrismaClient()
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    prisma,
  }
})
server.start(() => console.log('🚀 Server is running on http://localhost:4000'))
