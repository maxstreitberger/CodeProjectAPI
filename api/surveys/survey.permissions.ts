import { rules } from '../middleware/permissions/rules'
import { createRateLimitRule, RedisStore } from 'graphql-rate-limit';
import redis from 'redis'
import { and } from 'graphql-shield';

const createSurveyRateLimitRule = createRateLimitRule({ 
  identifyContext: (ctx) => ctx.req.ip, 
  formatError: () => `Hey there, you are doing way too much`,
  store: new RedisStore(redis.createClient())
});

export const SurveyQueryPermissions = {
  allSurveys: rules.isAdmin,
  getSurvey: rules.isAuthenticated
} 

export const SurveyMutationPermissions = {
  createSurvey: and(rules.isAuthenticated, createSurveyRateLimitRule({ window: "3m", max: 20 })),
  updateSurvey: rules.isAuthenticated,
  deleteSurvey: rules.isAuthenticated
}