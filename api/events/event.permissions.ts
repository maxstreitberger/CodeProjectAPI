import { or, and, not, allow } from 'graphql-shield'
import { auth } from '../permissions/auth'

export const EventPermissions = {
  createEvent: auth.isAuthenticated
}