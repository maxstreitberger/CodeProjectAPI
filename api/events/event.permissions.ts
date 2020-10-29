import { allow } from 'graphql-shield'
import { rules } from '../permissions/rules'

export const EventQueryPermissions = {
  allEvents: allow,
  getEvent: rules.isAuthenticated
}

export const EventMutationPermissions = {
  createEvent: rules.isAuthenticated,
  updateEvent: rules.isAuthenticated,
  deleteEvent: rules.isAuthenticated,
}