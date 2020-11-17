import { createRateLimitRule, RedisStore } from 'graphql-rate-limit';
import { allow, and, not } from 'graphql-shield'
import { rules } from '../../middleware/permissions/rules'
import * as redis from 'redis'

const loginRateLimitRule = createRateLimitRule({ 
  identifyContext: (ctx) => ctx.req.ip, 
  formatError: () => `Hey there, you are doing way too much`,
  store: new RedisStore(redis.createClient(6379, process.env.REDIS_HOST))
});

const regsiterRateLimitRule = createRateLimitRule({ 
  identifyContext: (ctx) => ctx.req.ip, 
  formatError: () => `Hey there, you are doing way too much`,
  store: new RedisStore(redis.createClient(6379, process.env.REDIS_HOST))
});

export const UserQueryPermissions = {
  allUsers: rules.isAuthenticated,
  me: rules.isAuthenticated,
  getUser: rules.isAuthenticated,
  myVotes: rules.isAuthenticated
}

export const UserMutationPermissions = {
  login: and(not(rules.isAuthenticated), loginRateLimitRule({ window: "1m", max: 10 })),
  register: and(not(rules.isAuthenticated), regsiterRateLimitRule({ window: "5m", max: 50 })),
  updateUser: rules.isAuthenticated,
  deleteUser: rules.isAuthenticated
}