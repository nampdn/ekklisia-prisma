import { rule, shield, not } from 'graphql-shield'
import { getUserId } from '../utils'

const rules = {
  isAuthenticatedUser: rule()((parent, args, context) => {
    const userId = getUserId(context)
    return Boolean(userId)
  }),
  isPostOwner: rule()(async (parent, { id }, context) => {
    const userId = getUserId(context)
    const author = await context.photon.posts
      .findOne({
        where: {
          id,
        },
      })
      .author()
    return userId === author.id
  }),
  allow: rule()(async (parent, { id }, context) => {
    console.log(id, context)
    return true
  }),
}

export const permissions = shield({
  Query: {
    activities: not(rules.isAuthenticatedUser),
    me: rules.isAuthenticatedUser,
    filterPosts: rules.isAuthenticatedUser,
    post: rules.isAuthenticatedUser,
    groups: rules.isAuthenticatedUser,
    profiles: rules.isAuthenticatedUser,
    scheduleUntilNow: rules.isAuthenticatedUser,
    attendances: rules.isAuthenticatedUser,
  },
  Mutation: {
    createDraft: rules.isAuthenticatedUser,
    deletePost: rules.isPostOwner,
    publish: rules.isPostOwner,
    login: not(rules.isAuthenticatedUser),
    signup: not(rules.isAuthenticatedUser),
    makeAttendance: rules.isAuthenticatedUser,
  },
})
