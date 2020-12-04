import { decorateType } from '@nexus/schema'
import { GraphQLDate, GraphQLTime } from 'graphql-scalars'

const GQLDate = decorateType(GraphQLDate, {
  rootTyping: 'DateTime',
  asNexusMethod: 'date',
})

import { Event } from './event.type'
import { EventQueries } from './event.queries'
import { EventMutations } from './event.mutations'

export const EventSchema = [GQLDate, Event, EventQueries, EventMutations]