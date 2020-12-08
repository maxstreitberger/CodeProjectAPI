import { idArg, mutationField } from '@nexus/schema'

const vote = mutationField('vote', {
  type: "Vote",
  args: {
    survey_id: idArg({ required: true }),
    answer_id: idArg({ required: true })
  },
  resolve(_root, args, { db, user }) {
    return db.votes.create({
      data: {
        answer: {
          connect: {
            answer_id: args.answer_id
          }
        },
        survey: {
          connect: {
            survey_id: args.survey_id
          }
        },
        who_voted: {
          connect: {
            user_id: user.user_id
          }
        }
      }
    })
  }
})

const deleteVote = mutationField('deleteVote', {
  type: "Vote",
  args: {
    survey_id: idArg({ required: true }),
  },
  resolve(_root, args, { db, user }) {
    return db.votes.delete({
      where: {
        survey_id_user_id: {
          survey_id: args.survey_id,
          user_id: user.user_id
        }
      }
    })
  }
})

export const VoteMutations = [vote, deleteVote]