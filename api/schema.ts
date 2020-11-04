import { makeSchema, queryComplexityPlugin } from '@nexus/schema'
import { join } from 'path'
import { EventSchema } from './events'
import { UserSchema } from './users'
import { GuestSchema } from './guests'
import { EventTaskSchema } from './event_tasks'
import { PrivateTaskSchema } from './private_tasks'
import { FriendSchema } from './friends'
import { SurveySchema } from './surveys'
import { SurveyAnswerSchema } from './survey_answers'

export const schema = makeSchema({
  types: [EventSchema, UserSchema, GuestSchema, EventTaskSchema, PrivateTaskSchema, FriendSchema, SurveySchema, SurveyAnswerSchema],
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