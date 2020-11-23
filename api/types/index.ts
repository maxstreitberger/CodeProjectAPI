import { EventSchema } from './events'
import { UserSchema } from './users'
import { GuestSchema } from './guests'
import { EventTaskSchema } from './event_tasks'
import { PrivateTaskSchema } from './private_tasks'
import { FriendSchema } from './friends'
import { SurveySchema } from './surveys'
import { SurveyAnswerSchema } from './survey_answers'
import { VoteSchema } from './votes'
import { CitySchema } from './cities'
import { CountrySchema } from './countries'

export const types = [
  EventSchema,
  UserSchema,
  GuestSchema,
  EventTaskSchema,
  PrivateTaskSchema,
  FriendSchema,
  SurveySchema,
  SurveyAnswerSchema,
  VoteSchema,
  CitySchema,
  CountrySchema
]