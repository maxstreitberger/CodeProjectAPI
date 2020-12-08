import { rules } from '../../middleware/permissions/rules'
import { createRateLimitRule, RedisStore } from 'graphql-rate-limit';
import * as redis from 'redis'
import { and } from 'graphql-shield';

const voteRateLimitRule = createRateLimitRule({ 
  identifyContext: (ctx) => ctx.req.ip, 
  formatError: () => `Hey there, you are doing way too much`,
  store: new RedisStore(redis.createClient(6379, process.env.REDIS_HOST))
});

export const VoteQueryPermissions = {
  getSurveyVotes: rules.isAuthenticated,
  myVotes: rules.isAuthenticated
} 

export const VoteMutationPermissions = {
  vote: and(rules.isAuthenticated, voteRateLimitRule({ window: "3m", max: 20 })),
  deleteVote: rules.isAuthenticated,
}