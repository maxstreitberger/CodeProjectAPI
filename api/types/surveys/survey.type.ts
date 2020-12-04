import { objectType } from '@nexus/schema'

export const Survey = objectType({
  name: "Survey",
  definition(t) {
    t.string("survey_id")
    t.string("question")
    t.field("event", {
      type: "Event",
      resolve: async (root, _args, { db }) => {
        //@ts-ignore
        return root.event || (await db.surveys.findOne({ where: { survey_id: root.survey_id } }).event())
      }
    })
    t.field("answers", {
      type: "SurveyAnswer",
      list: true,
      resolve: async (root, _args, { db }) => {
        //@ts-ignore
        return root.answers || (await db.surveys.findOne({ where: { survey_id: root.survey_id } }).answers())
      }
    })
  }
})