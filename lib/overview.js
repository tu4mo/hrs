const {
  ENTRY_BREAK,
  ENTRY_CURRENT,
  ENTRY_LUNCH,
  ENTRY_NOTE
} = require('./constants')
const addHours = require('date-fns/add_hours')
const { dim } = require('./helpers/colors')
const {
  getHoursBetweenTimes,
  toHourFormat,
  toShortDateFormat,
  toStartAndEndHourFormat
} = require('./helpers/time')
const { getEntriesByType } = require('./helpers/entries')

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
  endTime,
  workHours,
  lunchStartTime,
  lunchEndTime,
  lunchDuration
}) =>
  `${EMOJI_DATE}  ${toShortDateFormat(startTime)}  ` +
  `${EMOJI_STARTTIME}  ${toHourFormat(startTime)}  ` +
  `${EMOJI_ENDTIME}  ${toHourFormat(endTime)}  ` +
  `${EMOJI_LUNCH}  ${toStartAndEndHourFormat(
    lunchStartTime,
    lunchEndTime
  )} ${lunchDuration} h  ` +
  `${EMOJI_INBOX}  0${dim('/')}${workHours} h`

const getEntryEmoji = entry => {
  switch (entry.type) {
    case ENTRY_BREAK:
      return `${EMOJI_BREAK} `
    case ENTRY_CURRENT:
      return `${EMOJI_DURATION} `
    case ENTRY_LUNCH:
      return `${EMOJI_LUNCH} `
    case ENTRY_NOTE:
      return `${EMOJI_NOTE} `
  }
}

const getEntryTime = (startTime, endTime) =>
  `${toStartAndEndHourFormat(startTime, endTime)} ` +
  `\x1b[32m${getHoursBetweenTimes(startTime, endTime)}\x1b[0m`

const renderEntry = (entry, currentEntryTime) =>
  `${getEntryEmoji(entry)} ` +
  `${getEntryTime(currentEntryTime, entry.time)} ` +
  `\x1b[2m${entry.note ? entry.note : ''}\x1b[0m`

const getEntries = (entries, startTime) => {
  let currentEntryTime = startTime

  return getEntriesByType(entries, ENTRY_NOTE)
    .map(entry => {
      const renderedEntry = renderEntry(entry, currentEntryTime)
      currentEntryTime = entry.time
      return renderedEntry
    })
    .concat(
      renderEntry({ time: new Date(), type: 'current' }, currentEntryTime)
    )
    .join('\n')
}

const getOverview = data => {
  const lunchEntry = getEntriesByType(data.entries, ENTRY_LUNCH)[0]
  const lunchStartTime = lunchEntry.time
  const lunchDuration = lunchEntry.duration
  const lunchEndTime = addHours(lunchStartTime, lunchDuration)

  const header = getHeader({
    startTime: data.startTime,
    endTime: addHours(data.startTime, data.workHours + lunchDuration),
    workHours: data.workHours,
    lunchStartTime,
    lunchEndTime,
    lunchDuration
  })

  const entries = getEntries(data.entries, data.startTime)

  return `\n${header}\n\n${entries}\n`
}

module.exports = {
  getOverview
}
