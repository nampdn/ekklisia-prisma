import { Photon } from '@prisma/photon'
const photon = new Photon()

async function main() {
  await photon.posts.deleteMany({
    where: { title: 'Watch the talks from Prisma Day 2019' },
  })
  await photon.posts.deleteMany({
    where: { title: 'Subscribe to GraphQL Weekly for community news' },
  })
  await photon.posts.deleteMany({
    where: { title: 'Follow Prisma on Twitter' },
  })
  await photon.users.deleteMany({ where: { name: 'Alice' } })
  await photon.users.deleteMany({ where: { name: 'Bob' } })
  const user1 = await photon.users.create({
    data: {
      email: 'alice@prisma.io',
      name: 'Alice',
      password: '$2b$10$ZjONRZAxqX2pLoPax2xdcuzABTUEsFanQI6yBYCRtzpRiU4/X1uIu', // "graphql"
      posts: {
        create: {
          title: 'Watch the talks from Prisma Day 2019',
          content: 'https://www.prisma.io/blog/z11sg6ipb3i1/',
          published: true,
        },
      },
      profile: {
        create: {
          fullName: 'Alice',
          gender: 'male',
        },
      },
    },
  })
  const user2 = await photon.users.create({
    data: {
      email: 'bob@prisma.io',
      name: 'Bob',
      password: '$2b$10$o6KioO.taArzboM44Ig85O3ZFZYZpR3XD7mI8T29eP4znU/.xyJbW', // "secret43"
      posts: {
        create: [
          {
            title: 'Subscribe to GraphQL Weekly for community news',
            content: 'https://graphqlweekly.com/',
            published: true,
          },
          {
            title: 'Follow Prisma on Twitter',
            content: 'https://twitter.com/prisma/',
            published: false,
          },
        ],
      },
      profile: {
        create: {
          fullName: 'Bob',
          gender: 'female',
        },
      },
    },
  })
  console.log({ user1, user2 })
}

main().finally(async () => {
  await photon.disconnect()
})
