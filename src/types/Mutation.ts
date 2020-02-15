import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { idArg, mutationType, stringArg } from 'nexus'
import { APP_SECRET, getUserId, getGroupsByUser } from '../utils'
import { createLexer } from 'graphql'
import { PrismaClient } from '@prisma/client'

export const Mutation = mutationType({
  definition(t) {
    t.crud.createOneProfile({ alias: 'createProfile' })
    t.crud.createOneGroup({ alias: 'createGroup' })

    t.field('signup', {
      type: 'AuthPayload',
      args: {
        name: stringArg(),
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
      },
      resolve: async (_parent, { name, email, password }, ctx) => {
        const hashedPassword = await hash(password, 10)
        const user = await ctx.prisma.user.create({
          data: {
            name,
            email,
            permission: 0,
            password: hashedPassword,
          },
        })
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
      },
      resolve: async (_parent, { email, password }, context) => {
        const user = await context.prisma.user.findOne({
          where: {
            email,
          },
        })
        if (!user) {
          throw new Error(`No user found for email: ${email}`)
        }
        const passwordValid = await compare(password, user.password)
        if (!passwordValid) {
          throw new Error('Invalid password')
        }
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

    t.field('createDraft', {
      type: 'Post',
      args: {
        title: stringArg({ nullable: false }),
        content: stringArg(),
      },
      resolve: (parent, { title, content }, ctx) => {
        const userId = getUserId(ctx)
        return ctx.prisma.post.create({
          data: {
            title,
            content,
            published: false,
            author: { connect: { id: userId } },
          },
        })
      },
    })

    t.field('deletePost', {
      type: 'Post',
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.prisma.post.delete({
          where: {
            id,
          },
        })
      },
    })

    t.field('publish', {
      type: 'Post',
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.prisma.post.update({
          where: { id },
          data: { published: true },
        })
      },
    })

    t.field('makeAttendance', {
      type: 'Attendance',
      args: {
        scheduleId: idArg({ required: true }),
        attendees: idArg({ list: true, required: true }),
        absentees: idArg({ list: true }),
      },
      resolve: async (parent, { scheduleId, attendees, absentees }, ctx) => {
        const groups = await getGroupsByUser(ctx)
        if (groups.length < 1) {
          throw new Error(
            'Có lỗi liên quan đến nhóm, vui lòng thử thoát ra và đăng nhập lại!',
          )
        }

        const schedule = await ctx.prisma.schedule.findOne({
          where: { id: scheduleId },
        })
        if (!schedule)
          throw new Error(
            'Không tìm thấy lịch cho phần điểm danh này, vui lòng kiểm tra lại!',
          )

        try {
          const currentGroup = groups[0]
          const slug = `${schedule.id}$${currentGroup.id}`
          const data = {
            slug,
            group: { connect: { id: currentGroup.id } },
            schedule: { connect: { id: schedule.id } },
            attendees: {
              connect: (attendees || []).map((attendeeId: string) => ({
                id: attendeeId,
              })),
            },
            absentees: {
              connect: (absentees || []).map((absenteeId: string) => ({
                id: absenteeId,
              })),
            },
            status: 'done',
          }
          console.log(JSON.stringify(data, null, 2))
          return await ctx.prisma.attendance.upsert({
            where: { slug },
            create: data,
            update: data,
          })
        } catch (err) {
          throw new Error(
            'Không thể điểm danh ngay lúc này, vui lòng liên hệ người hỗ trợ kĩ thuật để được hỗ trợ!',
          )
        }
      },
    })
  },
})
