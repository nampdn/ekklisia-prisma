import { objectType } from 'nexus'

export const Schedule = objectType({
  name: 'Schedule',
  definition(t) {
    t.model.id()
    t.model.date()
    t.model.activity()
  },
})
