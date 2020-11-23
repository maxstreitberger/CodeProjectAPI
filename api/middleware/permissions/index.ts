import { shield } from 'graphql-shield'
import { EventMutationPermissions, EventQueryPermissions } from '../../types/events/event.permissions'
import { UserMutationPermissions, UserQueryPermissions } from '../../types/users/user.permissions'
import { GuestMutationPermissions, GuestQueryPermissions } from '../../types/guests/guest.permissions'
import { EventTaskMutationPermissions, EventTaskQueryPermissions } from '../../types/event_tasks/event_task.permissions'
import { PrivateTaskMutationPermissions, PrivateTaskQueryPermissions } from '../../types/private_tasks/private_task.permissions'
import { FriendMutationPermissions, FriendQueryPermissions } from '../../types/friends/friend.permissions'
import { SurveyMutationPermissions, SurveyQueryPermissions } from '../../types/surveys/survey.permissions'
import { SurveyAnswerMutationPermissions, SurveyAnswerQueryPermissions } from '../../types/survey_answers/survey_answer.permissions'
import { CityMutationPermissions, CityQueryPermissions } from '../../types/cities/city.permissions'

export const permissions = shield({
  Query: {
    ...EventQueryPermissions,
    ...UserQueryPermissions,
    ...GuestQueryPermissions,
    ...EventTaskQueryPermissions,
    ...PrivateTaskQueryPermissions,
    ...FriendQueryPermissions,
    ...SurveyQueryPermissions,
    ...SurveyAnswerQueryPermissions,
    ...CityQueryPermissions
  },

  Mutation: {
    ...EventMutationPermissions,
    ...UserMutationPermissions,
    ...GuestMutationPermissions,
    ...EventTaskMutationPermissions,
    ...PrivateTaskMutationPermissions,
    ...FriendMutationPermissions,
    ...SurveyMutationPermissions,
    ...SurveyAnswerMutationPermissions,
    ...CityMutationPermissions
  },
}, {
  allowExternalErrors: true
})