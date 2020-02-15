import { verify } from 'jsonwebtoken'
import { Context } from './context'

export const APP_SECRET = 'appsecret321'

interface Token {
  userId: string
}

export function getUserId(context: Context) {
  const Authorization = context.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const verifiedToken = verify(token, APP_SECRET) as Token
    return verifiedToken && verifiedToken.userId
  }
}

export async function getAuthProfile(ctx: Context) {
  const id = getUserId(ctx)
  const user = await ctx.prisma.user.findOne({
    where: { id },
    select: { profile: true },
  })
  return 'profile' in user! ? user!.profile : null
}

export async function getGroupsByUser(
  ctx: Context,
  year = new Date().getFullYear(),
) {
  const profile = await getAuthProfile(ctx)
  const groups = await ctx.prisma.group.findMany({
    where: { members: { some: { id: profile?.id } }, year },
  })
  return groups
}
