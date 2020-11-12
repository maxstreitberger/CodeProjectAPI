import { rules } from '../../middleware/permissions/rules'
import { createRateLimitRule, RedisStore } from 'graphql-rate-limit';
import * as redis from 'redis'
import { and } from 'graphql-shield';

const createEventRateLimitRule = createRateLimitRule({ 
  identifyContext: (ctx) => ctx.req.ip, 
  formatError: () => `Hey there, you are doing way too much`,
  store: new RedisStore(redis.createClient(6379, 'redis'))
});

export const EventQueryPermissions = {
  allEvents: rules.isAuthenticated,
  getEvent: rules.isAuthenticated,
} 

export const EventMutationPermissions = {
  createEvent: and(rules.isAuthenticated, createEventRateLimitRule({ window: "3m", max: 3 })),
  updateEvent: rules.isAuthenticated,
  deleteEvent: rules.isAuthenticated,
}