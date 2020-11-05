import { idArg, queryField } from '@nexus/schema'

const allSurveyAnswers = queryField('allSurveyAnswers', {
  type: "SurveyAnswer",
  nullable: false,
  list: true,
  resolve(_root, _args, { db }) {
    return db.surveyAnswer.findMany()
  }
})

const getSurveyAnswer = queryField('getSurveyAnswer', {
  type: "SurveyAnswer",
  args: {
    answer_id: idArg({ required: true })
  },
  resolve(_root, args, { db }) {
    return db.surveyAnswer.findOne({
      where: {
        answer_id: args.answer_id
      }
    })
  }
})

const getAllAnswersFromOneSurvey = queryField('getAllAnswersFromOneSurvey', {
  type: "SurveyAnswer",
  nullable: true,
  list: true,
  args: {
    survey_id: idArg({ required: true })
  },
  resolve(_root, args, { db }){
    return db.surveyAnswer.findMany({
      where: {
        survey_id: args.survey_id
      }
    })
  }
})

export const SurveyAnswerQueries = [allSurveyAnswers, getSurveyAnswer, getAllAnswersFromOneSurvey]