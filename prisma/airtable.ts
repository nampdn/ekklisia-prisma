import * as AirTable from 'airtable'
import * as dotenv from 'dotenv'

dotenv.config()

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

export const getAllProfiles = async () => {
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
              oldId: record.id + '$' + record.get('ID'),
              gender: record.get('gender'),
              phoneNumber: record.get('phone_number') || '',
              address: {
                street: record.get('address') || '',
                commune: record.get('ward') || '',
                district: record.get('district') || '',
              },
              job: record.get('job'),
              memberType: record.get('memberType'),
            }
            console.log(profile)
            // profileList.push(transformProfileToPrisma(profile))
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
;(async () => {
  await getAllProfiles()
})()
