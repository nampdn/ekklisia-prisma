import { objectType } from 'nexus'

export const Activity = objectType({
  name: 'Activity',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.slug()
    t.model.schedules()
  },
})
