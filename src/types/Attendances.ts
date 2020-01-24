import { objectType } from 'nexus'

export const Attendance = objectType({
  name: 'Attendance',
  definition(t) {
    t.model.id()
    t.model.member()
    t.model.schedule()
    t.model.status()
    t.model.present()
    t.model.createdAt()
  },
})
