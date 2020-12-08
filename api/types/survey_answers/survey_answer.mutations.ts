import { idArg, mutationField, stringArg } from '@nexus/schema'
import xss from 'xss';

const createAnswer = mutationField('createAnswer', {
  type: "SurveyAnswer",
  args: {
    survey_id: idArg({ required: true }),
    title: stringArg({ required: true })
  },
  resolve(_root, args, { db }) {
    const title = xss(args.title);

    return db.survey_answers.create({
      data: {
        title: title,
        survey: {
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
    const title = xss(args.newTitle);

    return db.survey_answers.update({
      where: {
        answer_id: args.answer_id
      },

      data: {
        title: title
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