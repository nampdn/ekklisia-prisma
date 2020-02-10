import { idArg, queryType, stringArg } from 'nexus'
import * as moment from 'moment'
import { getUserId } from '../utils'

export const Query = queryType({
  definition(t) {
    t.crud.profiles()
    t.crud.groups()
    t.crud.activities()
    t.crud.attendances()
    t.crud.schedules()

    t.list.field('scheduleThisWeek', {
      type: 'Schedule',
      nullable: false,
      list: true,
      resolve: async (parent, args, ctx) => {
        const userId = getUserId(ctx)
        const today = moment()
        const from_date = today.startOf('week')
        const to_date = today.endOf('week')
        const schedules = await ctx.prisma.schedule.findMany({
          where: {
            date: { lte: to_date.toString(), gte: from_date.toString() },
          },
        })
        return schedules
      },
    })

    t.list.field('membersInGroup', {
      type: 'Profile',
      nullable: false,
      resolve: async (parent, args, ctx) => {
        const userId = getUserId(ctx)

        const authUser = await ctx.prisma.user
          .findOne({
            where: { id: userId },
          })
          .profile()

        if (authUser) {
          const groups = await ctx.prisma.group.findMany({
            where: { leader: { id: authUser.id } },
          })
          if (groups[0]) {
            const profiles = await ctx.prisma.group
              .findOne({ where: { id: groups[0].id } })
              .members()
            return profiles
          }
        }
        return []
      },
    })

    // t.list.field('scheduleToday', {
    //   {type: 'Schedule',
    // nullable: false}
    // })

    t.field('me', {
      type: 'User',
      nullable: true,
      resolve: (parent, args, ctx) => {
        const userId = getUserId(ctx)
        return ctx.prisma.user.findOne({
          where: {
            id: userId,
          },
        })
      },
    })

    t.list.field('feed', {
      type: 'Post',
      resolve: (parent, args, ctx) => {
        return ctx.prisma.post.findMany({
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
        return ctx.prisma.post.findMany({
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
        return ctx.prisma.post.findOne({
          where: {
            id,
          },
        })
      },
    })
  },
})
