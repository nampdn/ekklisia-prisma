import { idArg, queryType, stringArg } from 'nexus'
import { getUserId } from '../utils'

export const Query = queryType({
  definition(t) {
    t.crud.profiles()
    t.crud.groups()

    t.field('me', {
      type: 'User',
      nullable: true,
      resolve: (parent, args, ctx) => {
        const userId = getUserId(ctx)
        return ctx.photon.user.findOne({
          where: {
            id: userId,
          },
        })
      },
    })

    t.list.field('feed', {
      type: 'Post',
      resolve: (parent, args, ctx) => {
        return ctx.photon.post.findMany({
          where: { published: true },
        })
      },
    })

    t.list.field('filterPosts', {
      type: 'Post',
      args: {
        searchString: stringArg({ nullable: true }),
      },
      resolve: (parent, { searchString }, ctx) => {
        return ctx.photon.post.findMany({
          where: {
            OR: [
              {
                title: {
                  contains: searchString,
                },
              },
              {
                content: {
                  contains: searchString,
                },
              },
            ],
          },
        })
      },
    })

    t.field('post', {
      type: 'Post',
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.photon.post.findOne({
          where: {
            id,
          },
        })
      },
    })

    // t.field('groups', {
    //   type: 'Group',
    //   nullable: true,
    //   list: true,
    //   resolve: (parent, _, ctx) => {
    //     // return ctx.photon.group(_)
    //   },
    // })
  },
})
