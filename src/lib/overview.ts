import { addHours } from 'date-fns'

import { dim } from '../helpers/colors'
import {
  getHoursBetweenTimes,
  toHourFormat,
  toShortDateFormat,
  toStartAndEndHourFormat
} from '../helpers/time'

import Day from '../models/Day'
import Entry, { EntryType } from '../models/Entry'

const EMOJI_BREAK = '☕️'
const EMOJI_DATE = '🗓'
const EMOJI_INBOX = '📥'
const EMOJI_DURATION = '⏱'
const EMOJI_ENDTIME = '🌙'
const EMOJI_LUNCH = '🍕'
const EMOJI_NOTE = '🗒'
const EMOJI_STARTTIME = '☀️'

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
  `${EMOJI_DATE}  ${toShortDateFormat(startTime)}  ` +
  `${EMOJI_STARTTIME}  ${toHourFormat(startTime)}  ` +
  `${EMOJI_ENDTIME}  ${toHourFormat(
    addHours(startTime, workHours + lunchDuration)
  )}  ` +
  `${EMOJI_LUNCH}  ${toStartAndEndHourFormat(
    lunchStartTime,
    lunchEndTime
  )} ${lunchDuration} h  ` +
  `${EMOJI_INBOX}  0${dim('/')}${workHours} h`

const getEntryEmoji = (entry: Entry) => {
  switch (entry.type) {
    case EntryType.Break:
      return `${EMOJI_BREAK} `
    case EntryType.Current:
      return `${EMOJI_DURATION} `
    case EntryType.Lunch:
      return `${EMOJI_LUNCH} `
    case EntryType.Note:
      return `${EMOJI_NOTE} `
  }
}

const getEntryTime = (startTime: Date, endTime: Date) =>
  `${toStartAndEndHourFormat(startTime, endTime)} ` +
  `\x1b[32m${getHoursBetweenTimes(startTime, endTime)}\x1b[0m`

const renderEntry = (entry: Entry, currentEntryTime: Date) =>
  `${getEntryEmoji(entry)} ` +
  `${getEntryTime(currentEntryTime, entry.time)} ` +
  `\x1b[2m${entry.note ? entry.note : ''}\x1b[0m`

const getEntries = (entries: Entry[], startTime: Date) => {
  let currentEntryTime: Date = startTime

  return entries
    .map(entry => {
      const renderedEntry = renderEntry(entry, currentEntryTime)
      currentEntryTime = entry.time
      return renderedEntry
    })
    .concat(
      renderEntry(
        { time: new Date(), type: EntryType.Current },
        currentEntryTime
      )
    )
    .join('\n')
}

export const getOverview = (day: Day) => {
  const lunchEntry = day.getEntriesByType(EntryType.Lunch)[0]
  const lunchStartTime = lunchEntry.time
  const lunchDuration = lunchEntry.duration || 0
  const lunchEndTime = addHours(lunchStartTime, lunchDuration)

  const header = getHeader({
    lunchDuration,
    lunchEndTime,
    lunchStartTime,
    startTime: day.startTime,
    workHours: day.workHours
  })

  const entries = getEntries(
    day.getEntriesByType(EntryType.Note),
    day.startTime
  )

  return `\n${header}\n\n${entries}\n`
}
