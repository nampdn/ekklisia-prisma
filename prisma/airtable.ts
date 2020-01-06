import * as AirTable from 'airtable'
import * as dotenv from 'dotenv'
import { Photon } from '@prisma/photon'

dotenv.config()

const photon = new Photon()

const API_KEY = process.env.AIRTABLE_API_KEY
const BASE_ID = process.env.AIRTABLE_BASE_ID

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
              fullName: record.get('fullName'),
              birthday: record.get('birthday') || '',
              joinDate: record.get('joinDate') || '',
              facebookId: record.get('facebookId') || '',
              oldId: record.id + '$' + record.get('ID') || 'new',
              gender: record.get('gender'),
              phoneNumber: record.get('phone_number') || '',
              // address: {
              //   street: record.get('address') || '',
              //   commune: record.get('ward') || '',
              //   district: record.get('district') || '',
              // },
              job: record.get('job'),
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

export const getGroups = async () => {
  return new Promise((resolve, reject) => {
    const groupList: any[] = []
    base('Group2020')
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
            }
            console.log(group)
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
;(async () => {
  const profiles = await getAllProfiles()
  console.log('Total profiles:', profiles.length)
  const orgs = await photon.orgs.findMany({ first: 1000 })
  console.log(`orgs: ${orgs[0].name}`)
  const org = orgs[0]
  for (const profile of profiles) {
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
  }
  // await getGroups()
})()
