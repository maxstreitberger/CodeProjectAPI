import { objectType } from '@nexus/schema'

export const ShareAbleVote = objectType({
  name: "ShareAbleVote",
  definition(t) {
    t.date("voted_at")
    t.field("who_voted", {
      type: "User",
      resolve: async (root, _args, { db }) => {
        //@ts-ignore
        return root.user || (await db.votes.findOne({ where: { survey_id_user_id: { survey_id: root.survey_id, user_id: root.user_id } } }).user())
      }
    })
    t.field("survey", {
      type: "Survey",
      resolve: async (root, _args, { db }) => {
        //@ts-ignore
        return root.survey || (await db.votes.findOne({ where: { survey_id_user_id: { survey_id: root.survey_id, user_id: root.user_id } } }).survey())
      }
    })
  }
})

export const Vote = objectType({
  name: "Vote",
  definition(t) {
    t.date("voted_at")
    t.field("survey", {
      type: "Survey",
      resolve: async (root, _args, { db }) => {
        //@ts-ignore
        return root.survey || (await db.votes.findOne({ where: { survey_id_user_id: { survey_id: root.survey_id, user_id: root.user_id } } }).survey())
      }
    })
    t.field("answer", {
      type: "SurveyAnswer",
      
      resolve: async (root, _args, { db }) => {
        //@ts-ignore
        return root.answer || (await db.votes.findOne({ where: { survey_id_user_id: { survey_id: root.survey_id, user_id: root.user_id } } }).answer())
      }
    })
  }
})