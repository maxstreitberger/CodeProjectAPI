import { idArg, mutationField, stringArg } from '@nexus/schema'
import { AuthenticationError } from 'apollo-server'
import xss from 'xss';

const createSurvey = mutationField('createSurvey', {
  type: "Survey",
  args: {
    event_id: idArg({ required: true }),
    question: stringArg({ required: true })
  },
  resolve: async(_root, args, { db, user }) => {
    const question = xss(args.question);

    const user_events = await db.events.findMany({
      where: {
        host_id: user.user_id
      }
    })
    
    const isInList = Boolean(user_events.find(event => event.event_id == args.event_id))

    if (isInList) {
      return db.surveys.create({
        data: {
          question: question,
          event: {
            connect: {
              event_id: args.event_id
            }
          }
        }
      })
    } else {
      throw new AuthenticationError("You are not allowed to do this")
    }
  }
})

const updateSurvey = mutationField('updateSurvey', {
  type: "Survey",
  args: {
    survey_id: idArg({ required: true }),
    newQuestion: stringArg({ required: true })
  },
  resolve: async(_root, args, { db, user }) => {
    const question = xss(args.newQuestion);

    const user_events = await db.events.findMany({
      where: {
        host_id: user.user_id
      }
    })

    const survey = await db.surveys.findOne({
      where: {
        survey_id: args.survey_id
      }
    })
    
    const isInList = Boolean(user_events.find(event => event.event_id == survey?.event_id))
    if (isInList) {
      return db.surveys.update({
        where: {
          survey_id: args.survey_id
        },
        data: {
          question: question
        }
      })
    } else {
      throw new AuthenticationError("You are not allowed to do this")
    }
  }
})

const deleteSurvey = mutationField('deleteSurvey', {
  type: "Survey",
  args: {
    survey_id: idArg({ required: true }),
  },
  resolve: async(_root, args, { db, user }) => {
    const user_events = await db.events.findMany({
      where: {
        host_id: user.user_id
      }
    })

    const survey = await db.surveys.findOne({
      where: {
        survey_id: args.survey_id
      }
    })
    
    const isInList = Boolean(user_events.find(event => event.event_id == survey?.event_id))

    if (isInList) {
      return db.surveys.delete({
        where: {
          survey_id: args.survey_id
        }
      })
    } else {
      throw new AuthenticationError("You are not allowed to do this")
    }
  }
})

export const SurveyMutations = [createSurvey, updateSurvey, deleteSurvey]