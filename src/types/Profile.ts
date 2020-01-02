import { objectType } from 'nexus'

export const Profile = objectType({
  name: 'Profile',
  definition(t) {
    t.model.id()
    t.model.fullName()
    t.model.email()
    t.model.group()
  },
})
