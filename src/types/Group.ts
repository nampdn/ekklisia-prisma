import { objectType } from 'nexus'

export const Group = objectType({
  name: 'Group',
  definition(t) {
    t.model.id()
    // t.model.createdAt()
    // t.model.updatedAt()
    t.model.name()
    t.model.leader()
    t.model.members()
  },
})
