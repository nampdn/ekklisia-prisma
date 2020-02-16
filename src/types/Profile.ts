import { objectType } from 'nexus'

export const Profile = objectType({
  name: 'Profile',
  definition(t) {
    t.model.id()
    t.model.fullName()
    t.model.facebookId()
    t.model.oldId()
    t.model.joinDate()
    t.model.birthday()
    t.model.gender()
    t.model.email()
    t.model.phoneNumber()
    t.model.absentee()
    t.model.attendee()
  },
})
