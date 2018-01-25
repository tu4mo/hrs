import Day from '../models/Day'
import Entry, { EntryType } from '../models/Entry'

import { getOverview } from '../lib/overview'

export const note = (day: Day, args: string[]) => {
  const entry = new Entry()
  entry.note = args.join(' ')
  entry.time = new Date()
  entry.type = EntryType.Note
  day.addEntry(entry)

  console.log(getOverview(day))
}
