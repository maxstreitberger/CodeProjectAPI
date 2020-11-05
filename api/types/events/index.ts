// import { decorateType } from '@nexus/schema'
// import { GraphQLDate } from 'graphql-scalars'

// export const GQLDate = decorateType(GraphQLDate, {
//   rootTyping: 'Date',
//   asNexusMethod: 'date',
// })

import { Event } from './event.type'
import { EventQueries } from './event.queries'
import { EventMutations } from './event.mutations'

export const EventSchema = [Event, EventQueries, EventMutations]