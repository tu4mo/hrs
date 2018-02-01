import { addHours } from 'date-fns'

import { dim } from '../helpers/colors'
import Emoji from '../helpers/emoji'
import {
  getHoursBetweenTimes,
  toFixedHours,
  toHourFormat,
  toShortDateFormat,
  toStartAndEndHourFormat
} from '../helpers/time'

import Day from '../models/Day'
import Entry, { EntryType } from '../models/Entry'

const getHeader = ({
  startTime,
  workHours,
  lunchStartTime,
  lunchEndTime,
  lunchDuration
}: {
  startTime: Date
  workHours: number
  lunchStartTime: Date
  lunchEndTime: Date
  lunchDuration: number
}) =>
  `${Emoji.Calendar}  ${toShortDateFormat(startTime)}  ` +
  `${Emoji.Sun}  ${toHourFormat(startTime)}  ` +
  `${Emoji.Moon}  ${toHourFormat(
    addHours(startTime, workHours + lunchDuration)
  )}  ` +
  `${Emoji.Pizza}  ${toStartAndEndHourFormat(
    lunchStartTime,
    lunchEndTime
  )} ${lunchDuration} h  ` +
  `${Emoji.Inbox}  0${dim('/')}${workHours} h`

const getEntryEmoji = (entry: Entry) => {
  switch (entry.type) {
    case EntryType.Break:
      return `${Emoji.Coffee} `
    case EntryType.Current:
      return `${Emoji.Stopwatch} `
    case EntryType.Lunch:
      return `${Emoji.Pizza} `
    case EntryType.Note:
      return `${Emoji.Note} `
  }
}

const getEntryTime = (startTime: Date, endTime: Date) =>
  `${toStartAndEndHourFormat(startTime, endTime)} ` +
  `\x1b[32m${toFixedHours(getHoursBetweenTimes(startTime, endTime))}\x1b[0m`

const renderEntry = (entry: Entry) =>
  `${getEntryEmoji(entry)} ` +
  `${getEntryTime(entry.startTime, entry.endTime)} ` +
  `\x1b[2m${entry.note ? entry.note : ''}\x1b[0m`

const getRenderedEntries = (day: Day) => {
  const renderedEntries = day
    .getEntriesByType(EntryType.Note)
    .map(entry => renderEntry(entry))

  const latestEntry = day.getLatestEntry()

  const currentEntryStartTime = latestEntry
    ? latestEntry.endTime
    : day.startTime

  const currentEntry = new Entry(
    EntryType.Current,
    currentEntryStartTime,
    new Date()
  )

  return [...renderedEntries, renderEntry(currentEntry)].join('\n')
}

export const getOverview = (day: Day) => {
  const lunchEntry = day.getEntriesByType(EntryType.Lunch)[0]
  const lunchStartTime = lunchEntry.startTime
  const lunchDuration = getHoursBetweenTimes(
    lunchEntry.startTime,
    lunchEntry.endTime
  )
  const lunchEndTime = lunchEntry.endTime

  const header = getHeader({
    lunchDuration,
    lunchEndTime,
    lunchStartTime,
    startTime: day.startTime,
    workHours: day.workHours
  })

  const entries = getRenderedEntries(day)

  return `\n${header}\n\n${entries}\n`
}
