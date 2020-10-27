import { shield } from 'graphql-shield'
import { auth } from './auth'
import { EventPermissions } from '../events/event.permissions'

export const rules = {
  ...auth
}

export const permissions = shield({
  Mutation: {
    ...EventPermissions
  }
})