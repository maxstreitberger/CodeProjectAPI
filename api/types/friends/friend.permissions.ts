import { rules } from '../../middleware/permissions/rules'
import { createRateLimitRule, RedisStore } from 'graphql-rate-limit';
import * as redis from 'redis'
import { and } from 'graphql-shield';

const followRateLimitRule = createRateLimitRule({ 
  identifyContext: (ctx) => ctx.req.ip, 
  formatError: () => `Hey there, you are doing way too much`,
  store: new RedisStore(redis.createClient(6379, process.env.REDIS_HOST))
});

export const FriendQueryPermissions = {
  allFriends: rules.isAdmin
}

export const FriendMutationPermissions = {
  follow: and(rules.isAuthenticated, followRateLimitRule({ window: '2m', max: 200 })),
  unfollow: rules.isAuthenticated
}
