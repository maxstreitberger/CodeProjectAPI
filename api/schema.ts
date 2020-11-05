import { makeSchema, queryComplexityPlugin } from '@nexus/schema'
import { join } from 'path'
import { types } from './types'

export const schema = makeSchema({
  types: types,
  plugins: [
    queryComplexityPlugin()
  ],
  outputs: {
    typegen: join(__dirname, '/generated/nexus-typegen.ts'),
    schema: join(__dirname, '/generated/schema.graphql'),
  },
  typegenAutoConfig: {
    sources: [
      {
        source: require.resolve("./context"),
        alias: "ContextModule"
      }
    ],
    contextType: "ContextModule.Context",
    backingTypeMap: {
      Date: 'Date',
    },
  }
})