import { rules } from '../../middleware/permissions/rules'

export const EventTaskQueryPermissions = { 
  getEventTask: rules.isAuthenticated,
  allTasksOfEvent: rules.isAuthenticated
}

export const EventTaskMutationPermissions = {
  createEventTask: rules.isAuthenticated,
  updateEventTask: rules.isAuthenticated,
  deleteEventTask: rules.isAuthenticated,
}