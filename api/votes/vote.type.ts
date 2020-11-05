import { objectType } from '@nexus/schema'

export const Vote = objectType({
  name: "Vote",
  definition(t) {
    t.field("user", {
      type: "User",
      resolve: async (root, _args, { db }) => {
        //@ts-ignore
        return root.user || (await db.vote.findOne({ where: { survey_id_user_id: { survey_id: root.survey_id, user_id: root.user_id } } }).user())
      }
    })
    t.field("survey", {
      type: "Survey",
      resolve: async (root, _args, { db }) => {
        //@ts-ignore
        return root.survey || (await db.vote.findOne({ where: { survey_id_user_id: { survey_id: root.survey_id, user_id: root.user_id } } }).survey())
      }
    })
    // t.field("answer", {
    //   type: "SurveyAnswer",
      
    //   resolve: async (root, _args, { db }) => {
    //     //@ts-ignore
    //     return root.answer || (await db.vote.findOne({ where: { survey_id_user_id: { survey_id: root.survey_id, user_id: root.user_id } } }).answer())
    //   }
    // })
  }
})