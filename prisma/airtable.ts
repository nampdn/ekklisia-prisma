import * as AirTable from 'airtable'
import * as dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber'
import { changePhonePrefix } from 'vikit'

dotenv.config()

const btngdOrg = { name: 'BTN Gia Định', id: 'ck62yb3wol0kh0834gcu6n0ei' }

const photon = new PrismaClient({
  datasources: { db: process.env.DATABASE_URL },
})

const API_KEY = process.env.AIRTABLE_API_KEY
const BASE_ID = process.env.AIRTABLE_BASE_ID

export const formatPhoneNumber = (phoneNumber: string) => {
  const phoneUtil = PhoneNumberUtil.getInstance()
  const number = phoneUtil.parseAndKeepRawInput(phoneNumber, 'VN')
  const formattedNumber = phoneUtil.format(number, PhoneNumberFormat.E164)
  return formattedNumber
}

export const isPhoneValid = (phoneNumber: string, country = 'VN') => {
  const phoneUtil = PhoneNumberUtil.getInstance()
  const number = phoneUtil.parseAndKeepRawInput(phoneNumber, country)
  return phoneUtil.isValidNumber(number)
}

const correctPhoneNumber = (phoneNumber: string) => {
  if (phoneNumber) {
    const newPhone = changePhonePrefix(phoneNumber)
    const isValidPhone = isPhoneValid(newPhone)
    if (isValidPhone) {
      return formatPhoneNumber(newPhone)
    }
    return null
  }
  return null
}

if (API_KEY && BASE_ID) {
  console.log(`AIRTABLE API KEY: ${API_KEY} - BASE ID: ${BASE_ID}`)
} else {
  console.error(
    `PLEASE SPECIFY ENVIRONMENT VARIABLES: AIRTABLE_API_KEY, AIRTABLE_BASE_ID`,
  )
  console.log(`AIRTABLE API KEY: ${API_KEY} - BASE ID: ${BASE_ID}`)
}

const AT = AirTable as any
AT.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: API_KEY,
})

export const base = AT.base(BASE_ID)

export const getAllProfiles = async (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const profileList: any[] = []
    base('Profile')
      .select({
        maxRecords: 1000,
        pageSize: 100,
        view: 'Danh sách đầy đủ',
      })
      .eachPage(
        function page(records: any, fetchNextPage: () => void) {
          records.forEach((record: any) => {
            const profile = {
              id: record.id,
              fullName: record.get('fullName').replace('  ', ' '),
              birthday: record.get('birthday') || '',
              joinDate: record.get('joinDate') || '',
              facebookId: (record.get('facebookId') || '').trim(),
              oldId: record.id + '$' + record.get('ID') || 'new',
              gender: record.get('gender'),
              phoneNumber: correctPhoneNumber(record.get('phoneNumber')) || '',
              // address: {
              //   street: record.get('address') || '',
              //   commune: record.get('ward') || '',
              //   district: record.get('district') || '',
              // },
              // job: record.get('job'),
              // memberType: record.get('memberType'),
            }

            profile.fullName = profile.fullName.trim()

            profile.birthday = profile.birthday
              ? new Date(profile.birthday)
              : null
            profile.joinDate = profile.joinDate
              ? new Date(profile.joinDate)
              : null
            profileList.push(profile)
          })
          fetchNextPage()
        },
        function done(err: any) {
          if (err) {
            console.error(err)
            reject(err)
          } else {
            resolve(profileList)
          }
        },
      )
  })
}

export const getGroups = async (
  groupName: string = 'Group2020',
): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const groupList: any[] = []
    base(groupName)
      .select({
        maxRecords: 1000,
        pageSize: 100,
        view: 'Grid view',
      })
      .eachPage(
        function page(records: any, fetchNextPage: () => void) {
          records.forEach((record: any) => {
            const group = {
              id: record.id,
              name: record.get('name'),
              leader: record.get('leader'),
              members: record.get('members'),
              year: record.get('year'),
            }
            groupList.push(group)
          })
          fetchNextPage()
        },
        function done(err: any) {
          if (err) {
            console.error(err)
            reject(err)
          } else {
            resolve(groupList)
          }
        },
      )
  })
}

export const getActivity = async (
  groupName: string = 'Activity',
): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const groupList: any[] = []
    base(groupName)
      .select({
        maxRecords: 1000,
        pageSize: 100,
        view: 'Grid view',
      })
      .eachPage(
        function page(records: any, fetchNextPage: () => void) {
          records.forEach((record: any) => {
            const activity = {
              id: record.id,
              name: record.get('name'),
              slug: record.get('slug'),
            }
            groupList.push(activity)
          })
          fetchNextPage()
        },
        function done(err: any) {
          if (err) {
            console.error(err)
            reject(err)
          } else {
            resolve(groupList)
          }
        },
      )
  })
}

export const getSchedule = async (
  groupName: string = 'Schedule',
): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const scheduleList: any[] = []
    base(groupName)
      .select({
        maxRecords: 1000,
        pageSize: 100,
        view: 'Grid view',
      })
      .eachPage(
        function page(records: any, fetchNextPage: () => void) {
          records.forEach((record: any) => {
            const schedule = {
              id: record.id,
              no: record.get('no'),
              autoNumber: record.get('autoNumber'),
              activity: record.get('activity'),
              weekNumber: record.get('weekNumber'),
              date: record.get('date'),
            }
            scheduleList.push(schedule)
          })
          fetchNextPage()
        },
        function done(err: any) {
          if (err) {
            console.error(err)
            reject(err)
          } else {
            resolve(scheduleList)
          }
        },
      )
  })
}

// SEED

const seedProfile = async () => {
  console.log('SEED: Profile')
  const profiles = await getAllProfiles()
  console.log('Total profiles:', profiles.length)
  const orgs = await photon.org.findMany({ first: 1000 })
  console.log(`orgs: ${orgs[0].name}`)
  const org = orgs[0]
  const all = profiles.map(async profile => {
    try {
      const newProfile = await photon.profile.upsert({
        where: {
          id: profile.id,
          // oldId: profile.oldId,
        },
        create: {
          ...profile,
          org: { connect: { id: org.id } },
        },
        update: {
          ...profile,
          org: { connect: { id: org.id } },
        },
      })
      console.log('created profile', newProfile)
    } catch (err) {
      console.log('Profile dupplicated', profile.name, err.message)
    }
  })
  await Promise.all(all)
  console.log('[Completed] Seed Profile')
  // await getGroups()
}

const seedGroup = async () => {
  console.log('SEED: Group')
  const groups = await getGroups()
  const all = groups.map(async group => {
    const { id, name, year, leader: listLeader, members } = group
    const leader = listLeader[0]
    const groupData = {
      id,
      name,
      year,
    }
    try {
      console.log(`Creating Group: ${JSON.stringify(groupData, null, 2)}`)
      const newGroup = await photon.group.upsert({
        where: { id },
        update: {
          id,
          name,
          year,
        },
        create: {
          id,
          name,
          year,
          stage: 'forming',
        },
      })
      if (newGroup) {
        console.log(`Upserted group ${newGroup.name} (${newGroup.year})`)
        try {
          const leaderProfile = await photon.profile.findOne({
            where: { id: leader },
          })
          if (leaderProfile) {
            await photon.group.update({
              where: { id: newGroup.id },
              data: { leader: { connect: { id: leader } } },
            })
          } else {
            console.warn(`Not found leader profile: ${leader}`)
          }
        } catch (err) {
          console.error(`Not found leader`)
        }
        for (const member of members) {
          const profile = await photon.profile.findOne({
            where: { id: member },
          })
          if (profile) {
            const updatedGroup = await photon.group.update({
              where: { id },
              data: { members: { connect: { id: member } } },
            })
            console.log(
              `Connected member ${profile.fullName} to group ${updatedGroup.name}`,
            )
          } else {
            console.warn(
              `Not found member id ${member} in database, check it again!`,
            )
          }
        }
      }
    } catch (err) {
      console.error(err)
    }
  })
  await Promise.all(all)
  console.log('Done!')
}

export const seedActivity = async () => {
  console.log('SEEDING: Activity')
  const org = await photon.org.upsert({
    where: { id: btngdOrg.id },
    create: btngdOrg,
    update: btngdOrg,
  })
  const activities = await getActivity()
  for (const activity of activities) {
    const { id, name, slug } = activity
    const data = { id, name, slug, org: { connect: { id: org.id } } }
    try {
      const newActivity = await photon.activity.upsert({
        where: { id },
        create: data,
        update: data,
      })
      console.log(`Upsert activity: ${newActivity.name}`)
    } catch (err) {
      console.error(err.message)
    }
  }
}

const seedSchedule = async () => {
  console.log('SEEDING: Schedule')
  const scheduleList = await getSchedule()
  for (const schedule of scheduleList) {
    const {
      id,
      activity: [actId],
      date,
    } = schedule
    try {
      const newSchedule = await photon.schedule.upsert({
        where: { id },
        create: { id, activity: { connect: { id: actId } }, date },
        update: { id, activity: { connect: { id: actId } }, date },
      })
      console.log(`Upsert schedule: ${newSchedule.date}`)
    } catch (err) {
      console.error(`Upsert schedule error: ${err.message}`)
    }
  }
}

const main = async () => {
  console.log(process.env.DATABASE_URL)
  await seedActivity()
  // await seedSchedule()
  // await seedProfile()
  // await seedGroup()
}

main()
