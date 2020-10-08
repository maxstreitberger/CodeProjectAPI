const { GraphQLServer } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')

const resolvers = {
  Query: {
    info: () => `This is the API of my CODE project`,
    events: async (parent, args, context) => {
      return context.prisma.event.findMany()
    }
  },

  Mutation: {
    post: (parent, args, context, info) => {
      const newEvent = context.prisma.event.create({
        data: {
          title: args.title,
          date: args.data,
          event_start: args.event_start,
          description: args.description,
          is_public: args.is_public,
          event_type: args.event_type,
          street_and_house_number: args.street_and_house_number,
          city: args.city,
          country: args.country,
          user: {
            connect: {
              user_id: args.user_id
            }
          }      
        }
      })

      return newEvent
    }
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
