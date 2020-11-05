import { idArg, queryField } from '@nexus/schema'

const allVotes = queryField('allVotes', {
  type: "Vote",
  list: true,
  nullable: false,
  resolve(_root, args, { db }) {
    return db.vote.findMany()
  }
})

const getSurveyVotes = queryField('getSurveyVotes', {
  type: "Vote",
  list: true,
  nullable: false,
  args: {
    survey_id: idArg({ required: true })
  },
  resolve(_root, args, { db }) {
    return db.vote.findMany({ 
      where: { 
        survey_id: args.survey_id
      } 
    })
  }
})

export const VoteQueries = [allVotes, getSurveyVotes]