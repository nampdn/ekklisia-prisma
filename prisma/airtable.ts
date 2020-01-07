import * as AirTable from 'airtable'
import * as dotenv from 'dotenv'
import { Photon } from '@prisma/photon'
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber'
import { changePhonePrefix } from 'vikit'

dotenv.config()

const photon = new Photon({ datasources: { db: process.env.DATABASE_URL } })

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
              facebookId: record.get('facebookId') || '',
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
  groupName: string = 'Group2019',
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

const seedProfile = async () => {
  const profiles = await getAllProfiles()
  console.log('Total profiles:', profiles.length)
  const orgs = await photon.orgs.findMany({ first: 1000 })
  console.log(`orgs: ${orgs[0].name}`)
  const org = orgs[0]
  for (const profile of profiles) {
    try {
      const newProfile = await photon.profiles.upsert({
        where: {
          oldId: profile.oldId,
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
  }
  // await getGroups()
}

const seedGroup = async () => {
  const groups = await getGroups()
  for (const group of groups) {
    const { id, name, year, leader: listLeader, members } = group
    const leader = listLeader[0]
    const groupData = {
      id,
      name,
      year,
    }
    try {
      console.log(`Creating Group: ${JSON.stringify(groupData, null, 2)}`)
      const newGroup = await photon.groups.upsert({
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
        },
      })
      if (newGroup) {
        console.log(`Upsert group ${newGroup.name} (${newGroup.year})`)
        try {
          const leaderProfile = await photon.profiles.findOne({
            where: { id: leader },
          })
          if (leaderProfile) {
            await photon.groups.update({
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
          const profile = await photon.profiles.findOne({
            where: { id: member },
          })
          if (profile) {
            const updatedGroup = await photon.groups.update({
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
  }
}

const main = async () => {
  console.log(process.env.DATABASE_URL)
  console.log('SEED: Profile')
  await seedProfile()
  console.log('SEED: Group')
  await seedGroup()
}

main()
