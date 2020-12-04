import { idArg, mutationField, stringArg } from '@nexus/schema'

const createSurvey = mutationField('createSurvey', {
  type: "Survey",
  args: {
    event_id: idArg({ required: true }),
    question: stringArg({ required: true })
  },
  resolve(_root, args, { db }) {
    return db.surveys.create({
      data: {
        question: args.question,
        event: {
          connect: {
            event_id: args.event_id
          }
        }
      }
    })
  }
})

const updateSurvey = mutationField('updateSurvey', {
  type: "Survey",
  args: {
    survey_id: idArg({ required: true }),
    newQuestion: stringArg({ required: true })
  },
  resolve(_root, args, { db }) {
    return db.surveys.update({
      where: {
        survey_id: args.survey_id
      },
      data: {
        question: args.newQuestion
      }
    })
  }
})

const deleteSurvey = mutationField('deleteSurvey', {
  type: "Survey",
  args: {
    survey_id: idArg({ required: true }),
  },
  resolve(_root, args, { db }) {
    return db.surveys.delete({
      where: {
        survey_id: args.survey_id
      }
    })
  }
})

export const SurveyMutations = [createSurvey, updateSurvey, deleteSurvey]