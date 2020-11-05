import { idArg, queryField } from '@nexus/schema'

const allSurveys = queryField('allSurveys', {
  type: "Survey",
  nullable: false,
  list: true,
  resolve(_root, _args, { db }) {
    return db.survey.findMany()
  }
})

const getSurvey = queryField('getSurvey', {
  type: "Survey",
  args: {
    survey_id: idArg({ required: true })
  },
  resolve(_root, args, { db }) {
    return db.survey.findOne({
      where: {
        survey_id: args.survey_id 
      }
    })
  }
})

export const SurveyQueries = [allSurveys, getSurvey]