import { idArg, mutationField } from '@nexus/schema'

const createVote = mutationField('createVote', {
  type: "Vote",
  args: {
    survey_id: idArg({ required: true }),
    answer_id: idArg({ required: true })
  },
  resolve(_root, args, { db, user }) {
    return db.vote.create({
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
        user: {
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
    return db.vote.delete({
      where: {
        survey_id_user_id: {
          survey_id: args.survey_id,
          user_id: user.user_id
        }
      }
    })
  }
})

export const VoteMutations = [createVote, deleteVote]