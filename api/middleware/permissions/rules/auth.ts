import { rule } from 'graphql-shield'

export const auth = {
  isAuthenticated: rule()(async (root, args, { user }) => {
    if (!user) {
      return "Auth: The Authorization token you provided is invalid/expired. You'll need to use a different one."
    } else {
      return true
    }
  }),
}
