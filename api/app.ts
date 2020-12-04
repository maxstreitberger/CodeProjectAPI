import { app } from './server'

// server.listen().then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`)
// })

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000/graphql`)
);