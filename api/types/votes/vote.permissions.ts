import { rules } from '../../middleware/permissions/rules'
import { createRateLimitRule, RedisStore } from 'graphql-rate-limit';
import * as redis from 'redis'
import { and } from 'graphql-shield';

const createVoteRateLimitRule = createRateLimitRule({ 
  identifyContext: (ctx) => ctx.req.ip, 
  formatError: () => `Hey there, you are doing way too much`,
  store: new RedisStore(redis.createClient(6379, 'redis'))
});

export const VoteQueryPermissions = {
  allVotes: rules.isAdmin,
  getSurveyVotes: rules.isAuthenticated
} 

export const VoteMutationPermissions = {
  createVote: and(rules.isAuthenticated, createVoteRateLimitRule({ window: "3m", max: 20 })),
  deleteVote: rules.isAuthenticated,
}