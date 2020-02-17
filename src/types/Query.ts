import { idArg, queryType, stringArg } from 'nexus'
import * as moment from 'moment'
import { getUserId } from '../utils'

export const Query = queryType({
  definition(t) {
    t.crud.profiles()
    t.crud.groups()
    t.crud.profile()
    t.crud.activities()
    t.crud.schedules()

    t.crud.attendance()
    t.crud.attendances()

    t.list.field('scheduleUntilNow', {
      type: 'Schedule',
      nullable: false,
      resolve: async (parent, args, ctx) => {
        const today = moment()
        const to_date = today.endOf('week')
        const schedules = await ctx.prisma.schedule.findMany({
          where: {
            date: { lte: to_date.toDate() },
          },
          orderBy: { date: 'desc' },
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
              .members({ orderBy: { fullName: 'asc' } })
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
