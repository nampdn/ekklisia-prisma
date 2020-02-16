import { objectType } from 'nexus'

export const Attendance = objectType({
  name: 'Attendance',
  definition(t) {
    t.model.id()
    t.model.slug()
    t.model.schedule()
    t.model.status()
    t.model.attendees()
    t.model.absentees()
    t.model.group()
    t.model.createdAt()
    t.model.updatedAt()
  },
})
