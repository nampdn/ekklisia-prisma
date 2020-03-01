import { objectType } from 'nexus'

export const Group = objectType({
  name: 'Group',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.leader()
    t.model.year()
    t.model.stage()
    t.model.startAt()
    t.model.endAt()
    t.model.members()
  },
})
