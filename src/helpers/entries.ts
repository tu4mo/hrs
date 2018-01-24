import { Entry } from '../lib/data'

export const getEntriesByType = (entries: Entry[], type: string) =>
  entries
    .filter(entry => entry.type === type)
    .sort((a, b) => (a.time > b.time ? 1 : b.time > a.time ? -1 : 0))
