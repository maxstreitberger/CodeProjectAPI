import { rules } from '../../middleware/permissions/rules'

export const PrivateTaskQueryPermissions = { 
  getPrivateTask: rules.isAuthenticated,
  myTasks: rules.isAuthenticated
}

export const PrivateTaskMutationPermissions = {
  createPrivateTask: rules.isAuthenticated,
  updatePrivateTask: rules.isAuthenticated,
  deletePrivateTask: rules.isAuthenticated,
}