import { idArg, mutationField, stringArg } from '@nexus/schema'

const createAnswer = mutationField('createAnswer', {
  type: "SurveyAnswer",
  args: {
    survey_id: idArg({ required: true }),
    answer: stringArg({ required: true })
  },
  resolve(_root, args, { db }) {
    return db.survey_answers.create({
      data: {
        answer: args.answer,
        surveys: {
          connect: {
            survey_id: args.survey_id
          }
        }
      }
    })
  }
})

const updateAnswer = mutationField('updateAnswer', {
  type: "SurveyAnswer",
  args: {
    answer_id: idArg({ required: true }),
    newTitle: stringArg({ required: true })
  },
  resolve(_root, args, { db }) {
    return db.survey_answers.update({
      where: {
        answer_id: args.answer_id
      },

      data: {
        answer: args.newTitle
      }
    })
  }
})

const deleteAnswer = mutationField('deleteAnswer', {
  type: "SurveyAnswer",
  args: {
    answer_id: idArg({ required: true })
  },
  resolve(_root, args, { db }) {
    return db.survey_answers.delete({
      where: {
        answer_id: args.answer_id
      }
    })
  }
})

export const SurveyAnswerMutations = [createAnswer, updateAnswer, deleteAnswer]