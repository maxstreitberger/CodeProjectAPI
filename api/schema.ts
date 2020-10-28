import { makeSchema } from '@nexus/schema'
import { join } from 'path'
import { EventSchema } from './events'
import { UserSchema } from './users'
import { GuestSchema } from './guests'

export const schema = makeSchema({
  types: [EventSchema, UserSchema, GuestSchema],
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