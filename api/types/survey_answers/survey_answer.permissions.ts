import { rules } from '../../middleware/permissions/rules'
import { createRateLimitRule, RedisStore } from 'graphql-rate-limit';
import * as redis from 'redis'
import { and } from 'graphql-shield';

const createAnswerRateLimitRule = createRateLimitRule({ 
  identifyContext: (ctx) => ctx.req.ip, 
  formatError: () => `Hey there, you are doing way too much`,
  store: new RedisStore(redis.createClient(6379, 'redis'))
});

export const SurveyAnswerQueryPermissions = {
  allSurveyAnswers: rules.isAdmin,
  getSurveyAnswer: rules.isAuthenticated,
  getAllAnswersFromOneSurvey: rules.isAuthenticated
} 

export const SurveyAnswerMutationPermissions = {
  createAnswer: and(rules.isAuthenticated, createAnswerRateLimitRule({ window: "3m", max: 20 })),
  updateAnswer: rules.isAuthenticated,
  deleteAnswer: rules.isAuthenticated,
}