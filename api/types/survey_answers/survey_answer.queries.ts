import { idArg, queryField } from '@nexus/schema'

const getSurveyAnswer = queryField('getSurveyAnswer', {
  type: "SurveyAnswer",
  args: {
    answer_id: idArg({ required: true })
  },
  resolve(_root, args, { db }) {
    return db.survey_answers.findOne({
      where: {
        answer_id: args.answer_id
      }
    })
  }
})

const allAnswersOfSurvey = queryField('allAnswersOfSurvey', {
  type: "SurveyAnswer",
  nullable: true,
  list: true,
  args: {
    survey_id: idArg({ required: true })
  },
  resolve(_root, args, { db }){
    return db.survey_answers.findMany({
      where: {
        survey_id: args.survey_id
      }
    })
  }
})

export const SurveyAnswerQueries = [getSurveyAnswer, allAnswersOfSurvey]