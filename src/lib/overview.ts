import { addHours } from 'date-fns'

import { dim, green } from '../helpers/colors'
import Emoji from '../helpers/emoji'
import {
  secondsToHours,
  toHourFormat,
  toShortDateFormat,
  toStartAndEndHourFormat
} from '../helpers/time'

import Day from '../models/Day'
import Entry, { EntryType } from '../models/Entry'

const getHeader = ({
  startTime,
  notedTime,
  workHours,
  lunchStartTime,
  lunchEndTime,
  lunchDuration
}: {
  startTime: Date
  notedTime: number
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
  `${Emoji.Inbox}  ${notedTime}${dim('/')}${workHours} h`

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

const renderEntry = (entry: Entry) =>
  `${getEntryEmoji(entry)} ` +
  `${toStartAndEndHourFormat(entry.startTime, entry.endTime)} ` +
  `${green(secondsToHours(entry.getDifference()).toString())} ` +
  `${entry.note ? dim(entry.note) : ''}`

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

  const header = getHeader({
    lunchDuration: secondsToHours(lunchEntry.getDifference()),
    lunchEndTime: lunchEntry.endTime,
    lunchStartTime: lunchEntry.startTime,
    notedTime: secondsToHours(day.getDurationOfEntriesByType(EntryType.Note)),
    startTime: day.startTime,
    workHours: day.workHours
  })

  const entries = getRenderedEntries(day)

  return `\n${header}\n\n${entries}\n`
}
