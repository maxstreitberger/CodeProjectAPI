import { idArg, queryField } from '@nexus/schema'

const allSurveysOfEvent = queryField('allSurveysOfEvent', {
  type: "Survey",
  nullable: false,
  list: true,
  args: {
    event_id: idArg({ required: true })
  },
  resolve(_root, args, { db }) {
    return db.surveys.findMany({
      where: {
        event_id: args.event_id
      }
    })
  }
})

const getSurvey = queryField('getSurvey', {
  type: "Survey",
  args: {
    survey_id: idArg({ required: true })
  },
  resolve(_root, args, { db }) {
    return db.surveys.findOne({
      where: {
        survey_id: args.survey_id 
      }
    })
  }
})

export const SurveyQueries = [getSurvey, allSurveysOfEvent]