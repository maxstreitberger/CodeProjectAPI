import { idArg, queryField } from '@nexus/schema'

const getSurveyVotes = queryField('getSurveyVotes', {
  type: "ShareAbleVote",
  list: true,
  nullable: false,
  args: {
    survey_id: idArg({ required: true })
  },
  resolve(_root, args, { db }) {
    return db.votes.findMany({ 
      where: { 
        survey_id: args.survey_id
      } 
    })
  }
})

const myVotes = queryField('myVotes', {
  type: "Vote",
  list: true,
  nullable: false,
  resolve(_root, _args, { db, user }) {
    return db.votes.findMany({
      where: {
        user_id: user.user_id
      }
    })
  }
})

export const VoteQueries = [getSurveyVotes, myVotes]