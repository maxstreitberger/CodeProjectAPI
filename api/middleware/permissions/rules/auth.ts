import { rule } from 'graphql-shield'

export const auth = {
  isAuthenticated: rule()(async (_root, _args, { user }) => {
    if (!user) {
      return "Either you haven't provided a token or the token is invalid/expired. Please use a valid one. "
    } else {
      return true
    }
  }),
}
