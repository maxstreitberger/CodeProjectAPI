import { rules } from '../permissions/rules'

export const EventTaskQueryPermissions = { 
  allEvents: rules.isAdmin,
  getEvent: rules.isAuthenticated
}

export const EventTaskMutationPermissions = {
  createEvent: rules.isAuthenticated,
  updateEvent: rules.isAuthenticated,
  deleteEvent: rules.isAuthenticated,
}