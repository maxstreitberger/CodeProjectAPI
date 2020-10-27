import { rule } from 'graphql-shield'
import { User, Role } from '@prisma/client'

export const rules = {
  isAdmin: rule()(async (root, args, { user }) => {
    return is.admin(user)
  }),

  isUser: rule()(async (root, args, { user }) => {
    return is.user(user)
  })
}

export const is = {
  admin: (user?: User) => {
    return checkRole(Role.ADMIN, user)
  },

  user: (user?: User) => {
    return checkRole(Role.USER, user)
  }
  
}

const checkRole = (roles: Array<Role> | Role, user?: User) => {
  const source: Array<Role> = Array.isArray(roles) ? roles : [roles]
  return user ? source.includes(user.role!) : false
}