const {
  ENTRY_BREAK,
  ENTRY_CURRENT,
  ENTRY_LUNCH,
  ENTRY_NOTE
} = require('./constants')
const addHours = require('date-fns/add_hours')
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
  `${EMOJI_INBOX}  7.5 h`

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

const renderEntry = (entry, time, currentEntryTime) =>
  `${getEntryEmoji(entry)} ` +
  `${getEntryTime(currentEntryTime, time)} ` +
  `\x1b[2m${entry.note ? entry.note : ''}\x1b[0m`

const getEntries = (entries, startTime) => {
  let currentEntryTime = startTime

  return Object.keys(entries)
    .filter(time => entries[time].type === ENTRY_NOTE)
    .sort()
    .map(time => {
      const entry = renderEntry(entries[time], time, currentEntryTime)
      currentEntryTime = time
      return entry
    })
    .concat(renderEntry({ type: 'current' }, new Date(), currentEntryTime))
    .join('\n')
}

const getOverview = data => {
  const lunchEntries = getEntriesByType(data.entries, ENTRY_LUNCH)
  const lunchStartTime = Object.keys(lunchEntries)[0]
  const lunchDuration = lunchEntries[lunchStartTime].duration
  const lunchEndTime = addHours(lunchStartTime, lunchDuration)

  const header = getHeader({
    startTime: data.startTime,
    endTime: addHours(data.startTime, data.workHours),
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
