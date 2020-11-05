import { createRateLimitRule, RedisStore } from 'graphql-rate-limit';
import { allow, and, not } from 'graphql-shield'
import { rules } from '../../middleware/permissions/rules'
import redis from 'redis'

const loginRateLimitRule = createRateLimitRule({ 
  identifyContext: (ctx) => ctx.req.ip, 
  formatError: () => `Hey there, you are doing way too much`,
  store: new RedisStore(redis.createClient())
});

const regsiterRateLimitRule = createRateLimitRule({ 
  identifyContext: (ctx) => ctx.req.ip, 
  formatError: () => `Hey there, you are doing way too much`,
  store: new RedisStore(redis.createClient())
});

export const UserQueryPermissions = {
  allUsers: rules.isAuthenticated,
  me: rules.isAuthenticated,
  getUser: rules.isAuthenticated,
  myVotes: rules.isAuthenticated
}

export const UserMutationPermissions = {
  login: and(not(rules.isAuthenticated), loginRateLimitRule({ window: "1m", max: 2 })),
  register: and(not(rules.isAuthenticated), regsiterRateLimitRule({ window: "5m", max: 5 })),
  updateUser: rules.isAuthenticated,
  deleteUser: rules.isAuthenticated
}