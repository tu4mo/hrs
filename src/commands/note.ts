import { setMilliseconds } from 'date-fns'

import Day from '../models/Day'
import Entry, { EntryType } from '../models/Entry'

import { getOverview } from '../lib/overview'

export const note = (day: Day, args: string[]) => {
  const latestEntry = day.getLatestEntry()

  const startTime = latestEntry ? latestEntry.endTime : day.startTime
  const endTime = setMilliseconds(new Date(), 0)
  const entry = new Entry(EntryType.Note, startTime, endTime)
  entry.note = args.join(' ')

  day.addEntry(entry)

  console.log(getOverview(day))
}
