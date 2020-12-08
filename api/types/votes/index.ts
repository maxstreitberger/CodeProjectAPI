import { Vote, ShareAbleVote } from './vote.type'
import { VoteQueries } from './vote.queries'
import { VoteMutations } from './vote.mutations'

export const VoteSchema = [Vote, ShareAbleVote, VoteMutations, VoteQueries]