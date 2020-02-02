import { objectType } from 'nexus'

export const Org = objectType({
  name: 'Org',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.activities()
    t.model.groups()
  },
})
