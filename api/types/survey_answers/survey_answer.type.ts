import { objectType } from '@nexus/schema'

export const SurveyAnswer = objectType({
  name: "SurveyAnswer",
  definition(t) {
    t.string("answer_id")
    t.string("title")
    t.field("survey", {
      type: "Survey",
      resolve: async (root, _args, { db }) => {
        //@ts-ignore
        return root.survey || (await db.survey_answers.findOne({ where: { answer_id: root.answer_id } }).survey())
      }
    })
    t.field("likes", {
      type: "Int",
      resolve: async (root, _args, { db }) => {
        //@ts-ignore
        const allVotes = await db.survey_answers.findOne({ where: { answer_id: root.answer_id } }).votes()
        return allVotes.length
      }
    })
  }
})